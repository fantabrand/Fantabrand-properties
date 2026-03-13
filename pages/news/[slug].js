import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";

export default function NewsDetails() {

  const router = useRouter();
  const { slug } = router.query;

  const [item, setItem] = useState(null);
  const [properties, setProperties] = useState([]);
  const [relatedNews, setRelatedNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [readingTime, setReadingTime] = useState(0);

  useEffect(() => {

    if (slug) {
      fetchNews();
      fetchFeaturedProperties();
      fetchRelatedNews();
    }

  }, [slug]);

  async function fetchNews() {

    const { data, error } = await supabase
      .from("news")
      .select("*")
      .eq("slug", slug)
      .single();

    if (!error && data) {

      setItem(data);

      // Calculate reading time
      const text = data.content.replace(/<[^>]+>/g, "");
      const words = text.trim().split(/\s+/).length;
      const minutes = Math.ceil(words / 200);
      setReadingTime(minutes);

    }

    setLoading(false);
  }

  async function fetchFeaturedProperties(){

    const { data } = await supabase
      .from("properties")
      .select("*")
      .limit(3);

    setProperties(data || []);

  }

  async function fetchRelatedNews(){

    if (!slug) return;

    const { data } = await supabase
      .from("news")
      .select("title, slug, image_url, created_at")
      .neq("slug", slug)
      .order("created_at", { ascending: false })
      .limit(3);

    setRelatedNews(data || []);

  }

  if (loading) {
    return <div style={{ padding: "40px" }}>Loading...</div>;
  }

  if (!item) {
    return <div style={{ padding: "40px" }}>Article not found</div>;
  }

  const pageTitle =
    item.meta_title || `${item.title} | Fantabrand Properties`;

  const pageDescription =
    item.meta_description ||
    item.excerpt ||
    "Real estate news from Fantabrand Properties.";

  const pageUrl =
    `https://fantabrandproperties.com.ng/news/${item.slug}`;

  const pageImage =
    `https://fantabrandproperties.com.ng/api/og/news?title=${encodeURIComponent(item.title)}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: item.title,
    description: pageDescription,
    image: pageImage,
    author: {
      "@type": "Organization",
      name: "Fantabrand Properties"
    },
    publisher: {
      "@type": "Organization",
      name: "Fantabrand Properties",
      logo: {
        "@type": "ImageObject",
        url: "https://fantabrandproperties.com.ng/logo.png"
      }
    },
    datePublished: item.created_at,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl
    }
  };

  return (
    <>
      <Head>

        <title>{pageTitle}</title>

        <meta name="description" content={pageDescription} />

        <link rel="canonical" href={pageUrl} />

        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={pageImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Fantabrand Properties" />
        <meta property="article:published_time" content={item.created_at} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={pageImage} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleSchema)
          }}
        />

      </Head>

      <div
        style={{
          maxWidth: "900px",
          margin: "auto",
          padding: "40px 20px"
        }}
      >

        {item.image_url && (

          <img
            src={item.image_url}
            alt={item.title}
            loading="lazy"
            style={{
              width: "100%",
              borderRadius: "12px",
              marginBottom: "20px"
            }}
          />

        )}

        <div style={{ color: "#666", marginBottom: "10px" }}>
          {new Date(item.created_at).toDateString()} • {readingTime} min read
        </div>

        <h1
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            marginBottom: "20px"
          }}
        >
          {item.title}
        </h1>

        <div
          style={{
            lineHeight: "1.8",
            fontSize: "16px"
          }}
          dangerouslySetInnerHTML={{ __html: item.content }}
        />

        {/* SOCIAL SHARE BUTTONS */}

        <div style={{ marginTop: "40px" }}>

          <h3 style={{ marginBottom: "15px" }}>
            Share this article
          </h3>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>

            <a
              href={`https://wa.me/?text=${encodeURIComponent(pageTitle + " " + pageUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{background:"#25D366",color:"#fff",padding:"10px 16px",borderRadius:"6px",textDecoration:"none"}}
            >
              WhatsApp
            </a>

            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{background:"#1877F2",color:"#fff",padding:"10px 16px",borderRadius:"6px",textDecoration:"none"}}
            >
              Facebook
            </a>

            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{background:"#0077B5",color:"#fff",padding:"10px 16px",borderRadius:"6px",textDecoration:"none"}}
            >
              LinkedIn
            </a>

            <a
              href={`https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{background:"#000",color:"#fff",padding:"10px 16px",borderRadius:"6px",textDecoration:"none"}}
            >
              Twitter
            </a>

          </div>

        </div>

        {relatedNews.length > 0 && (
        <>
        <hr style={{ margin: "50px 0" }} />

        <h2 style={{ marginBottom: "20px" }}>
        Related News
        </h2>

        <div
        style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
        gap: "20px"
        }}
        >

        {relatedNews.map(news => (

        <a
        key={news.slug}
        href={`/news/${news.slug}`}
        style={{
        border: "1px solid #eee",
        borderRadius: "12px",
        overflow: "hidden",
        background: "#fff",
        textDecoration: "none",
        color: "#000"
        }}
        >

        {news.image_url && (

        <img
        src={news.image_url}
        alt={news.title}
        loading="lazy"
        style={{
        width: "100%",
        height: "160px",
        objectFit: "cover"
        }}
        />

        )}

        <div style={{ padding: "15px" }}>

        <div style={{ fontSize: "14px", color: "#777", marginBottom: "6px" }}>
        {new Date(news.created_at).toDateString()}
        </div>

        <h3 style={{ fontSize: "18px" }}>
        {news.title}
        </h3>

        </div>

        </a>

        ))}

        </div>
        </>
        )}

        {properties.length > 0 && (
        <>
        <hr style={{ margin: "50px 0" }} />

        <h2 style={{ marginBottom: "20px" }}>
        Featured Properties
        </h2>

        <div
        style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
        gap: "20px"
        }}
        >

        {properties.map(property => (

        <div
        key={property.id}
        style={{
        border: "1px solid #eee",
        borderRadius: "12px",
        overflow: "hidden",
        background: "#fff"
        }}
        >

        {property.image && (

        <img
        src={property.image}
        alt={property.title}
        loading="lazy"
        style={{
        width: "100%",
        height: "180px",
        objectFit: "cover"
        }}
        />

        )}

        <div style={{ padding: "15px" }}>

        <h3 style={{ marginBottom: "5px" }}>
        {property.title}
        </h3>

        <div style={{ color: "#777", fontSize: "14px" }}>
        {property.location}
        </div>

        <div
        style={{
        marginTop: "8px",
        fontWeight: "bold",
        color: "#7c3aed"
        }}
        >
        ₦{property.price}
        </div>

        <a
        href={`/properties/${property.slug}`}
        style={{
        display: "inline-block",
        marginTop: "12px",
        color: "#7c3aed",
        fontWeight: "bold",
        textDecoration: "none"
        }}
        >
        View Property →
        </a>

        </div>

        </div>

        ))}

        </div>
        </>

        )}

      </div>
    </>
  );
}