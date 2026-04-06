// pages/become-a-partner.js
import Head from "next/head";
import { useEffect } from "react";
import styles from "../styles/BecomePartner.module.css";

export default function BecomePartner() {

  /* WHATSAPP LINK */
  const whatsappLink = `https://wa.me/2349063504797?text=${encodeURIComponent(
    "Hello Fantabrand Properties, I would like to become a partner and start earning with your real estate opportunities."
  )}`;

  /* SCROLL ANIMATION */
  useEffect(() => {
    const cards = document.querySelectorAll(`.${styles.valueCard}`);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.show);
          }
        });
      },
      { threshold: 0.2 }
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Head>
        <title>Become a Partner | Fantabrand Properties</title>
      </Head>

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.overlay}></div>

        <div className={styles.heroContent}>
          <h1>Become one of our sales titans</h1>
          <p>
            Fantabrand Properties is a fast-growing brand in Ilorin.
            Our partners enjoy high commission, elite sales training, and strong marketing support.
            Partner with us to sell premium land and earn massively.
            No experience? No problem — just bring your ambition.
          </p>

          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <button className={styles.primaryBtn}>
              Explore Partnership
            </button>
          </a>
        </div>
      </section>

      {/* GALLERY */}
      <section className={styles.gallery}>
        <h2>Our Partners in Action</h2>

        <div className={styles.galleryGrid}>
          <div className={styles.imageCard}>
            <img src="/partner1.jpg" alt="Fantabrand partner" />
          </div>
          <div className={styles.imageCard}>
            <img src="/partner2.jpg" alt="Fantabrand team" />
          </div>
          <div className={styles.imageCard}>
            <img src="/partner3.jpg" alt="Land inspection" />
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className={styles.values}>
        <h2 className={styles.valuesTitle}>Our Core Values</h2>

        <div className={styles.valuesGrid}>

          <div className={styles.valueCard}>
            <div className={styles.icon}>
              <svg viewBox="0 0 24 24">
                <path d="M12 21s-6-4.35-9-8.5C-1 7 3 2 7.5 4.5 9 5.5 12 8 12 8s3-2.5 4.5-3.5C21 2 25 7 21 12.5 18 16.65 12 21 12 21z"/>
              </svg>
            </div>
            <h3>Integrity</h3>
            <p>We operate with honesty and keep every promise we make.</p>
          </div>

          <div className={styles.valueCard}>
            <div className={styles.icon}>
              <svg viewBox="0 0 24 24">
                <path d="M3 17l6-6 4 4 8-8"/>
              </svg>
            </div>
            <h3>Growth</h3>
            <p>We help our partners grow their income and financial future.</p>
          </div>

          <div className={styles.valueCard}>
            <div className={styles.icon}>
              <svg viewBox="0 0 24 24">
                <path d="M16 11c1.66 0 3-1.34 3-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zM8 11c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3z"/>
              </svg>
            </div>
            <h3>Teamwork</h3>
            <p>We collaborate with our partners for shared success.</p>
          </div>

          <div className={styles.valueCard}>
            <div className={styles.icon}>
              <svg viewBox="0 0 24 24">
                <path d="M13 2L3 14h7v8l10-12h-7z"/>
              </svg>
            </div>
            <h3>Speed & Delivery</h3>
            <p>Fast processes, quick response, reliable delivery always.</p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <h2>Ready to Start Earning?</h2>
        <p>
          Join Fantabrand’s sales titans today and start building serious income in real estate.
        </p>

        <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
          <button className={styles.primaryBtn}>
            Chat With Us on WhatsApp
          </button>
        </a>
      </section>
    </>
  );
}