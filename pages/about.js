import { useEffect } from "react";
import styles from "../styles/About.module.css";
import ExecutiveSection from "../components/ExecutiveSection";

export default function About() {

  useEffect(() => {
    const sections = document.querySelectorAll(`.${styles.reveal}`);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.revealActive);

            // Stagger children
            const items = entry.target.querySelectorAll(`.${styles.revealItem}`);
            items.forEach((item, index) => {
              setTimeout(() => {
                item.classList.add(styles.revealItemActive);
              }, index * 150);
            });
          }
        });
      },
      { threshold: 0.15 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.aboutPage}>
      
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1>Redefining Modern Real Estate</h1>
          <p>
            At Fantabrand Properties Limited, we create premium living 
            environments designed for long-term value and timeless elegance.
          </p>
        </div>
      </section>

      {/* STORY */}
      <section className={`${styles.storySection} ${styles.reveal}`}>
        <div className={styles.storyContainer}>
          <div className={`${styles.storyLeft} ${styles.revealItem}`}>
            <h2>Our Story</h2>
            <p>
              Fantabrand Properties Limited was founded with a clear mission:
              to deliver high-value real estate developments that combine
              architectural excellence, smart investment strategy, and
              enduring luxury.
            </p>
          </div>

          <div className={`${styles.storyRight} ${styles.revealItem}`}>
            <div className={styles.statsCard}>
              <h3>10+</h3>
              <span>Projects Delivered</span>
            </div>
            <div className={styles.statsCard}>
              <h3>100%</h3>
              <span>Client Satisfaction</span>
            </div>
            <div className={styles.statsCard}>
              <h3>5+</h3>
              <span>Strategic Locations</span>
            </div>
          </div>
        </div>
      </section>

      {/* VISION */}
      <section className={`${styles.visionSection} ${styles.reveal}`}>
        <div className={`${styles.visionCard} ${styles.revealItem}`}>
          <h3>Our Vision</h3>
          <p>
            To become a leading real estate development brand recognized
            for innovation, integrity, and exceptional value delivery.
          </p>
        </div>

        <div className={`${styles.visionCard} ${styles.revealItem}`}>
          <h3>Our Mission</h3>
          <p>
            To create sustainable properties that elevate lifestyles,
            maximize investment returns, and redefine urban living standards.
          </p>
        </div>
      </section>

      {/* EXECUTIVE */}
      <div className={styles.reveal}>
        <ExecutiveSection />
      </div>

      {/* CORE VALUES */}
      <section className={`${styles.coreSection} ${styles.reveal}`}>
        <div className={`${styles.coreHeader} ${styles.revealItem}`}>
          <h2>Our Core Values</h2>
          <p>
            The principles that define how we build, operate, and deliver long-term value.
          </p>
        </div>

        <div className={styles.coreGrid}>
          <div className={`${styles.coreCard} ${styles.revealItem}`}>
            <h4>Integrity</h4>
            <p>Transparency and accountability guide every transaction.</p>
          </div>

          <div className={`${styles.coreCard} ${styles.revealItem}`}>
            <h4>Excellence</h4>
            <p>Superior design and execution in every development.</p>
          </div>

          <div className={`${styles.coreCard} ${styles.revealItem}`}>
            <h4>Innovation</h4>
            <p>Forward-thinking strategies that enhance value.</p>
          </div>

          <div className={`${styles.coreCard} ${styles.revealItem}`}>
            <h4>Sustainability</h4>
            <p>Developments built for generational responsibility.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`${styles.ctaSection} ${styles.reveal}`}>
        <h2 className={styles.revealItem}>Let’s Build Value Together</h2>
        <p className={styles.revealItem}>
          Partner with Fantabrand for smart, secure real estate investments.
        </p>
        <button className={styles.revealItem}>Explore Properties</button>
      </section>

    </div>
  );
}