import React, { useEffect, useRef, useState } from "react";
import {
  Menu,
  X,
  Bed,
  Bath,
  Car,
  UtensilsCrossed,
  Sofa,
  Users,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronRight,
  ShieldCheck,
  HardHat,
  ReceiptText,
  Headset,
  LayoutGrid,
  PenTool,
  ClipboardList,
  PaintBucket,
  KeyRound,
  ArrowUpRight,
  Home,
} from "lucide-react";

/* ---------------------------------------------------------
   Data
--------------------------------------------------------- */

const NAV_LINKS = [
  { id: "beranda", label: "Beranda" },
  { id: "tipe-rumah", label: "Tipe Rumah" },
  { id: "furnitur", label: "Furnitur" },
  { id: "tahapan", label: "Tahapan" },
  { id: "kontak", label: "Kontak" },
];

const HOUSE_TYPES = [
  {
    badge: "Tipe 45",
    name: "Rumah Minimalis Modern",
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80",
    price: "Rp350.000.000",
    specs: [
      { icon: LayoutGrid, label: "Luas Tanah", value: "72 m²" },
      { icon: Home, label: "Luas Bangunan", value: "45 m²" },
      { icon: Bed, label: "Kamar Tidur", value: "2" },
      { icon: Bath, label: "Kamar Mandi", value: "1" },
      { icon: Users, label: "Ruang Tamu", value: "1" },
      { icon: UtensilsCrossed, label: "Dapur", value: "1" },
      { icon: Car, label: "Carport", value: "1 Mobil" },
    ],
  },
  {
    badge: "Tipe 90",
    name: "Rumah Modern Family",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    price: "Rp650.000.000",
    specs: [
      { icon: LayoutGrid, label: "Luas Tanah", value: "120 m²" },
      { icon: Home, label: "Luas Bangunan", value: "90 m²" },
      { icon: Bed, label: "Kamar Tidur", value: "3" },
      { icon: Bath, label: "Kamar Mandi", value: "2" },
      { icon: Users, label: "Ruang Keluarga", value: "1" },
      { icon: UtensilsCrossed, label: "Dapur", value: "1" },
      { icon: Car, label: "Carport", value: "2 Mobil" },
    ],
  },
];

const FURNITURE = [
  {
    name: "Sofa Minimalis",
    price: "Rp4.500.000",
    desc: "Sofa 3-dudukan dengan rangka kayu solid dan busa lembut.",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Meja Makan Modern",
    price: "Rp3.200.000",
    desc: "Set meja makan 4 kursi berbahan kayu jati finishing halus.",
    image:
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Lemari Pakaian",
    price: "Rp2.800.000",
    desc: "Lemari 2 pintu dengan penyimpanan luas dan desain ringkas.",
    image:
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Tempat Tidur Minimalis",
    price: "Rp3.900.000",
    desc: "Rangka tempat tidur minimalis dengan headboard empuk.",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Kitchen Set",
    price: "Rp8.500.000",
    desc: "Kitchen set atas-bawah dengan material tahan lembap.",
    image:
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Meja Kerja",
    price: "Rp1.750.000",
    desc: "Meja kerja compact cocok untuk ruang kerja di rumah.",
    image:
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Rak TV",
    price: "Rp2.100.000",
    desc: "Rak TV panjang dengan kompartemen penyimpanan tersembunyi.",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Coffee Table",
    price: "Rp1.450.000",
    desc: "Meja tamu rendah dengan sentuhan kayu natural.",
    image:
      "https://images.unsplash.com/photo-1499933374294-4584851497cc?auto=format&fit=crop&w=600&q=80",
  },
];

const ADVANTAGES = [
  {
    icon: LayoutGrid,
    title: "Desain Modern",
    desc: "Konsep hunian dirancang dengan tampilan modern dan fungsional.",
  },
  {
    icon: ShieldCheck,
    title: "Material Berkualitas",
    desc: "Menggunakan material yang dipilih untuk menunjang kualitas dan ketahanan bangunan.",
  },
  {
    icon: HardHat,
    title: "Pengerjaan Profesional",
    desc: "Didukung tenaga kerja dan tim pembangunan yang berpengalaman.",
  },
  {
    icon: ReceiptText,
    title: "Harga Transparan",
    desc: "Informasi harga dan spesifikasi disampaikan secara jelas.",
  },
  {
    icon: Sofa,
    title: "Pilihan Furnitur",
    desc: "Hunian dapat dilengkapi dengan berbagai pilihan furnitur.",
  },
  {
    icon: Headset,
    title: "Pelayanan Konsultasi",
    desc: "Tim siap membantu kebutuhan dan pertanyaan calon pembeli.",
  },
];

