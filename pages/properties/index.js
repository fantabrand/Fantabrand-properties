import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function PropertiesPage() {

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  async function fetchProperties() {

    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setProperties(data);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <div style={{ padding: "50px" }}>
        Loading properties...
      </div>
    );
  }

  return (

    <div style={{ padding: "50px" }}>

      <h1>Fantabrand Properties</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
          marginTop: "30px"
        }}
      >

        {properties.map((property) => (

          <div
            key={property.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              overflow: "hidden"
            }}
          >

            <img
              src={property.image_url}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover"
              }}
            />

            <div style={{ padding: "15px" }}>

              <h3>{property.title}</h3>

              <p><strong>Price:</strong> ₦{property.price}</p>

              <p><strong>Location:</strong> {property.location}</p>

              <p>{property.description}</p>

            </div>

          </div>

        ))}

      </div>

    </div>

  );
}