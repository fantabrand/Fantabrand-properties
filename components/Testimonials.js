"use client";

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase/client";
import Head from "next/head";

export default function Testimonials() {

  const [testimonials, setTestimonials] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  async function fetchTestimonials() {

    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setTestimonials(data);
    }

  }

  useEffect(() => {

    if (testimonials.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);

  }, [testimonials]);

  function nextSlide() {
    setCurrent(
      current === testimonials.length - 1 ? 0 : current + 1
    );
  }

  function prevSlide() {
    setCurrent(
      current === 0 ? testimonials.length - 1 : current - 1
    );
  }

  if (testimonials.length === 0) return null;

  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Fantabrand Properties",
    "url": "https://fantabrandproperties.com.ng",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": testimonials.length
    },
    "review": testimonials.map((t) => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": t.name
      },
      "reviewBody": t.text,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      }
    }))
  };

  return (

    <>

      {/* GOOGLE REVIEW SCHEMA */}

      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(reviewSchema)
          }}
        />
      </Head>

      <section style={sectionStyle}>

        <div style={containerStyle}>

          <h2 style={headingStyle}>
            Real Clients, Real Testimonials
          </h2>

          <div style={carouselWrapper}>

            <button onClick={prevSlide} style={arrowLeft}>
              ‹
            </button>

            <div style={carouselTrack}>

              {testimonials.map((testimonial, index) => (

                <div
                  key={testimonial.id}
                  style={{
                    ...cardStyle,
                    opacity: index === current ? 1 : 0,
                    transform:
                      index === current
                        ? "scale(1)"
                        : "scale(0.95)",
                  }}
                >

                  {testimonial.image && (

                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      style={imageStyle}
                    />

                  )}

                  <p style={textStyle}>
                    “{testimonial.text}”
                  </p>

                  <h4 style={nameStyle}>
                    {testimonial.name}
                  </h4>

                  <span style={roleStyle}>
                    {testimonial.role}
                  </span>

                </div>

              ))}

            </div>

            <button onClick={nextSlide} style={arrowRight}>
              ›
            </button>

          </div>

          <div style={dotsWrapper}>

            {testimonials.map((_, index) => (

              <div
                key={index}
                onClick={() => setCurrent(index)}
                style={{
                  ...dotStyle,
                  background:
                    index === current
                      ? "#ffffff"
                      : "#cccccc",
                }}
              />

            ))}

          </div>

        </div>

      </section>

    </>

  );

}


/* STYLES */

const sectionStyle = {
  padding: "100px 5%",
  background: "linear-gradient(to right, #8011d0, #460773)",
};

const containerStyle = {
  maxWidth: "900px",
  margin: "auto",
  textAlign: "center",
};

const headingStyle = {
  fontSize: "36px",
  fontWeight: "800",
  marginBottom: "50px",
  color: "#ffffff",
};

const carouselWrapper = {
  position: "relative",
};

const carouselTrack = {
  position: "relative",
  height: "340px",
};

const cardStyle = {
  position: "absolute",
  width: "100%",
  padding: "50px 40px",
  borderRadius: "20px",
  background: "white",
  boxShadow:
    "0 20px 50px rgba(124,58,237,0.15)",
  transition: "all 0.5s ease",
  textAlign: "center",
};

const imageStyle = {
  width: "90px",
  height: "90px",
  borderRadius: "50%",
  margin: "0 auto 20px auto",
  display: "block",
  objectFit: "cover",
  border: "4px solid #f3f4f6",
};

const textStyle = {
  fontSize: "18px",
  color: "#050505",
  marginBottom: "25px",
  lineHeight: "1.7",
};

const nameStyle = {
  fontWeight: "600",
  fontSize: "18px",
  color: "#020202",
  marginBottom: "5px",
};

const roleStyle = {
  color: "#7c3aed",
  fontWeight: "500",
};

const arrowLeft = {
  position: "absolute",
  left: "-60px",
  top: "50%",
  transform: "translateY(-50%)",
  fontSize: "32px",
  cursor: "pointer",
  background: "none",
  border: "none",
};

const arrowRight = {
  position: "absolute",
  right: "-60px",
  top: "50%",
  transform: "translateY(-50%)",
  fontSize: "32px",
  cursor: "pointer",
  background: "none",
  border: "none",
};

const dotsWrapper = {
  display: "flex",
  justifyContent: "center",
  marginTop: "30px",
  gap: "10px",
};

const dotStyle = {
  width: "12px",
  height: "12px",
  borderRadius: "50%",
  cursor: "pointer",
};