const STAGES = [
  {
    number: "01",
    icon: MessageCircle,
    title: "Konsultasi",
    desc: "Diskusikan kebutuhan rumah, konsep, anggaran, dan kebutuhan keluarga.",
  },
  {
    number: "02",
    icon: MapPin,
    title: "Survey Lokasi",
    desc: "Tim melakukan pengecekan dan analisis lokasi pembangunan.",
  },
  {
    number: "03",
    icon: PenTool,
    title: "Desain & Perencanaan",
    desc: "Pembuatan denah, desain, spesifikasi material, dan perencanaan biaya.",
  },
  {
    number: "04",
    icon: ClipboardList,
    title: "Persiapan Pembangunan",
    desc: "Persiapan lokasi, material, tenaga kerja, dan kebutuhan konstruksi.",
  },
  {
    number: "05",
    icon: HardHat,
    title: "Proses Konstruksi",
    desc: "Pembangunan dimulai dari pondasi, struktur, dinding, atap hingga instalasi.",
  },
  {
    number: "06",
    icon: PaintBucket,
    title: "Finishing",
    desc: "Meliputi pengecatan, instalasi, pemasangan komponen rumah dan furnitur.",
  },
  {
    number: "07",
    icon: KeyRound,
    title: "Serah Terima",
    desc: "Rumah selesai diperiksa dan kemudian dilakukan proses serah terima kepada pelanggan.",
  },
];

const WHATSAPP_NUMBER = "62XXXXXXXXXX";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Halo Fajar Baru KBM, saya ingin mendapatkan informasi mengenai Griya Kesambi."
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

/* ---------------------------------------------------------
   Small hook: reveal-on-scroll
--------------------------------------------------------- */

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

function Reveal({ children, className = "", delay = 0, as: Tag = "div" }) {
  const [ref, visible] = useReveal();
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </Tag>
  );
}

/* ---------------------------------------------------------
   Main component
--------------------------------------------------------- */

