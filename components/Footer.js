import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      style={footerStyle}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      {/* Glow Effects */}
      <div style={glow1}></div>
      <div style={glow2}></div>

      <div style={container}>
        {/* Brand */}
        <div>
          <div style={brandRow}>
            <img src="/logo.png" alt="Fantabrand Logo" style={logo} />
            <h2 style={brandText}>Fantabrand Properties</h2>
          </div>

          <p style={desc}>
            Luxury living redefined.
          </p>

          {/* 🔥 PREMIUM SOCIAL ICONS */}
          <div style={socialWrap}>
            {/* Facebook */}
            <a href="https://facebook.com/fantabrand" target="_blank" rel="noopener noreferrer" style={socialIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
              </svg>
            </a>

            {/* Instagram */}
            <a href="https://instagram.com/fantabrand" target="_blank" rel="noopener noreferrer" style={socialIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
                <rect x="2" y="2" width="20" height="20" rx="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17" cy="7" r="1"/>
              </svg>
            </a>

            {/* LinkedIn */}
            <a href="https://linkedin.com/company/fantabrand" target="_blank" rel="noopener noreferrer" style={socialIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
                <path d="M10 9h4v2h.1a4 4 0 013.9-2c4 0 4.5 2.5 4.5 6V21h-4v-5c0-2-.5-3-2-3s-2.5 1.3-2.5 3V21h-4z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Links */}
        <div>
          <h3 style={heading}>Explore</h3>
          <div style={linkColumn}>
            <Link href="/" style={link}>Home</Link>
            <Link href="/properties" style={link}>Projects</Link>
            <Link href="/become-a-partner" style={link}>Become a Partner</Link>
            <Link href="/contact" style={link}>Contact</Link>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 style={heading}>Contact</h3>

          <div style={contactRow}>
            <PhoneIcon />
            <span style={contactText}>+234 906 350 4797</span>
          </div>

          <div style={contactRow}>
            <MailIcon />
            <span style={contactText}>info@fantabrandproperties.com.ng</span>
          </div>

          <div style={contactRow}>
            <LocationIcon />
            <span style={contactText}>2, Mubo Phase II, Ilorin, Nigeria</span>
          </div>
        </div>

        {/* CTA */}
        <div style={ctaBox}>
          <h3 style={ctaTitle}>Start Your Investment Journey</h3>
          <p style={ctaText}>Secure premium land today.</p>
          <Link href="/contact" style={ctaBtn}>
            Get Started
          </Link>
        </div>
      </div>

      {/* Divider */}
      <div style={divider}></div>

      {/* Bottom */}
      <p style={bottom}>
        © 2026 Fantabrand Properties. All rights reserved.
      </p>

      {/* 🔥 PREMIUM HOVER EFFECTS */}
      <style jsx global>{`
        footer a {
          transition: all 0.3s ease;
        }

        footer a:hover {
          transform: translateY(-4px) scale(1.05);
          background: linear-gradient(135deg, #9333ea, #c084fc);
          box-shadow: 0 10px 30px rgba(147,51,234,0.5);
        }

        footer a:hover svg {
          transform: scale(1.1);
        }
      `}</style>
    </motion.footer>
  );
}

/* ICONS */

const PhoneIcon = () => (
  <svg width="18" height="18" stroke="white" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 
    19.79 19.79 0 01-8.63-3.07 
    19.5 19.5 0 01-6-6 
    19.79 19.79 0 01-3.07-8.67A2 
    2 0 014.11 2h3a2 2 0 012 
    1.72c.12.9.37 1.77.72 2.6a2 
    2 0 01-.45 2.11L8.09 9.91a16 
    16 0 006 6l1.48-1.48a2 2 0 
    012.11-.45c.83.35 1.7.6 
    2.6.72A2 2 0 0122 16.92z"/>
  </svg>
);

const MailIcon = () => (
  <svg width="18" height="18" stroke="white" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
    <rect x="3" y="5" width="18" height="14" rx="2"/>
    <path d="M3 7l9 6 9-6"/>
  </svg>
);

const LocationIcon = () => (
  <svg width="18" height="18" stroke="white" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
    <path d="M12 21s-6-5.33-6-10a6 6 0 1112 
    0c0 4.67-6 10-6 10z"/>
    <circle cx="12" cy="11" r="2"/>
  </svg>
);

/* STYLES */

const footerStyle = {
  position: "relative",
  background: "radial-gradient(circle at top, #1a002b, #050505)",
  color: "white",
  padding: "100px 20px 40px",
  overflow: "hidden"
};

const container = {
  maxWidth: 1200,
  margin: "auto",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 50,
  position: "relative",
  zIndex: 2
};

const brandRow = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  marginBottom: "14px"
};

const logo = { width: 44 };

const brandText = {
  fontSize: "20px",
  fontWeight: "600"
};

const desc = {
  color: "rgba(255,255,255,0.6)",
  fontSize: "14px",
  lineHeight: 1.6
};

const socialWrap = {
  display: "flex",
  gap: "12px",
  marginTop: "20px"
};

const socialIcon = {
  width: 42,
  height: 42,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "14px",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.12)",
  cursor: "pointer",
  transition: "all 0.3s ease"
};

const heading = {
  fontSize: "15px",
  marginBottom: "16px",
  color: "#c084fc",
  letterSpacing: "1px"
};

const linkColumn = {
  display: "flex",
  flexDirection: "column",
  gap: "12px"
};

const link = {
  color: "rgba(255,255,255,0.65)",
  textDecoration: "none",
  fontSize: "14px"
};

const contactRow = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "12px",
  opacity: 0.85
};

const contactText = {
  fontSize: "14px"
};

const ctaBox = {
  padding: "22px",
  borderRadius: "18px",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  backdropFilter: "blur(12px)"
};

const ctaTitle = {
  fontSize: "16px",
  marginBottom: "10px"
};

const ctaText = {
  fontSize: "13px",
  color: "rgba(255,255,255,0.6)",
  marginBottom: "16px"
};

const ctaBtn = {
  display: "inline-block",
  padding: "10px 20px",
  borderRadius: "30px",
  background: "linear-gradient(90deg, #9333ea, #c084fc)",
  color: "white",
  fontSize: "13px",
  textDecoration: "none"
};

const divider = {
  height: "1px",
  background: "linear-gradient(to right, transparent, rgba(147,51,234,0.5), transparent)",
  margin: "60px auto 20px",
  maxWidth: 1200
};

const bottom = {
  textAlign: "center",
  fontSize: "13px",
  color: "rgba(255,255,255,0.5)"
};

const glow1 = {
  position: "absolute",
  width: 320,
  height: 320,
  background: "#9333ea",
  filter: "blur(150px)",
  top: -100,
  left: -100,
  opacity: 0.3
};

const glow2 = {
  position: "absolute",
  width: 320,
  height: 320,
  background: "#c084fc",
  filter: "blur(150px)",
  bottom: -100,
  right: -100,
  opacity: 0.3
};