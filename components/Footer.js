import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      style={footerStyle}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9 }}
      viewport={{ once: true }}
    >
      <div style={glow1}></div>
      <div style={glow2}></div>

      <div style={container}>
        {/* BRAND */}
        <div>
          <div style={brandRow}>
            <img src="/logo.png" alt="Fantabrand Logo" style={logo} />
            <h2 style={brandText}>Fantabrand Properties</h2>
          </div>

          <p style={desc}>Luxury living redefined.</p>

          {/* 🔥 ELITE SOCIAL ICONS */}
          <div style={socialWrap}>
            <SocialIcon type="facebook" link="https://facebook.com/fantabrand" />
            <SocialIcon type="instagram" link="https://instagram.com/fantabrand" />
            <SocialIcon type="linkedin" link="https://linkedin.com/company/fantabrand" />
          </div>
        </div>

        {/* LINKS */}
        <div>
          <h3 style={heading}>Explore</h3>
          <div style={linkColumn}>
            <Link href="/" style={link}>Home</Link>
            <Link href="/properties" style={link}>Projects</Link>
            <Link href="/become-a-partner" style={link}>Become a Partner</Link>
            <Link href="/contact" style={link}>Contact</Link>
          </div>
        </div>

        {/* CONTACT */}
        <div>
          <h3 style={heading}>Contact</h3>

          <div style={contactRow}><PhoneIcon /> <span>+234 906 350 4797</span></div>
          <div style={contactRow}><MailIcon /> <span>info@fantabrandproperties.com.ng</span></div>
          <div style={contactRow}><LocationIcon /> <span>Ilorin, Nigeria</span></div>
        </div>

        {/* CTA */}
        <div style={ctaBox}>
          <h3 style={ctaTitle}>Start Your Investment Journey</h3>
          <p style={ctaText}>Secure premium land today.</p>

          <Link href="/contact" style={ctaBtn}>
            Get Started →
          </Link>
        </div>
      </div>

      <div style={divider}></div>

      <p style={bottom}>
        © 2026 Fantabrand Properties. All rights reserved.
      </p>
    </motion.footer>
  );
}

//////////////////////////////////////////////////
// 🔥 SOCIAL ICON COMPONENT (ELITE VERSION)
//////////////////////////////////////////////////

const SocialIcon = ({ type, link }) => {
  const icons = {
    facebook: (
      <path d="M22 12a10 10 0 1 0-11.5 9.9v-7H7.5v-3h3V9.5c0-3 1.8-4.7 4.5-4.7 1.3 0 2.6.2 2.6.2v2.9h-1.5c-1.5 0-2 1-2 2v2.4h3.4l-.5 3h-2.9v7A10 10 0 0 0 22 12z"/>
    ),

    instagram: (
      <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm5 5a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm6.5-.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0z"/>
    ),

    linkedin: (
      <path d="M6.94 6.5H3.56v11h3.38v-11zM5.25 5a1.75 1.75 0 1 0 0-3.5A1.75 1.75 0 0 0 5.25 5zm13.75 6.25c0-3.04-1.62-4.45-3.78-4.45-1.74 0-2.52.96-2.96 1.64v-1.41h-3.38v11h3.38v-6.14c0-.32.02-.64.12-.87.26-.64.86-1.3 1.87-1.3 1.32 0 1.85.98 1.85 2.42v5.89h3.38v-6.78z"/>
    ),
  };

  return (
    <a href={link} target="_blank" rel="noopener noreferrer" style={socialIcon}>
      <svg
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="white"
      >
        {icons[type]}
      </svg>
    </a>
  );
};

//////////////////////////////////////////////////
// ICONS
//////////////////////////////////////////////////

const PhoneIcon = () => (
  <svg width="16" stroke="white" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.12.9.37 1.77.72 2.6a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.48-1.48a2 2 0 012.11-.45c.83.35 1.7.6 2.6.72A2 2 0 0122 16.92z"/>
  </svg>
);

const MailIcon = () => (
  <svg width="16" stroke="white" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
    <rect x="3" y="5" width="18" height="14" rx="2"/>
    <path d="M3 7l9 6 9-6"/>
  </svg>
);

const LocationIcon = () => (
  <svg width="16" stroke="white" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
    <path d="M12 21s-6-5.33-6-10a6 6 0 1112 0c0 4.67-6 10-6 10z"/>
    <circle cx="12" cy="11" r="2"/>
  </svg>
);

//////////////////////////////////////////////////
// STYLES (UPGRADED)
//////////////////////////////////////////////////

const footerStyle = {
  position: "relative",
  background: "radial-gradient(circle at top, #140021, #050505)",
  color: "white",
  padding: "100px 20px 40px",
  overflow: "hidden",
};

const container = {
  maxWidth: 1200,
  margin: "auto",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: 60,
};

const brandRow = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
};

const logo = { width: 44 };

const brandText = { fontSize: "20px", fontWeight: "600" };

const desc = { opacity: 0.6, marginTop: 10 };

const socialWrap = {
  display: "flex",
  gap: "14px",
  marginTop: "20px",
};

const socialIcon = {
  width: 44,
  height: 44,
  borderRadius: 12,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(255,255,255,0.08)",
  border: "1px solid rgba(255,255,255,0.12)",
  transition: "all 0.3s ease",
};

const heading = {
  fontSize: "14px",
  color: "#c084fc",
  marginBottom: "16px",
};

const linkColumn = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const link = {
  color: "rgba(255,255,255,0.6)",
  textDecoration: "none",
};

const contactRow = {
  display: "flex",
  gap: "10px",
  marginBottom: "12px",
  opacity: 0.8,
};

const ctaBox = {
  padding: 24,
  borderRadius: 16,
  background: "rgba(255,255,255,0.04)",
  backdropFilter: "blur(12px)",
};

const ctaTitle = { marginBottom: 10 };

const ctaText = { opacity: 0.6, marginBottom: 14 };

const ctaBtn = {
  padding: "10px 20px",
  borderRadius: 30,
  background: "linear-gradient(135deg,#7c3aed,#a855f7)",
  color: "#fff",
  textDecoration: "none",
};

const divider = {
  height: 1,
  background: "rgba(255,255,255,0.1)",
  margin: "60px 0 20px",
};

const bottom = {
  textAlign: "center",
  opacity: 0.5,
};

const glow1 = {
  position: "absolute",
  width: 300,
  height: 300,
  background: "#9333ea",
  filter: "blur(140px)",
  top: -100,
  left: -100,
  opacity: 0.3,
};

const glow2 = {
  position: "absolute",
  width: 300,
  height: 300,
  background: "#c084fc",
  filter: "blur(140px)",
  bottom: -100,
  right: -100,
  opacity: 0.3,
};