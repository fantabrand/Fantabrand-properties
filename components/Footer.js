import Link from "next/link";

export default function Footer() {

  return (
    <footer style={{
      position: "relative",
      background: "linear-gradient(145deg, #37024a, #111)",
      color: "white",
      padding: "60px 20px 30px",
      borderTop: "1px solid rgba(255,255,255,0.08)",
      overflow: "hidden"
    }}>

      {/* Texture Overlay */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage:
          "url('https://www.transparenttextures.com/patterns/asfalt-dark.png')",
        opacity: 0.18,
        pointerEvents: "none"
      }}/>

      {/* Content */}
      <div style={{
        position: "relative",
        maxWidth: 1200,
        margin: "auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 40,
        alignItems: "start"
      }}>

        {/* Brand */}
        <div>

          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "16px"
          }}>
            <img
              src="/logo.png"
              alt="Fantabrand Logo"
              style={{
                width: 42,
                height: 42,
                objectFit: "contain"
              }}
            />

            <h2 style={{
              margin: 0,
              fontSize: "22px",
              letterSpacing: "1px"
            }}>
              Fantabrand Properties
            </h2>
          </div>

          <p style={{
            color: "rgba(255,255,255,0.7)",
            lineHeight: 1.6,
            fontSize: "14px"
          }}>
            Curating premium real estate investments and luxury
            living spaces across Lagos.
          </p>

          {/* Social Media Icons */}
          <div style={{
            display: "flex",
            gap: "14px",
            marginTop: "18px"
          }}>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/fantabrand"
              target="_blank"
              rel="noopener noreferrer"
              style={socialIcon}
              aria-label="Facebook"
            >
              <svg width="18" height="18" fill="white" viewBox="0 0 24 24">
                <path d="M22 12a10 10 0 10-11.5 9.9v-7h-2.6V12h2.6V9.8c0-2.6 1.6-4 3.9-4 1.1 0 2.3.2 2.3.2v2.5h-1.3c-1.3 0-1.7.8-1.7 1.6V12h2.9l-.5 2.9h-2.4v7A10 10 0 0022 12"/>
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/fantabrand/"
              target="_blank"
              rel="noopener noreferrer"
              style={socialIcon}
              aria-label="Instagram"
            >
              <svg width="18" height="18" fill="white" viewBox="0 0 24 24">
                <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 
                0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm5 
                5a5 5 0 110 10 5 5 0 010-10zm6.5-.8a1.2 
                1.2 0 110 2.4 1.2 1.2 0 010-2.4zM12 
                9a3 3 0 100 6 3 3 0 000-6z"/>
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/fantabrand"
              target="_blank"
              rel="noopener noreferrer"
              style={socialIcon}
              aria-label="LinkedIn"
            >
              <svg width="18" height="18" fill="white" viewBox="0 0 24 24">
                <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 
                6S0 4.88 0 3.5 1.12 1 2.5 1 
                4.98 2.12 4.98 3.5zM.5 
                8h4V24h-4V8zm7.5 
                0h3.8v2.2h.1c.5-.9 
                1.8-2.2 3.7-2.2 4 
                0 4.7 2.6 4.7 
                6V24h-4v-7.6c0-1.8 
                0-4.1-2.5-4.1s-2.9 
                1.9-2.9 3.9V24h-4V8z"/>
              </svg>
            </a>

          </div>

        </div>


        {/* Links */}
        <div>

          <h3 style={headingStyle}>
            Quick Links
          </h3>

          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px"
          }}>
            <Link href="/" style={linkStyle}>Home</Link>
            <Link href="/properties" style={linkStyle}>Properties</Link>
            <Link href="/contact" style={linkStyle}>Contact</Link>
          </div>

        </div>


        {/* Contact */}
        <div>

          <h3 style={headingStyle}>
            Contact
          </h3>

          <p style={contactStyle}>📞 +234 906 350 4797</p>
          <p style={contactStyle}>📧 info@fantabrand.com.ng</p>
          <p style={contactStyle}>📍 2, Mubo Phase II, Ilorin, Nigeria</p>

        </div>

      </div>


      {/* Trust Badges */}
      <div style={{
        position: "relative",
        maxWidth: 1200,
        margin: "40px auto 0",
        display: "flex",
        justifyContent: "center",
        gap: "30px",
        flexWrap: "wrap"
      }}>
        <div style={badge}>🔒 Secure Investment</div>
        <div style={badge}>✔ Verified Properties</div>
        <div style={badge}>🏆 Trusted Developer</div>
      </div>


      {/* Divider */}
      <div style={{
        position: "relative",
        height: "1px",
        background: "linear-gradient(to right, transparent, rgba(201,162,39,0.6), transparent)",
        margin: "40px auto 20px",
        maxWidth: 1200
      }}/>


      {/* Bottom */}
      <div style={{
        position: "relative",
        textAlign: "center",
        fontSize: "13px",
        color: "rgba(255,255,255,0.6)"
      }}>
        © 2026 Fantabrand Properties. All rights reserved.
      </div>

    </footer>
  );
}


/* Styles */

const linkStyle = {
  color: "rgba(255,255,255,0.75)",
  textDecoration: "none",
  fontSize: "14px"
};

const contactStyle = {
  fontSize: "14px",
  color: "rgba(255,255,255,0.75)",
  marginBottom: "8px"
};

const headingStyle = {
  fontSize: "16px",
  marginBottom: "16px",
  letterSpacing: "1px",
  color: "#c9a227"
};

const socialIcon = {
  width: "38px",
  height: "38px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(255,255,255,0.05)",
  borderRadius: "10px",
  border: "1px solid rgba(255,255,255,0.08)"
};

const badge = {
  padding: "10px 18px",
  background: "rgba(255,255,255,0.04)",
  borderRadius: "30px",
  fontSize: "13px",
  border: "1px solid rgba(201,162,39,0.25)",
  color: "rgba(255,255,255,0.85)",
  letterSpacing: "0.5px"
};
