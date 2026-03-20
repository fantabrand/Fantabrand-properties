import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase/client";
import Link from "next/link";
import styles from "../../styles/NewsPage.module.css";
import Head from "next/head";

export default function NewsPage() {

  const [featured, setFeatured] = useState(null);
  const [articles, setArticles] = useState([]);
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    fetchNews();
  }, []);

  async function fetchNews() {

    const { data } = await supabase
      .from("news")
      .select("*")
      .order("created_at", { ascending: false });

    if (!data) return;

    if (data.length > 0) {
      setFeatured(data[0]);
      setArticles(data.slice(1));
      setTrending(data.slice(0, 5)); // top 5 trending
    }
  }

  return (
    <>
      {/* ✅ SEO IMPLEMENTATION */}
      <Head>
        <title>Real Estate News & Investment Insights Nigeria | Fantabrand Properties</title>

        <meta
          name="description"
          content="Latest real estate news, land investment tips and property insights in Lagos, Ibeju Lekki and Epe. Learn how to invest smartly in Nigerian real estate."
        />

        <meta property="og:title" content="Real Estate News & Investment Insights Nigeria" />
        <meta property="og:description" content="Stay updated with real estate trends, land investment tips and opportunities in Lagos." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.fantabrandproperties.com.ng/news" />
      </Head>

      <div className={styles.container}>

        <h1 className={styles.pageTitle}>
          Real Estate News
        </h1>

        {/* FEATURED ARTICLE */}

        {featured && (

          <Link
            href={`/news/${featured.slug}`}
            className={styles.featured}
          >

            {featured.image_url && (
              <img
                src={featured.image_url}
                alt={featured.title}
                className={styles.featuredImage}
              />
            )}

            <div className={styles.featuredContent}>

              <h2>
                {featured.title}
              </h2>

              <p>
                {featured.excerpt}
              </p>

            </div>

          </Link>

        )}

        {/* MAIN LAYOUT */}

        <div className={styles.mainLayout}>

          {/* ARTICLES GRID */}

          <div className={styles.grid}>

            {articles.map(article => (

              <Link
                key={article.id}
                href={`/news/${article.slug}`}
                className={styles.card}
              >

                {article.image_url && (

                  <img
                    src={article.image_url}
                    alt={article.title}
                    className={styles.cardImage}
                  />

                )}

                <div className={styles.cardContent}>

                  <h3>
                    {article.title}
                  </h3>

                  <p>
                    {article.excerpt}
                  </p>

                </div>

              </Link>

            ))}

          </div>

          {/* TRENDING SIDEBAR */}

          <div className={styles.sidebar}>

            <h3 className={styles.sidebarTitle}>
              Trending Articles
            </h3>

            {trending.map(article => (

              <Link
                key={article.id}
                href={`/news/${article.slug}`}
                className={styles.trendingItem}
              >

                {article.image_url && (
                  <img
                    src={article.image_url}
                    alt={article.title}
                    className={styles.trendingImage}
                  />
                )}

                <div>

                  <div className={styles.trendingTitle}>
                    {article.title}
                  </div>

                  <div className={styles.trendingDate}>
                    {new Date(article.created_at).toDateString()}
                  </div>

                </div>

              </Link>

            ))}

          </div>

        </div>

      </div>
    </>
  );
}