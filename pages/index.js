import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase/client";
import HeroSlider from "../components/HeroSlider";
import RotatingProperties from "../components/RotatingProperties";
import WhyChoose from "../components/WhyChoose";
import styles from "../styles/Home.module.css";
import Link from "next/link";

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

    </main>

  );

}