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
            Redefining luxury real estate experiences across Nigeria.
          </p>

          {/* Social Icons */}
          <div style={socialWrap}>
            <a href="https://facebook.com/fantabrand" target="_blank" style={socialIcon}>
              <svg width="18" height="18" fill="white" viewBox="0 0 24 24">
                <path d="M22 12a10 10 0 10-11.5 9.9v-7h-2.6V12h2.6V9.8c0-2.6 
                1.6-4 3.9-4 1.1 0 2.3.2 2.3.2v2.5h-1.3c-1.3 
                0-1.7.8-1.7 1.6V12h2.9l-.5 
                2.9h-2.4v7A10 10 0 0022 12"/>
              </svg>
            </a>

            <a href="https://instagram.com/fantabrand" target="_blank" style={socialIcon}>
              <svg width="18" height="18" fill="white" viewBox="0 0 24 24">
                <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 
                2.2 5 5 5h10c2.8 0 5-2.2 
                5-5V7c0-2.8-2.2-5-5-5H7zm5 
                5a5 5 0 110 10 5 5 0 010-10z"/>
              </svg>
            </a>

            <a href="https://linkedin.com/company/fantabrand" target="_blank" style={socialIcon}>
              <svg width="18" height="18" fill="white" viewBox="0 0 24 24">
                <path d="M4.98 3.5C4.98 4.88 3.87 
                6 2.5 6S0 4.88 0 3.5 1.12 1 
                2.5 1 4.98 2.12 4.98 3.5zM.5 
                8h4V24h-4V8zm7.5 
                0h3.8v2.2h.1c.5-.9 
                1.8-2.2 3.7-2.2 4 
                0 4.7 2.6 4.7 
                6V24h-4v-7.6c0-1.8 
                0-4.1-2.5-4.1z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Links */}
        <div>
          <h3 style={heading}>Explore</h3>
          <div style={linkColumn}>
            <Link href="/" style={link}>Home</Link>
            <Link href="/properties" style={link}>Properties</Link>
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

      {/* Hover Effects */}
      <style jsx global>{`
        footer a {
          transition: all 0.3s ease;
        }

        footer a:hover {
          transform: translateY(-3px);
          opacity: 1 !important;
        }

        footer a:hover svg {
          transform: scale(1.1);
        }

        footer div[style*="38px"]:hover {
          background: linear-gradient(135deg, #9333ea, #c084fc);
          box-shadow: 0 0 25px rgba(147,51,234,0.6);
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
  width: 38,
  height: 38,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "12px",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
  cursor: "pointer"
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