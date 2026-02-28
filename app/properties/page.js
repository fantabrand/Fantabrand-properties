"use client";

import { useEffect, useState } from "react";
import supabase from "@/lib/supabase";
import PropertyCard from "@/components/PropertyCard";

export default function PropertiesPage() {

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {

    fetchProperties();

    // trigger entrance animation
    setTimeout(() => {
      setVisible(true);
    }, 100);

  }, []);


  async function fetchProperties() {

    try {

      setLoading(true);

      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Fetch error:", error);
        return;
      }

      setProperties(data || []);

    } catch (err) {

      console.error("Unexpected error:", err);

    } finally {

      setLoading(false);

    }

  }


  return (

    <div style={container}>


      {/* Header Section */}
      <div style={headerBlock}>


        {/* Animated Luxury Title */}
        
        <h1 style={{
  ...title,
  lineHeight: "1.15",
  marginBottom: "15px"
}}>

  {/* First line */}
  <span style={{
    display: "block",
    marginBottom: "2px"
  }}>

    <span style={wordStyle(0, visible)}>
      Explore
    </span>

    <span style={wordStyle(1, visible)}>
      &nbsp;our
    </span>

  </span>


  {/* Second line — luxury emphasis but tighter spacing */}
  <span style={{
    display: "block",
    fontSize: "42px",
    fontWeight: "800",
    marginTop: "0px",
    lineHeight: "1.05"
  }}>

    <span style={wordStyle(2, visible)}>
      properties
    </span>

  </span>

</h1>


        {/* Subtitle */}
        <p style={{
          ...subtitle,
          opacity: visible ? 1 : 0,
          transform: visible
            ? "translateY(0px)"
            : "translateY(20px)",
          transition: "all 0.8s ease 0.4s"
        }}>
          Discover premium investment opportunities and luxury living
          spaces carefully curated for exceptional value.
        </p>

      </div>



      {loading ? (

        <p style={statusText}>
          Loading properties...
        </p>

      ) : properties.length === 0 ? (

        <p style={statusText}>
          No properties found.
        </p>

      ) : (

        <div style={grid}>

          {properties.map((property, index) => (

            <div
              key={property.id}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible
                  ? "translateY(0px)"
                  : "translateY(30px)",
                transition: `
                  opacity 0.6s ease ${index * 0.12}s,
                  transform 0.6s ease ${index * 0.12}s
                `,
              }}
            >

              <PropertyCard property={property} />

            </div>

          ))}

        </div>

      )}

    </div>

  );

}



/* STYLES */

const container = {

  padding: "60px 40px",

  background:
    "linear-gradient(to bottom, #ffffff 100%, #f8f8f8 100%, #ffffff 100%)",

  minHeight: "100vh",

};


const headerBlock = {

  marginBottom: "40px",

};


const title = {

  fontSize: "38px",

  fontWeight: "800",

  color: "#6a0dad",

  marginBottom: "20px",

};


const subtitle = {

  fontSize: "16px",

  color: "#666",

  maxWidth: "520px",

  lineHeight: "1.6",

};


const statusText = {

  fontSize: "16px",

  color: "#666",

};


const grid = {

  display: "grid",

  gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",

  gap: "28px",

};



/* Word Animation Function */

function wordStyle(index, visible) {

  return {

    display: "inline-block",

    opacity: visible ? 1 : 0,

    transform: visible
      ? "translateY(0px)"
      : "translateY(12px)",   // reduced from 30px → prevents blank header

    letterSpacing: visible ? "-0.3px" : "4px",

    transition: `
      opacity 0.7s ease ${index * 0.15}s,
      transform 0.7s ease ${index * 0.15}s,
      letter-spacing 0.9s ease ${index * 0.15}s
    `,

  };

}

