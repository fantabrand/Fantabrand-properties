import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase/client";
import HeroSlider from "../components/HeroSlider";
import RotatingProperties from "../components/RotatingProperties";
import WhyChoose from "../components/WhyChoose";
import Testimonials from "../components/Testimonials";
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

  async function fetchProperties() {
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(12);

    if (!error) setProperties(data || []);
  }

  async function fetchNews() {
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5);

    if (!error) setNews(data || []);
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
    <>
      <Head>
        {/* ✅ FIXED SEO (ILORIN) */}
        <title>Affordable Land for Sale in Ilorin Kwara | Fantabrand Properties</title>

        <meta
          name="description"
          content="Buy affordable land in Ilorin Kwara State with flexible payment plans. Fantabrand Properties offers verified land for sale in Ilorin Nigeria."
        />

        <meta
          name="keywords"
          content="land for sale in ilorin, buy land ilorin kwara, affordable land ilorin nigeria, real estate ilorin"
        />

        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta property="og:title" content="Land for Sale in Ilorin Kwara | Fantabrand Properties" />
        <meta property="og:description" content="Secure verified land in Ilorin with flexible payment plans." />
        <meta property="og:url" content="https://www.fantabrandproperties.com.ng/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/hero1.jpg" />

        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <main className={styles.home}>

        {/* HERO SLIDER (UNCHANGED) */}
        <HeroSlider />

        {/* ✅ NEW ILORIN SEO SECTION */}
        <section className={styles.featureSection}>
          <div className={styles.container}>

            <h1 className={styles.sectionTitle}>
              Affordable Properties in Ilorin Kwara State
            </h1>

            <p className={styles.sectionSubtitle}>
              We have affordable and verified properties in Ilorin Kwara State with flexible payment plans. 
              Limited plots available — secure your investment today.
            </p>

            <div className={styles.center} style={{ marginTop: "20px" }}>
              <Link href="/land-in-ilorin" className={styles.primaryBtn}>
                Buy Land in Ilorin
              </Link>
            </div>

            <p style={{ marginTop: "20px", fontSize: "16px", color: "#888" }}>
              ⚡ Limited plots remaining — prices increasing soon
            </p>

          </div>
        </section>

        {/* PROPERTIES (UNCHANGED) */}
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
              <Link href="/properties" className={styles.primaryBtn}>
                View All Properties
              </Link>
            </div>

          </div>
        </section>

        {/* NEWS (UNCHANGED) */}
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

                  <h3>{news[heroIndex].title}</h3>

                  <p>
                    {news[heroIndex].excerpt ||
                      news[heroIndex].content?.substring(0, 120)}
                  </p>

                </div>

              </Link>
            )}

            <div className={styles.center}>
              <Link href="/news" className={styles.primaryBtn}>
                View All News
              </Link>
            </div>

          </div>
        </section>

        <WhyChoose />
        <Testimonials />
        <PremiumFaq />

      </main>
    </>
  );
}