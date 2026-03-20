import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function IlorinPage() {

  return (
    <>
      <Head>
        <title>Affordable Land in Ilorin Kwara | Buy Land in Ilorin Nigeria</title>

        <meta
          name="description"
          content="Buy affordable land in Ilorin Kwara State with verified documents and flexible payment plans. Invest in fast-growing real estate in Ilorin."
        />

        <meta
          name="keywords"
          content="land in ilorin, buy land in ilorin kwara, affordable land ilorin, real estate ilorin nigeria"
        />

        <meta property="og:title" content="Affordable Land in Ilorin Kwara" />
        <meta property="og:description" content="Secure verified land in Ilorin with flexible payment plans." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.fantabrandproperties.com.ng/land-in-ilorin" />

        {/* ✅ FULL GOOGLE SCHEMA */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              "name": "Fantabrand Properties Limited",
              "url": "https://www.fantabrandproperties.com.ng/land-in-ilorin",
              "logo": "https://www.fantabrandproperties.com.ng/logo.png",
              "description": "Fantabrand Properties offers verified and affordable land for sale in Ilorin Kwara State with flexible payment plans.",
              "areaServed": {
                "@type": "Place",
                "name": "Ilorin, Kwara State, Nigeria"
              },
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Ilorin",
                "addressRegion": "Kwara",
                "addressCountry": "NG"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+2349063504797",
                "contactType": "customer service",
                "areaServed": "NG"
              },
              "sameAs": [
                "https://wa.me/2349063504797"
              ]
            })
          }}
        />
      </Head>

      <main className={styles.home}>

        {/* HERO WITH GRADIENT + PATTERN */}
        <section
          className={styles.featureSection}
          style={{
            background: "linear-gradient(135deg, #2b0a3d, #4b0082)",
            color: "#fff",
            position: "relative",
            overflow: "hidden"
          }}
        >

          {/* PATTERN OVERLAY */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "url('/pattern.png')",
              opacity: 0.08,
              backgroundRepeat: "repeat"
            }}
          />

          {/* CONTENT */}
          <div
            className={styles.container}
            style={{
              position: "relative",
              padding: "80px 20px",
              zIndex: 2
            }}
          >

            <h1 className={styles.sectionTitle}>
              Land for Sale in Ilorin Kwara State
            </h1>

            <p className={styles.sectionSubtitle}>
              Secure verified land in Ilorin with flexible payment plans. 
              Limited plots available — invest early and maximize returns.
            </p>

            <div className={styles.center} style={{ marginTop: "20px" }}>
              <a
                href="https://wa.me/2349063504797"
                className={styles.primaryBtn}
                target="_blank"
                rel="noopener noreferrer"
              >
                Chat on WhatsApp
              </a>
            </div>

            <p style={{ marginTop: "10px", fontSize: "14px", color: "#ddd" }}>
              ⚡ Limited plots remaining — prices increasing soon
            </p>

          </div>
        </section>

        {/* TRUST */}
        <section className={styles.featureSection}>
          <div className={styles.container}>

            <h2 className={styles.sectionTitle}>
              100% Verified & Secure Land
            </h2>

            <ul style={{ marginTop: "20px", lineHeight: "2" }}>
              <li>✔ Registered Survey Plan</li>
              <li>✔ Deed of Assignment</li>
              <li>✔ Allocation Guarantee</li>
              <li>✔ No Government Acquisition</li>
            </ul>

          </div>
        </section>

        {/* WHY ILORIN */}
        <section className={styles.featureSection}>
          <div className={styles.container}>

            <h2 className={styles.sectionTitle}>
              Why Invest in Ilorin?
            </h2>

            <ul style={{ marginTop: "20px", lineHeight: "2" }}>
              <li>✅ Affordable land compared to major cities</li>
              <li>✅ Rapid urban development</li>
              <li>✅ Growing population</li>
              <li>✅ High ROI potential</li>
            </ul>

          </div>
        </section>

        {/* CTA */}
        <section className={styles.featureSection}>
          <div className={styles.container}>

            <h2 className={styles.sectionTitle}>
              Secure Your Plot Today
            </h2>

            <div className={styles.center} style={{ marginTop: "20px" }}>
              <a
                href="https://wa.me/2349063504797"
                className={styles.primaryBtn}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book Inspection Now
              </a>
            </div>

          </div>
        </section>

        {/* BACK LINK */}
        <section className={styles.featureSection}>
          <div className={styles.container}>

            <div className={styles.center}>
              <Link href="/" className={styles.primaryBtn}>
                Back to Home
              </Link>
            </div>

          </div>
        </section>

      </main>
    </>
  );
}