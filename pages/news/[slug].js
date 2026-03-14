import Head from "next/head";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function NewsDetails({
  item,
  properties,
  relatedNews,
  readingTime
}) {

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
    `https://www.fantabrandproperties.com.ng/news/${item.slug}`;

  const pageImage =
    item.image_url
      ? item.image_url
      : `https://www.fantabrandproperties.com.ng/api/og/news?title=${encodeURIComponent(item.title)}`;

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
        url: "https://www.fantabrandproperties.com.ng/logo.png"
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

        {/* OPEN GRAPH */}

        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={pageImage} />
        <meta property="og:image:secure_url" content={pageImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={item.title} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Fantabrand Properties" />

        {/* TWITTER */}

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={pageImage} />

        {/* STRUCTURED DATA */}

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

        {/* SHARE */}

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

      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {

  const { slug } = params;

  const { data: item } = await supabase
    .from("news")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!item) {
    return { notFound: true };
  }

  const text = item.content.replace(/<[^>]+>/g, "");
  const words = text.trim().split(/\s+/).length;
  const readingTime = Math.ceil(words / 200);

  const { data: properties } = await supabase
    .from("properties")
    .select("*")
    .limit(3);

  const { data: relatedNews } = await supabase
    .from("news")
    .select("title, slug, image_url, created_at")
    .neq("slug", slug)
    .order("created_at", { ascending: false })
    .limit(3);

  return {
    props: {
      item,
      properties: properties || [],
      relatedNews: relatedNews || [],
      readingTime
    }
  };

}