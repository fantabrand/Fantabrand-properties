import { supabase } from "@/lib/supabase/client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NewsPage() {

  const [news, setNews] = useState([]);

  useEffect(() => {
    fetchNews();
  }, []);

  async function fetchNews() {

    const { data, error } = await supabase
      .from("news")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setNews(data || []);
    }
  }

  return (
    <div style={styles.page}>

      <h1 style={styles.heading}>
        Fantabrand News & Updates
      </h1>

      <div style={styles.grid}>

        {news.map(item => (

          <Link
            key={item.id}
            href={`/news/${item.id}`}
            style={styles.card}
            className="news-card"
          >

            {/* IMAGE */}
            {item.image && (
              <div style={styles.imageWrapper}>
                <img
                  src={item.image}
                  style={styles.image}
                  className="news-image"
                />
              </div>
            )}

            {/* CONTENT */}
            <div style={styles.content}>

              <div style={styles.date}>
                {new Date(item.created_at).toDateString()}
              </div>

              <h2 style={styles.title}>
                {item.title}
              </h2>

              <p style={styles.text}>
                {item.content.substring(0, 100)}...
              </p>

            </div>

          </Link>

        ))}

      </div>

      {/* HOVER ANIMATION */}
      <style jsx>{`
        .news-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.12);
        }

        .news-card:hover .news-image {
          transform: scale(1.08);
        }
      `}</style>

    </div>
  );
}


/* STYLES */

const styles = {

  page: {
    padding: "60px 20px",
    maxWidth: "1200px",
    margin: "auto"
  },

  heading: {
    fontSize: "36px",
    fontWeight: "bold",
    marginBottom: "40px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "30px"
  },

  card: {
    borderRadius: "16px",
    overflow: "hidden",
    textDecoration: "none",
    color: "inherit",
    background: "#fff",
    boxShadow: "0 8px 25px rgba(0,0,0,0.06)",
    transition: "all 0.35s ease",
    display: "block"
  },

  imageWrapper: {
    width: "100%",
    height: "200px",   // PERFECT SIZE
    overflow: "hidden"
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.6s ease"
  },

  content: {
    padding: "20px"
  },

  date: {
    fontSize: "12px",
    color: "#888",
    marginBottom: "10px"
  },

  title: {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "10px"
  },

  text: {
    fontSize: "14px",
    color: "#555",
    lineHeight: "1.6"
  }

};