export default function GriyaKesambiLanding() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    nama: "",
    whatsapp: "",
    tipe: "Tipe 45",
    layanan: "Pembelian Rumah",
    pesan: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Struktur siap dihubungkan ke backend/API di kemudian hari.
    setSubmitted(true);
  };

  return (
    <div className="gk-root">
      <style>{CSS}</style>

      {/* ---------------- NAVBAR ---------------- */}
      <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
        <div className="navbar-inner">
          <a href="#beranda" onClick={scrollTo("beranda")} className="brand">
            <span className="brand-mark">FB</span>
            <span className="brand-text">
              <span className="brand-title">FAJAR BARU KBM</span>
              <span className="brand-sub">Griya Kesambi</span>
            </span>
          </a>

          <nav className="nav-links">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={scrollTo(link.id)}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="#kontak"
            onClick={scrollTo("kontak")}
            className="btn btn-primary nav-cta"
          >
            Pesan Sekarang
          </a>

          <button
            className="hamburger"
            aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div className={`mobile-menu ${menuOpen ? "mobile-menu-open" : ""}`}>
          {NAV_LINKS.map((link) => (
            <a key={link.id} href={`#${link.id}`} onClick={scrollTo(link.id)}>
              {link.label}
            </a>
          ))}
          <a
            href="#kontak"
            onClick={scrollTo("kontak")}
            className="btn btn-primary mobile-cta"
          >
            Pesan Sekarang
          </a>
        </div>
      </header>

      {/* ---------------- HERO ---------------- */}
      <section id="beranda" className="hero">
        <div className="hero-bg" />
        <div className="hero-grid-overlay" />
        <div className="hero-inner">
          <Reveal className="hero-copy">
            <p className="eyebrow-plain">Dikembangkan oleh Fajar Baru KBM</p>
            <h1 className="hero-title">Griya Kesambi</h1>
            <p className="hero-headline">
              Hunian Modern, Nyaman, dan Siap Menjadi Rumah Impian Anda
            </p>
            <p className="hero-desc">
              Griya Kesambi menghadirkan hunian modern dengan desain nyaman,
              pembangunan berkualitas, dan pilihan furnitur yang dapat
              disesuaikan dengan kebutuhan keluarga Anda.
            </p>

            <div className="hero-actions">
              <a
                href="#tipe-rumah"
                onClick={scrollTo("tipe-rumah")}
                className="btn btn-primary"
              >
                Lihat Tipe Rumah
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                <MessageCircle size={18} />
                Konsultasi via WhatsApp
              </a>
            </div>

            <div className="hero-stats">
              <div className="hero-stat">
                <span className="hero-stat-num">100+</span>
                <span className="hero-stat-label">Unit / Proyek</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-num">2</span>
                <span className="hero-stat-label">Pilihan Tipe Rumah</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-num">50+</span>
                <span className="hero-stat-label">Pilihan Furnitur</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-num">Profesional</span>
                <span className="hero-stat-label">Tim Pembangunan</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={150} className="hero-visual">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
              alt="Rumah modern Griya Kesambi"
            />
          </Reveal>
        </div>
      </section>

      {/* ---------------- TIPE RUMAH ---------------- */}
      <section id="tipe-rumah" className="section">
        <div className="container">
          <Reveal className="section-head">
            <h2>Pilihan Tipe Rumah Griya Kesambi</h2>
            <p>
              Pilih tipe hunian yang sesuai dengan kebutuhan dan gaya hidup
              keluarga Anda.
            </p>
          </Reveal>

          <div className="house-grid">
            {HOUSE_TYPES.map((house, i) => (
              <Reveal key={house.badge} delay={i * 120} className="house-card">
                <div className="house-media">
                  <img src={house.image} alt={house.name} loading="lazy" />
                  <span className="house-badge">{house.badge}</span>
                </div>
                <div className="house-body">
                  <h3>{house.name}</h3>

                  <div className="house-specs">
                    {house.specs.map((spec) => (
                      <div className="house-spec" key={spec.label}>
                        <spec.icon size={16} strokeWidth={2} />
                        <span>
                          {spec.label}: <strong>{spec.value}</strong>
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="house-footer">
                    <div className="house-price">
                      <span className="house-price-label">Mulai dari</span>
                      <span className="house-price-num">{house.price}</span>
                    </div>
                    <a
                      href="#kontak"
                      onClick={scrollTo("kontak")}
                      className="btn btn-primary"
                    >
                      Konsultasi Tipe Ini
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- FURNITUR ---------------- */}
      <section id="furnitur" className="section section-alt">
        <div className="container">
          <Reveal className="section-head">
            <h2>Lengkapi Hunian Anda dengan Furnitur Pilihan</h2>
            <p>
              Hadirkan suasana rumah yang lebih nyaman dan modern dengan
              pilihan furnitur dari Fajar Baru KBM.
            </p>
          </Reveal>

          <div className="furniture-grid">
            {FURNITURE.map((item, i) => (
              <Reveal
                key={item.name}
                delay={(i % 4) * 80}
                className="furniture-card"
              >
                <div className="furniture-media">
                  <img src={item.image} alt={item.name} loading="lazy" />
                </div>
                <div className="furniture-body">
                  <h4>{item.name}</h4>
                  <p>{item.desc}</p>
                  <span className="furniture-price">{item.price}</span>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                      `Halo Fajar Baru KBM, saya ingin memesan ${item.name}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost"
                  >
                    Pesan via WhatsApp
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- KEUNGGULAN ---------------- */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <h2>Mengapa Memilih Griya Kesambi?</h2>
          </Reveal>

          <div className="advantage-grid">
            {ADVANTAGES.map((item, i) => (
              <Reveal
                key={item.title}
                delay={(i % 3) * 100}
                className="advantage-card"
              >
                <div className="advantage-icon">
                  <item.icon size={22} strokeWidth={1.8} />
                </div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- TAHAPAN ---------------- */}
      <section id="tahapan" className="section section-alt">
        <div className="container">
          <Reveal className="section-head">
            <h2>Tahapan Pembangunan Rumah</h2>
            <p>
              Kami memastikan setiap proses pembangunan dilakukan secara
              terencana dan profesional.
            </p>
          </Reveal>

          <div className="timeline">
            {STAGES.map((stage, i) => (
              <Reveal
                key={stage.number}
                delay={i * 90}
                className="timeline-item"
              >
                <div className="timeline-marker">
                  <stage.icon size={18} strokeWidth={2} />
                </div>
                <div className="timeline-content">
                  <span className="timeline-number">{stage.number}</span>
                  <h4>{stage.title}</h4>
                  <p>{stage.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="cta-section">
        <div className="cta-shape cta-shape-1" />
        <div className="cta-shape cta-shape-2" />
        <Reveal className="cta-inner">
          <h2>Siap Memiliki Rumah di Griya Kesambi?</h2>
          <p>
            Hubungi Fajar Baru KBM untuk mendapatkan informasi tipe rumah,
            harga, ketersediaan unit, dan pilihan furnitur.
          </p>
          <div className="cta-actions">
            <a
              href="#kontak"
              onClick={scrollTo("kontak")}
              className="btn btn-white"
            >
              Konsultasi Sekarang
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-white"
            >
              <MessageCircle size={18} />
              Chat WhatsApp
            </a>
          </div>
        </Reveal>
      </section>

      {/* ---------------- KONTAK ---------------- */}
      <section id="kontak" className="section">
        <div className="container">
          <Reveal className="section-head">
            <h2>Hubungi Kami</h2>
            <p>
              Konsultasikan kebutuhan hunian Anda bersama tim Fajar Baru KBM.
            </p>
          </Reveal>

          <div className="contact-grid">
            <Reveal className="contact-info">
              <h3>Fajar Baru KBM</h3>

              <div className="contact-row">
                <span className="contact-icon">
                  <MessageCircle size={18} />
                </span>
                <div>
                  <span className="contact-label">WhatsApp</span>
                  <span className="contact-value">+62 8XX-XXXX-XXXX</span>
                </div>
              </div>

              <div className="contact-row">
                <span className="contact-icon">
                  <Mail size={18} />
                </span>
                <div>
                  <span className="contact-label">Email</span>
                  <span className="contact-value">
                    info@fajarbarukbm.com
                  </span>
                </div>
              </div>

              <div className="contact-row">
                <span className="contact-icon">
                  <MapPin size={18} />
                </span>
                <div>
                  <span className="contact-label">Alamat</span>
                  <span className="contact-value">
                    Kawasan Griya Kesambi, Jawa Barat
                  </span>
                </div>
              </div>

              <div className="contact-row">
                <span className="contact-icon">
                  <Clock size={18} />
                </span>
                <div>
                  <span className="contact-label">Jam Pelayanan</span>
                  <span className="contact-value">
                    Senin – Sabtu | 08.00 – 17.00
                  </span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120} className="contact-form-wrap">
              {submitted ? (
                <div className="form-success">
                  <ShieldCheck size={28} />
                  <h4>Permintaan terkirim</h4>
                  <p>
                    Terima kasih, tim Fajar Baru KBM akan segera menghubungi
                    Anda.
                  </p>
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => setSubmitted(false)}
                  >
                    Kirim permintaan lain
                  </button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <label>
                    Nama Lengkap
                    <input
                      type="text"
                      name="nama"
                      required
                      value={formData.nama}
                      onChange={(e) =>
                        setFormData({ ...formData, nama: e.target.value })
                      }
                      placeholder="Masukkan nama lengkap"
                    />
                  </label>

                  <label>
                    Nomor WhatsApp
                    <input
                      type="tel"
                      name="whatsapp"
                      required
                      value={formData.whatsapp}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          whatsapp: e.target.value,
                        })
                      }
                      placeholder="08xx-xxxx-xxxx"
                    />
                  </label>

                  <label>
                    Pilihan Tipe Rumah
                    <select
                      name="tipe"
                      value={formData.tipe}
                      onChange={(e) =>
                        setFormData({ ...formData, tipe: e.target.value })
                      }
                    >
                      <option>Tipe 45</option>
                      <option>Tipe 90</option>
                    </select>
                  </label>

                  <label>
                    Pilihan Layanan
                    <select
                      name="layanan"
                      value={formData.layanan}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          layanan: e.target.value,
                        })
                      }
                    >
                      <option>Pembelian Rumah</option>
                      <option>Furnitur</option>
                      <option>Konsultasi</option>
                    </select>
                  </label>

                  <label>
                    Pesan
                    <textarea
                      name="pesan"
                      rows={4}
                      value={formData.pesan}
                      onChange={(e) =>
                        setFormData({ ...formData, pesan: e.target.value })
                      }
                      placeholder="Tuliskan pertanyaan atau kebutuhan Anda"
                    />
                  </label>

                  <button type="submit" className="btn btn-primary form-submit">
                    Kirim Permintaan
                    <ArrowUpRight size={16} />
                  </button>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- FLOATING WHATSAPP ---------------- */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="fab-whatsapp"
        aria-label="Chat via WhatsApp"
      >
        <MessageCircle size={26} />
      </a>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="footer">
        <div className="container footer-inner">
          <div className="footer-brand">
            <span className="footer-title">FAJAR BARU KBM</span>
            <span className="footer-sub">Griya Kesambi</span>
            <p>
              Solusi hunian modern dan nyaman untuk keluarga Indonesia.
            </p>
          </div>

          <div className="footer-links">
            <span className="footer-heading">Navigasi</span>
            {NAV_LINKS.map((link) => (
              <a key={link.id} href={`#${link.id}`} onClick={scrollTo(link.id)}>
                {link.label}
              </a>
            ))}
          </div>

          <div className="footer-contact">
            <span className="footer-heading">Informasi</span>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={16} /> WhatsApp
            </a>
            <a href="mailto:info@fajarbarukbm.com">
              <Mail size={16} /> info@fajarbarukbm.com
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span style={{ fontSize: 16 }}>◎</span> Instagram
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          © 2026 Fajar Baru KBM. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}

/* ---------------------------------------------------------
   Styles
--------------------------------------------------------- */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

.gk-root {
  --primary: #1565C0;
  --primary-dark: #0D2B45;
  --light-blue: #EAF4FF;
  --bg: #FFFFFF;
  --bg-secondary: #F5F8FC;
  --text: #1F2937;
  --radius-lg: 20px;
  --radius-md: 14px;
  --radius-sm: 10px;
  --shadow-soft: 0 12px 30px rgba(13, 43, 69, 0.08);
  --shadow-hover: 0 20px 40px rgba(21, 101, 192, 0.16);
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  color: var(--text);
  background: var(--bg);
  line-height: 1.55;
  -webkit-font-smoothing: antialiased;
}

.gk-root * { box-sizing: border-box; }
.gk-root img { max-width: 100%; display: block; }
.gk-root a { text-decoration: none; color: inherit; }
.gk-root ul { list-style: none; margin: 0; padding: 0; }
.gk-root button { font-family: inherit; }
.gk-root h1, .gk-root h2, .gk-root h3, .gk-root h4 {
  color: var(--primary-dark);
  margin: 0;
  font-weight: 700;
  letter-spacing: -0.01em;
}
.gk-root :focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

.container { max-width: 1180px; margin: 0 auto; padding: 0 24px; }

.section { padding: 96px 0; }
.section-alt { background: var(--bg-secondary); }

.section-head { max-width: 640px; margin: 0 auto 56px; text-align: center; }
.section-head h2 { font-size: clamp(1.7rem, 3vw, 2.35rem); }
.section-head p { margin-top: 12px; color: #4b5768; font-size: 1.02rem; }

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 13px 26px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.95rem;
  border: 1px solid transparent;
  cursor: pointer;
  transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease, color 0.18s ease;
  white-space: nowrap;
}
.btn:active { transform: scale(0.97); }
.btn-primary {
  background: linear-gradient(135deg, var(--primary), #0d4a9e);
  color: #fff;
  box-shadow: 0 10px 24px rgba(21, 101, 192, 0.28);
}
.btn-primary:hover { box-shadow: 0 14px 30px rgba(21, 101, 192, 0.36); transform: translateY(-1px); }
.btn-outline {
  background: rgba(255,255,255,0.08);
  border-color: rgba(255,255,255,0.55);
  color: #fff;
  backdrop-filter: blur(6px);
}
.btn-outline:hover { background: rgba(255,255,255,0.18); }
.btn-ghost {
  background: var(--light-blue);
  color: var(--primary);
}
.btn-ghost:hover { background: #dcecfe; }
.btn-white { background: #fff; color: var(--primary-dark); }
.btn-white:hover { transform: translateY(-1px); box-shadow: 0 12px 24px rgba(0,0,0,0.18); }
.btn-outline-white { background: transparent; border-color: rgba(255,255,255,0.6); color: #fff; }
.btn-outline-white:hover { background: rgba(255,255,255,0.12); }

/* Reveal animation */
.reveal { opacity: 0; transform: translateY(22px); transition: opacity 0.6s ease, transform 0.6s ease; }
.reveal-visible { opacity: 1; transform: translateY(0); }
@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transform: none; transition: none; }
}

/* Navbar */
.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  background: transparent;
  transition: background 0.3s ease, box-shadow 0.3s ease, padding 0.3s ease;
}
.navbar-scrolled {
  background: rgba(255,255,255,0.9);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 24px rgba(13,43,69,0.08);
}
.navbar-inner {
  max-width: 1180px;
  margin: 0 auto;
  padding: 18px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}
.brand { display: flex; align-items: center; gap: 10px; }
.brand-mark {
  width: 40px; height: 40px;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  color: #fff;
  display: flex; align-items: center; justify-content: center;
  font-weight: 800; font-size: 0.85rem;
  flex-shrink: 0;
}
.brand-text { display: flex; flex-direction: column; line-height: 1.2; }
.brand-title { font-weight: 800; font-size: 0.92rem; color: var(--primary-dark); letter-spacing: 0.01em; }
.brand-sub { font-size: 0.78rem; color: var(--primary); font-weight: 600; }

.nav-links { display: flex; align-items: center; gap: 30px; flex: 1; justify-content: center; }
.nav-links a { font-weight: 500; font-size: 0.94rem; color: var(--text); position: relative; padding: 4px 0; }
.nav-links a:hover { color: var(--primary); }
.nav-links a::after {
  content: ""; position: absolute; left: 0; bottom: -2px; height: 2px; width: 0;
  background: var(--primary); transition: width 0.2s ease;
}
.nav-links a:hover::after { width: 100%; }

.nav-cta { flex-shrink: 0; }
.hamburger {
  display: none; background: none; border: none; color: var(--primary-dark);
  cursor: pointer; padding: 6px;
}

.mobile-menu {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: #fff;
  padding: 0 24px;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease, padding 0.3s ease;
  box-shadow: 0 12px 20px rgba(13,43,69,0.06);
}
.mobile-menu a { padding: 12px 0; font-weight: 500; border-bottom: 1px solid #eef2f6; }
.mobile-cta { margin: 16px 0; }
.mobile-menu-open { max-height: 480px; padding: 8px 24px 20px; }

/* Hero */
.hero {
  position: relative;
  padding: 168px 0 100px;
  overflow: hidden;
  background: linear-gradient(180deg, var(--light-blue) 0%, #fff 65%);
}
.hero-grid-overlay {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(21,101,192,0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(21,101,192,0.06) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: linear-gradient(180deg, rgba(0,0,0,0.9), transparent 75%);
  pointer-events: none;
}
.hero-inner {
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 24px;
  position: relative;
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 56px;
  align-items: center;
}
.eyebrow-plain { color: var(--primary); font-weight: 600; font-size: 0.92rem; margin-bottom: 14px; }
.hero-title {
  font-size: clamp(2.6rem, 5vw, 3.6rem);
  line-height: 1.05;
  margin-bottom: 14px;
}
.hero-headline { font-size: clamp(1.15rem, 2vw, 1.4rem); font-weight: 600; color: #253345; margin-bottom: 14px; }
.hero-desc { color: #4b5768; font-size: 1.02rem; max-width: 520px; margin-bottom: 30px; }
.hero-actions { display: flex; flex-wrap: wrap; gap: 14px; margin-bottom: 44px; }
.hero-actions .btn-outline { background: var(--primary-dark); border-color: var(--primary-dark); }
.hero-actions .btn-outline:hover { background: #123a5f; }

.hero-stats { display: grid; grid-template-columns: repeat(4, auto); gap: 32px; }
.hero-stat { display: flex; flex-direction: column; }
.hero-stat-num { font-size: 1.5rem; font-weight: 800; color: var(--primary-dark); }
.hero-stat-label { font-size: 0.8rem; color: #64748b; margin-top: 2px; }

.hero-visual {
  border-radius: 24px;
  overflow: hidden;
  box-shadow: var(--shadow-soft);
  position: relative;
}
.hero-visual img { width: 100%; height: 100%; object-fit: cover; aspect-ratio: 4/5; }

/* House cards */
.house-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px; }
.house-card {
  background: #fff;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-soft);
  overflow: hidden;
  transition: box-shadow 0.25s ease, transform 0.25s ease;
}
.house-card:hover { box-shadow: var(--shadow-hover); transform: translateY(-4px); }
.house-media { position: relative; aspect-ratio: 16/9; overflow: hidden; }
.house-media img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
.house-card:hover .house-media img { transform: scale(1.06); }
.house-badge {
  position: absolute; top: 16px; left: 16px;
  background: rgba(13,43,69,0.85);
  color: #fff; font-size: 0.78rem; font-weight: 700;
  padding: 6px 14px; border-radius: 999px;
  backdrop-filter: blur(4px);
}
.house-body { padding: 26px; }
.house-body h3 { font-size: 1.25rem; margin-bottom: 16px; }
.house-specs { display: grid; grid-template-columns: 1fr 1fr; gap: 10px 16px; margin-bottom: 22px; }
.house-spec { display: flex; align-items: center; gap: 8px; font-size: 0.88rem; color: #445064; }
.house-spec svg { color: var(--primary); flex-shrink: 0; }
.house-footer { display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; border-top: 1px solid #eef2f6; padding-top: 20px; }
.house-price { display: flex; flex-direction: column; }
.house-price-label { font-size: 0.78rem; color: #94a3b8; }
.house-price-num { font-size: 1.3rem; font-weight: 800; color: var(--primary-dark); }

/* Furniture */
.furniture-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
.furniture-card {
  background: #fff;
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: 0 6px 18px rgba(13,43,69,0.06);
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}
.furniture-card:hover { box-shadow: 0 12px 24px rgba(13,43,69,0.1); transform: translateY(-2px); }
.furniture-media { height: 190px; overflow: hidden; }
.furniture-media img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease; }
.furniture-card:hover .furniture-media img { transform: scale(1.04); }
.furniture-body { padding: 16px; display: flex; flex-direction: column; gap: 6px; }
.furniture-body h4 { font-size: 0.98rem; }
.furniture-body p { font-size: 0.82rem; color: #64748b; margin: 0 0 4px; min-height: 34px; }
.furniture-price { font-weight: 800; color: var(--primary); font-size: 0.95rem; margin-bottom: 8px; }
.furniture-body .btn-ghost { width: 100%; padding: 10px 16px; font-size: 0.85rem; }

/* Advantages */
.advantage-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.advantage-card {
  background: #fff;
  border: 1px solid #eef2f6;
  border-radius: var(--radius-md);
  padding: 30px 26px;
  transition: box-shadow 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
}
.advantage-card:hover { box-shadow: var(--shadow-soft); transform: translateY(-3px); border-color: transparent; }
.advantage-icon {
  width: 46px; height: 46px; border-radius: 12px;
  background: var(--light-blue); color: var(--primary);
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 16px;
}
.advantage-card h4 { font-size: 1.02rem; margin-bottom: 8px; }
.advantage-card p { font-size: 0.9rem; color: #64748b; margin: 0; }

/* Timeline */
.timeline { display: grid; grid-template-columns: repeat(7, 1fr); gap: 16px; position: relative; }
.timeline::before {
  content: "";
  position: absolute; top: 22px; left: 4%; right: 4%; height: 2px;
  background: linear-gradient(90deg, var(--light-blue), var(--primary), var(--light-blue));
}
.timeline-item { position: relative; display: flex; flex-direction: column; align-items: center; text-align: center; }
.timeline-marker {
  width: 46px; height: 46px; border-radius: 50%;
  background: #fff; border: 2px solid var(--primary);
  color: var(--primary);
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 16px; position: relative; z-index: 1;
  transition: background 0.2s ease, color 0.2s ease;
}
.timeline-item:hover .timeline-marker { background: var(--primary); color: #fff; }
.timeline-number { font-size: 0.75rem; font-weight: 800; color: var(--primary); display: block; margin-bottom: 4px; }
.timeline-content h4 { font-size: 0.92rem; margin-bottom: 6px; }
.timeline-content p { font-size: 0.8rem; color: #64748b; margin: 0; }

/* CTA */
.cta-section {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, var(--primary-dark), var(--primary));
  padding: 90px 24px;
  text-align: center;
}
.cta-shape { position: absolute; border-radius: 50%; opacity: 0.18; background: #fff; }
.cta-shape-1 { width: 320px; height: 320px; top: -140px; left: -80px; }
.cta-shape-2 { width: 220px; height: 220px; bottom: -100px; right: -40px; background: #EAF4FF; opacity: 0.14; }
.cta-inner { position: relative; max-width: 640px; margin: 0 auto; }
.cta-inner h2 { color: #fff; font-size: clamp(1.6rem, 3vw, 2.2rem); margin-bottom: 14px; }
.cta-inner p { color: rgba(255,255,255,0.85); margin-bottom: 34px; font-size: 1rem; }
.cta-actions { display: flex; justify-content: center; gap: 14px; flex-wrap: wrap; }

/* Contact */
.contact-grid { display: grid; grid-template-columns: 0.85fr 1.15fr; gap: 48px; }
.contact-info { background: var(--primary-dark); color: #fff; border-radius: var(--radius-lg); padding: 36px; }
.contact-info h3 { color: #fff; margin-bottom: 24px; font-size: 1.2rem; }
.contact-row { display: flex; gap: 14px; margin-bottom: 22px; align-items: flex-start; }
.contact-row:last-child { margin-bottom: 0; }
.contact-icon {
  width: 38px; height: 38px; border-radius: 10px;
  background: rgba(255,255,255,0.1);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.contact-label { display: block; font-size: 0.78rem; color: rgba(255,255,255,0.6); }
.contact-value { display: block; font-weight: 600; font-size: 0.96rem; margin-top: 2px; }

.contact-form-wrap {
  background: #fff;
  border: 1px solid #eef2f6;
  border-radius: var(--radius-lg);
  padding: 36px;
  box-shadow: var(--shadow-soft);
}
.contact-form { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
.contact-form label:nth-child(5) { grid-column: 1 / -1; }
.contact-form label { display: flex; flex-direction: column; gap: 8px; font-size: 0.86rem; font-weight: 600; color: #334155; }
.contact-form input, .contact-form select, .contact-form textarea {
  border: 1.5px solid #e2e8f0; border-radius: var(--radius-sm);
  padding: 12px 14px; font-size: 0.92rem; font-family: inherit; color: var(--text);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  resize: vertical;
}
.contact-form input:focus, .contact-form select:focus, .contact-form textarea:focus {
  outline: none; border-color: var(--primary); box-shadow: 0 0 0 3px rgba(21,101,192,0.12);
}
.form-submit { grid-column: 1 / -1; justify-self: start; margin-top: 4px; }

.form-success { text-align: center; padding: 30px 10px; color: var(--primary-dark); }
.form-success svg { color: var(--primary); margin-bottom: 10px; }
.form-success h4 { margin-bottom: 8px; }
.form-success p { color: #64748b; margin-bottom: 18px; font-size: 0.92rem; }

/* Floating WhatsApp */
.fab-whatsapp {
  position: fixed; bottom: 26px; right: 26px; z-index: 90;
  width: 58px; height: 58px; border-radius: 50%;
  background: #25D366; color: #fff;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 10px 24px rgba(37,211,102,0.4);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  animation: fab-pulse 2.6s ease-in-out infinite;
}
.fab-whatsapp:hover { transform: scale(1.08); box-shadow: 0 14px 30px rgba(37,211,102,0.5); }
@keyframes fab-pulse {
  0%, 100% { box-shadow: 0 10px 24px rgba(37,211,102,0.4); }
  50% { box-shadow: 0 10px 24px rgba(37,211,102,0.4), 0 0 0 8px rgba(37,211,102,0.12); }
}
@media (prefers-reduced-motion: reduce) { .fab-whatsapp { animation: none; } }

/* Footer */
.footer { background: var(--primary-dark); color: rgba(255,255,255,0.85); padding: 64px 0 0; }
.footer-inner { display: grid; grid-template-columns: 1.4fr 1fr 1fr; gap: 40px; padding-bottom: 48px; }
.footer-title { display: block; font-weight: 800; font-size: 1.05rem; color: #fff; }
.footer-sub { display: block; color: var(--light-blue); font-weight: 600; margin-bottom: 12px; font-size: 0.92rem; }
.footer-brand p { font-size: 0.88rem; color: rgba(255,255,255,0.6); max-width: 280px; }
.footer-heading { display: block; font-weight: 700; color: #fff; margin-bottom: 16px; font-size: 0.9rem; }
.footer-links, .footer-contact { display: flex; flex-direction: column; gap: 12px; }
.footer-links a, .footer-contact a { font-size: 0.88rem; color: rgba(255,255,255,0.7); transition: color 0.2s ease; display: flex; align-items: center; gap: 8px; }
.footer-links a:hover, .footer-contact a:hover { color: #fff; }
.footer-bottom {
  text-align: center; padding: 20px 24px; font-size: 0.82rem;
  color: rgba(255,255,255,0.55);
  border-top: 1px solid rgba(255,255,255,0.1);
}

/* ---------------- Responsive ---------------- */
@media (max-width: 1024px) {
  .hero-inner { grid-template-columns: 1fr; }
  .hero-visual { order: -1; max-width: 460px; margin: 0 auto; }
  .furniture-grid { grid-template-columns: repeat(2, 1fr); }
  .timeline { grid-template-columns: repeat(4, 1fr); row-gap: 40px; }
  .timeline::before { display: none; }
  .contact-grid { grid-template-columns: 1fr; }
}

@media (max-width: 860px) {
  .nav-links, .nav-cta { display: none; }
  .hamburger { display: block; }
  .mobile-menu { display: flex; }
  .house-grid { grid-template-columns: 1fr; }
  .advantage-grid { grid-template-columns: 1fr 1fr; }
  .footer-inner { grid-template-columns: 1fr 1fr; }
  .footer-brand { grid-column: 1 / -1; }
}

@media (max-width: 640px) {
  .section { padding: 64px 0; }
  .hero { padding: 140px 0 72px; }
  .hero-stats { grid-template-columns: repeat(2, 1fr); gap: 22px; }
  .furniture-grid { grid-template-columns: 1fr 1fr; }
  .advantage-grid { grid-template-columns: 1fr; }
  .timeline { grid-template-columns: 1fr; row-gap: 28px; text-align: left; }
  .timeline-item { flex-direction: row; align-items: flex-start; gap: 16px; text-align: left; }
  .timeline-content { flex: 1; }
  .contact-form { grid-template-columns: 1fr; }
  .contact-form label:nth-child(5) { grid-column: auto; }
  .cta-actions { flex-direction: column; align-items: stretch; }
  .footer-inner { grid-template-columns: 1fr; }
}
`;
