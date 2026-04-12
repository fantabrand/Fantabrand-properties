import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase/client";
import PropertyCard from "../../components/PropertyCard";
import Head from "next/head";

export default function PropertiesPage() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchProperties();
  }, []);

  async function fetchProperties() {
    const { data } = await supabase
      .from("properties")
      .select("*")
      .order("created_at", { ascending: false });

    setProperties(data || []);
  }

  return (
    <>
      {/* ✅ SEO OPTIMIZATION */}
      <Head>
        <title>
          Land & Properties for Sale in Ilorin | Fantabrand Properties
        </title>

        <meta
          name="description"
          content="Explore verified land and properties for sale in Ilorin Kwara State. Affordable plots, flexible payment plans, and instant allocation available."
        />

        <meta
          property="og:title"
          content="Land for Sale in Ilorin | Fantabrand Properties"
        />

        <meta
          property="og:description"
          content="Browse available land and properties in Ilorin with verified titles."
        />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div style={{ padding: "60px 40px" }}>
        <h1>The Future of Luxury Living in Ilorin</h1>

        <p style={{ marginTop: "10px", color: "#666" }}>
          Discover verified and affordable land for sale in Ilorin Kwara State.
          Secure your investment with flexible payment options and instant allocation.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "30px",
            marginTop: "40px",
          }}
        >
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
            />
          ))}
        </div>
      </div>
    </>
  );
}