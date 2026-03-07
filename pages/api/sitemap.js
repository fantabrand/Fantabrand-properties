import { supabase } from "../../lib/supabase/client";

export default async function handler(req, res) {

  const baseUrl = "https://fantabrandproperties.com.ng";

  // Fetch news articles
  const { data: news } = await supabase
    .from("news")
    .select("slug, created_at");

  // Fetch properties
  const { data: properties } = await supabase
    .from("properties")
    .select("slug, created_at");

  const staticPages = [
    "",
    "/properties",
    "/news",
    "/about",
    "/contact",
    "/services"
  ];

  const staticUrls = staticPages.map(page => `
    <url>
      <loc>${baseUrl}${page}</loc>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>
  `);

  const newsUrls = (news || []).map(article => `
    <url>
      <loc>${baseUrl}/news/${article.slug}</loc>
      <lastmod>${article.created_at}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.9</priority>
    </url>
  `);

  const propertyUrls = (properties || []).map(property => `
    <url>
      <loc>${baseUrl}/properties/${property.slug}</loc>
      <lastmod>${property.created_at}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.9</priority>
    </url>
  `);

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>

  <urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  ${staticUrls.join("")}
  ${newsUrls.join("")}
  ${propertyUrls.join("")}

  </urlset>`;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

}