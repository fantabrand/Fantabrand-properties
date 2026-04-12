/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ["ixvywzrzfkufeoszzamm.supabase.co"],
  },

  // ✅ ADD THIS (MULTI-LANGUAGE SUPPORT)
  i18n: {
    locales: ["en", "fr"],
    defaultLocale: "en",
  },

  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap",
      },
    ];
  },
};

export default nextConfig;