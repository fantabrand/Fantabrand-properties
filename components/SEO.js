import Head from "next/head";

export default function SEO({
  title,
  description,
  keywords,
  url,
}) {
  const siteName = "Fantabrand Properties";

  return (
    <Head>
      <title>{title ? `${title} | ${siteName}` : siteName}</title>

      <meta
        name="description"
        content={
          description ||
          "Buy affordable land in Lagos Nigeria with flexible payment plans."
        }
      />

      {keywords && <meta name="keywords" content={keywords} />}

      {/* Open Graph (for WhatsApp, Facebook, LinkedIn) */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
}