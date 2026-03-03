import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase/client";
import HeroSlider from "../components/HeroSlider";
import WhyChoose from "../components/WhyChoose";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Home() {

  const [properties, setProperties] = useState([]);
  const [news, setNews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    fetchProperties();
    fetchNews();
  }, []);

  async function fetchProperties() {
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(6);

    if (!error) {
      setProperties(data || []);
    }
  }

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

  /* FEATURED PROPERTY AUTO SLIDE */
  useEffect(() => {
    if (properties.length <= 3) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev >= properties.length - 3 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [properties]);

  /* NEWS HERO AUTO ROTATE */
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

      {/* HERO */}
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

          <div className={styles.carouselWrapper}>
            <div
              className={styles.carouselTrack}
              style={{
                transform: `translateX(-${currentIndex * (100 / 3)}%)`,
              }}
            >
              {properties.map((property) => (
                <Link
                  key={property.id}
                  href={`/properties/${property.slug}`}
                  className={styles.card}
                >
                  <img
                    src={property.image_url}
                    alt={property.title}
                    className={styles.image}
                  />

                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>
                      {property.title}
                    </h3>

                    <p className={styles.cardLocation}>
                      {property.location}
                    </p>

                    <p className={styles.cardPrice}>
                      ₦{property.price?.toLocaleString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className={styles.center}>
            <Link href="/properties" className={styles.primaryBtn}>
              View All Properties
            </Link>
          </div>

        </div>
      </section>


      {/* AUTO ROTATING NEWS SECTION */}
      <section className={styles.featureSection}>

        <div className={styles.container}>

          <h2 className={styles.sectionTitle}>
            Latest News
          </h2>

          <p className={styles.sectionSubtitle}>
            Real estate insights and investment updates
          </p>

          {news.length > 0 && (
            <div className={styles.editorialLayout}>

              {/* ROTATING HERO */}
              <Link
                key={heroIndex}
                href={`/news/${news[heroIndex].id}`}
                className={`${styles.featuredNews} ${styles.fadeIn}`}
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

              {/* SIDE ARTICLES */}
              <div className={styles.sideNews}>

                {news
                  .filter((_, index) => index !== heroIndex)
                  .slice(0, 2)
                  .map((item) => (

                    <Link
                      key={item.id}
                      href={`/news/${item.id}`}
                      className={styles.sideCard}
                    >

                      <img
                        src={item.image_url || "/hero1.jpg"}
                        alt={item.title}
                      />

                      <div className={styles.sideContent}>
                        <span className={styles.smallCategory}>
                          {item.category}
                        </span>

                        <h4>{item.title}</h4>
                      </div>

                    </Link>

                  ))}

              </div>

            </div>
          )}

          <div className={styles.center}>
            <Link href="/news" className={styles.primaryBtn}>
              View All News
            </Link>
          </div>

        </div>
      </section>

      <WhyChoose />

    </main>
  );
}