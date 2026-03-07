import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";

export default function NewsDetails() {

  const router = useRouter();
  const { slug } = router.query;

  const [item, setItem] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (slug) {
      fetchNews();
      fetchFeaturedProperties();
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

  const pageUrl = `https://fantabrandproperties.com.ng/news/${item.slug}`;

  const pageImage = item.image_url || "/logo.png";

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

        {/* Open Graph */}

        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={pageImage} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="article" />

        {/* Twitter */}

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={pageImage} />

        {/* Google Structured Data */}

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
            style={{
              width: "100%",
              borderRadius: "12px",
              marginBottom: "20px"
            }}
          />

        )}

        <div style={{ color: "#666", marginBottom: "10px" }}>
          {new Date(item.created_at).toDateString()}
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

        {/* Featured Properties */}

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
                    fontWeight: "bold"
                  }}
                >
                  View Property →
                </a>

              </div>

            </div>

          ))}

        </div>

      </div>
    </>
  );
}