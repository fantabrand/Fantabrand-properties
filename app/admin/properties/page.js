"use client";

import { useEffect, useState } from "react";
import supabase from "@/lib/supabase";

export default function AdminPropertiesPage() {

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  async function fetchProperties() {

    setLoading(true);

    const { data, error } = await supabase
      .from("properties") // ✅ correct table name
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Fetch error:", error);
    }

    if (data) {
      setProperties(data);
    }

    setLoading(false);
  }

  async function deleteProperty(id) {

    if (!confirm("Delete this property?")) return;

    const { error } = await supabase
      .from("properties") // ✅ correct table name
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Delete error:", error);
    } else {
      fetchProperties();
    }

  }

  return (
    <div style={container}>

      <h1 style={title}>
        Manage Properties
      </h1>

      {loading ? (

        <p>Loading...</p>

      ) : (

        <div style={grid}>

          {properties.map((property) => {

            const image =
              property.image_url ||
              "/placeholder.jpg";

            const price =
              property.price
                ? Number(property.price).toLocaleString()
                : "0";

            return (

              <div key={property.id} style={card}>

                <img
                  src={image}
                  alt={property.title}
                  style={imageStyle}
                />

                <div style={content}>

                  <h3 style={name}>
                    {property.title}
                  </h3>

                  <p style={priceStyle}>
                    ₦{price}
                  </p>

                  <p style={location}>
                    📍 {property.location}
                  </p>

                  <div style={buttons}>

                    <a
                      href={`/admin/properties/edit/${property.id}`}
                      style={editBtn}
                    >
                      Edit
                    </a>

                    <button
                      onClick={() => deleteProperty(property.id)}
                      style={deleteBtn}
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </div>

            );

          })}

        </div>

      )}

    </div>
  );

}
/* STYLES */

const container = {
  padding: "30px",
};

const title = {
  fontSize: "28px",
  fontWeight: "bold",
  marginBottom: "20px",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
  gap: "25px",
};

const card = {
  background: "white",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
};

const imageStyle = {
  width: "100%",
  height: "220px",
  objectFit: "cover",
};

const content = {
  padding: "15px",
};

const name = {
  fontSize: "18px",
  fontWeight: "bold",
};

const priceStyle = {
  color: "#7c3aed",
  fontWeight: "bold",
  marginTop: "5px",
};

const location = {
  color: "#666",
  marginTop: "5px",
};

const buttons = {
  marginTop: "15px",
  display: "flex",
  gap: "10px",
};

const editBtn = {
  background: "#2563eb",
  color: "white",
  padding: "6px 12px",
  borderRadius: "6px",
  textDecoration: "none",
};

const deleteBtn = {
  background: "#dc2626",
  color: "white",
  padding: "6px 12px",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer",
};
