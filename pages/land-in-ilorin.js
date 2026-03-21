import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";

export default function IlorinPage() {
  return (
    <>
      <Head>
        <title>Affordable Land in Ilorin Kwara | Buy Land in Ilorin Nigeria</title>

        <meta
          name="description"
          content="Buy affordable land in Ilorin Kwara State with verified documents and flexible payment plans."
        />
      </Head>

      <main style={{ background: "#050505", color: "white" }}>

        {/* HERO */}
        <section style={heroSection}>

          <div style={heroImage}></div>
          <div style={heroOverlay}></div>

          <motion.div
            style={heroContent}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 style={heroTitle}>
              Own Verified Land in Ilorin Before Prices Increase
            </h1>

            <p style={heroSubtitle}>
              Secure your plot in a fast-developing location with flexible payment plans.
            </p>

            <div style={valueStrip}>
              <span>From ₦500k</span>
              <span>📍 Ilorin</span>
              <span>Flexible Payment</span>
            </div>

            <a href="https://wa.me/2349063504797" style={ctaBtn}>
              Chat on WhatsApp
            </a>

            <p style={urgency}>
              Limited plots remaining — act fast
            </p>
          </motion.div>
        </section>

        {/* TRUST */}
        <section style={section}>
          <h2 style={title}>100% Secure Investment</h2>

          <div style={grid}>
            {[
              "Registered Survey Plan",
              "Deed of Assignment",
              "Instant Allocation",
              "No Government Issues"
            ].map((item, i) => (
              <div key={i} style={card}>{item}</div>
            ))}
          </div>
        </section>

        {/* WHY */}
        <section style={section}>
          <h2 style={title}>Why Invest in Ilorin?</h2>

          <div style={grid}>
            {[
              "Affordable entry price",
              "Rapid urban development",
              "Growing population",
              "High ROI potential"
            ].map((item, i) => (
              <div key={i} style={card}>{item}</div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={ctaSection}>
          <h2 style={title}>Secure Your Plot Today</h2>

          <a href="https://wa.me/2349063504797" style={ctaBtn}>
            Book Inspection Now
          </a>
        </section>

        {/* BACK */}
        <section style={section}>
          <Link href="/" style={backBtn}>
            Back to Home
          </Link>
        </section>

      </main>
    </>
  );
}

/* 🔥 STYLES */

const heroSection = {
  position: "relative",
  height: "90vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden"
};

const heroImage = {
  position: "absolute",
  inset: 0,
  backgroundImage: "url('/land.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center"
};

const heroOverlay = {
  position: "absolute",
  inset: 0,
  background: "linear-gradient(to bottom, rgba(0,0,0,0.7), #050505)"
};

const heroContent = {
  textAlign: "center",
  zIndex: 2,
  maxWidth: 800,
  padding: "0 20px"
};

const heroTitle = {
  fontSize: "42px",
  fontWeight: "700",
  marginBottom: "16px"
};

const heroSubtitle = {
  fontSize: "16px",
  color: "rgba(255,255,255,0.7)",
  marginBottom: "20px"
};

const valueStrip = {
  display: "flex",
  justifyContent: "center",
  gap: "20px",
  marginBottom: "20px",
  fontSize: "14px",
  color: "#c084fc",
  flexWrap: "wrap"
};

const urgency = {
  fontSize: "13px",
  marginTop: "12px",
  color: "#c084fc"
};

const ctaBtn = {
  padding: "12px 26px",
  borderRadius: "30px",
  background: "linear-gradient(90deg, #9333ea, #c084fc)",
  color: "white",
  textDecoration: "none",
  display: "inline-block",
  fontWeight: "500"
};

const section = {
  padding: "80px 20px",
  maxWidth: 1100,
  margin: "auto",
  textAlign: "center"
};

const title = {
  fontSize: "26px",
  marginBottom: "30px"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "20px"
};

const card = {
  padding: "20px",
  borderRadius: "16px",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)"
};

const ctaSection = {
  textAlign: "center",
  padding: "80px 20px"
};

const backBtn = {
  padding: "10px 20px",
  borderRadius: "30px",
  border: "1px solid rgba(255,255,255,0.2)",
  color: "white",
  textDecoration: "none"
};