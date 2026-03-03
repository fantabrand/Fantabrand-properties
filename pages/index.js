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

  async function fetchProperties() {
    const { data } = await supabase
      .from("properties")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(12); // allow enough for rotation

    setProperties(data || []);
  }

  async function fetchNews() {
    const { data } = await supabase
      .from("news")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5);

    setNews(data || []);
  }

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

      {/* FEATURED PROPERTIES */}
      <section className={styles.featureSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>
            Featured Properties
          </h2>

          <p className={styles.sectionSubtitle}>
            Handpicked premium real estate opportunities
          </p>

          {/* ✅ ROTATING PROPERTIES */}
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

      {/* NEWS SECTION */}
      <section className={styles.featureSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>
            Latest News
          </h2>

          <p className={styles.sectionSubtitle}>
            Real estate insights and investment updates
          </p>

          {news.length > 0 && (
            <Link
              href={`/news/${news[heroIndex].id}`}
              className={styles.featuredNews}
            >
              <img
                src={news[heroIndex].image_url || "/hero1.jpg"}
                alt={news[heroIndex].title}
              />
              <div className={styles.overlay} />
              <div className={styles.featuredContent}>
                <span className={styles.categoryBadge}>
                  {news[heroIndex].category}
                </span>
                <h3>{news[heroIndex].title}</h3>
                <p>{news[heroIndex].excerpt}</p>
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