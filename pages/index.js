import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase/client";
import HeroSlider from "../components/HeroSlider";
import RotatingProperties from "../components/RotatingProperties";
import WhyChoose from "../components/WhyChoose";
import PremiumFaq from "../components/PremiumFaq";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Head from "next/head";

export default function Home() {

  const [properties, setProperties] = useState([]);
  const [news, setNews] = useState([]);
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    fetchProperties();
    fetchNews();
  }, []);

  /* =========================
     FETCH PROPERTIES
  ========================= */

  async function fetchProperties() {

    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(12);

    if (!error) {
      setProperties(data || []);
    }

  }

  /* =========================
     FETCH NEWS
  ========================= */

  async function fetchNews() {

    const { data, error } = await supabase
      .from("news")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5);

    if (!error) {
      setNews(data || []);
    }

  }

  /* =========================
     NEWS SLIDER ROTATION
  ========================= */

  useEffect(() => {

    if (news.length === 0) return;

    const interval = setInterval(() => {

      setHeroIndex((prev) =>
        prev === news.length - 1 ? 0 : prev + 1
      );

    }, 6000);

    return () => clearInterval(interval);

  }, [news]);

  return (

    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What does Fantabrand Properties do?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Fantabrand Properties Limited helps individuals and investors acquire verified land and real estate in high-growth locations across Nigeria."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Where are your properties located?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Our properties are located in fast-growing investment areas including Ilorin, Kwara State and other strategic locations."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can I inspect the land before payment?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. Fantabrand Properties organizes site inspections so buyers can verify the property before making payment."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do you offer installment payment plans?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. Flexible installment payment plans are available depending on the property."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What documents will I receive after purchase?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Buyers receive important documents such as Deed of Assignment, Survey Plan, Payment Receipt and Allocation Letter."
                  }
                }
              ]
            })
          }}
        />
      </Head>

      <main className={styles.home}>

        <HeroSlider />

        {/* =========================
            FEATURED PROPERTIES
        ========================= */}

        <section className={styles.featureSection}>

          <div className={styles.container}>

            <h2 className={styles.sectionTitle}>
              Explore Our Properties
            </h2>

            <p className={styles.sectionSubtitle}>
              Handpicked premium real estate opportunities
            </p>

            <div style={{ marginTop: "40px" }}>
              <RotatingProperties properties={properties} />
            </div>

            <div className={styles.center}>
              <Link
                href="/properties"
                className={styles.primaryBtn}
              >
                View All Properties
              </Link>
            </div>

          </div>

        </section>

        {/* =========================
            NEWS SECTION
        ========================= */}

        <section className={styles.featureSection}>

          <div className={styles.container}>

            <h2 className={styles.sectionTitle}>
              Latest News & Updates
            </h2>

            <p className={styles.sectionSubtitle}>
              Real estate insights and investment updates
            </p>

            {news.length > 0 && (

              <Link
                href={`/news/${news[heroIndex].slug}`}
                className={styles.featuredNews}
              >

                <img
                  src={
                    news[heroIndex].image_url
                    ? news[heroIndex].image_url
                    : "/hero1.jpg"
                  }
                  alt={news[heroIndex].title}
                />

                <div className={styles.overlay} />

                <div className={styles.featuredContent}>

                  <span className={styles.categoryBadge}>
                    {news[heroIndex].category || "News"}
                  </span>

                  <h3>
                    {news[heroIndex].title}
                  </h3>

                  <p>
                    {news[heroIndex].excerpt ||
                     news[heroIndex].content?.substring(0,120)}
                  </p>

                </div>

              </Link>

            )}

            <div className={styles.center}>
              <Link
                href="/news"
                className={styles.primaryBtn}
              >
                View All News
              </Link>
            </div>

          </div>

        </section>

        <WhyChoose />
        <PremiumFaq />

      </main>
    </>

  );

}