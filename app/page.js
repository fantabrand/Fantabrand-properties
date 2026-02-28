"use client";

import HeroSlider from "@/components/HeroSlider";
import StatsCounter from "@/components/StatsCounter";
import PropertyCard from "@/components/PropertyCard";
import WhyChoose from "@/components/WhyChoose";
import Testimonials from "@/components/Testimonials";

import { useEffect, useState } from "react";
import supabase from "@/lib/supabase";

export default function Home() {

  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchProperties();
  }, []);

  async function fetchProperties() {

    try {

      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Supabase fetch error:", error.message);
        return;
      }

      if (data) {

        // ✅ SAFE NORMALIZATION using correct column name
        const safeProperties = data.map((property) => ({
          ...property,

          image_url:
            property.image_url &&
            property.image_url.startsWith("http")
              ? property.image_url
              : "/placeholder.jpg",

          price:
            property.price
              ? property.price
              : "Contact for price"
        }));

        setProperties(safeProperties);

      }

    } catch (err) {

      console.error("Unexpected error:", err);

    }

  }


  function scrollLeft() {

    const el = document.getElementById("propertyCarousel");

    if (el) {
      el.scrollBy({ left: -400, behavior: "smooth" });
    }

  }


  function scrollRight() {

    const el = document.getElementById("propertyCarousel");

    if (el) {
      el.scrollBy({ left: 400, behavior: "smooth" });
    }

  }


  return (
    <div style={{ paddingTop: "80px" }}>

      {/* HERO */}
      <HeroSlider />

      {/* STATS */}
      <StatsCounter />


      {/* FEATURED PROPERTIES */}
      <section style={luxurySection}>

        <div style={headerWrapper}>

          <div style={accentLine}></div>

          <h2 style={luxuryHeading}>
            Featured Properties
          </h2>

          <p style={luxurySubheading}>
            Explore our premium land and property investments in prime locations.
          </p>

        </div>


        <div style={carouselWrapper}>

          <button style={navLeft} onClick={scrollLeft}>
            ‹
          </button>


          <div id="propertyCarousel" style={carouselTrack}>

            {properties.length === 0 ? (

              <p style={{ color: "#94a3b8" }}>
                Loading properties...
              </p>

            ) : (

              properties.map((property) => (

                <div key={property.id} style={carouselItem}>

                  <PropertyCard property={property} />

                </div>

              ))

            )}

          </div>


          <button style={navRight} onClick={scrollRight}>
            ›
          </button>

        </div>

      </section>


      {/* WHY CHOOSE */}
      <WhyChoose />

      {/* TESTIMONIALS */}
      <Testimonials />


    </div>
  );
}


/* STYLES (UNCHANGED) */

const luxurySection = {
  padding: "100px 5%",
  background: "#ffffff",
};

const headerWrapper = {
  textAlign: "center",
  marginBottom: "50px",
};

const accentLine = {
  width: "60px",
  height: "4px",
  background: "linear-gradient(135deg,#7c3aed,#a855f7)",
  margin: "0 auto 20px auto",
  borderRadius: "2px",
};

const luxuryHeading = {
  fontSize: "38px",
  fontWeight: "800",
  color: "#6a0dad",
};

const luxurySubheading = {
  fontSize: "25px",
  fontWeight: "400",
  color: "#000000",
  marginTop: "5px",
};

const carouselWrapper = {
  position: "relative",
  maxWidth: "1400px",
  margin: "auto",
};

const carouselTrack = {
  display: "flex",
  gap: "25px",
  overflowX: "auto",
  scrollBehavior: "smooth",
  padding: "10px",
};

const carouselItem = {
  minWidth: "340px",
  flexShrink: 0,
};

const navLeft = {
  position: "absolute",
  left: "-20px",
  top: "50%",
  transform: "translateY(-50%)",
  background: "rgba(255,255,255,0.15)",
  backdropFilter: "blur(10px)",
  border: "none",
  color: "white",
  fontSize: "28px",
  padding: "10px 16px",
  borderRadius: "10px",
  cursor: "pointer",
};

const navRight = {
  position: "absolute",
  right: "-20px",
  top: "50%",
  transform: "translateY(-50%)",
  background: "rgba(255,255,255,0.15)",
  backdropFilter: "blur(10px)",
  border: "none",
  color: "white",
  fontSize: "28px",
  padding: "10px 16px",
  borderRadius: "10px",
  cursor: "pointer",
};
