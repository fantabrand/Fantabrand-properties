import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase/client";
import PropertyCard from "../../components/PropertyCard";

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
    <div style={{ padding: "60px 40px" }}>
      <h1>All Properties</h1>

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
  );
}