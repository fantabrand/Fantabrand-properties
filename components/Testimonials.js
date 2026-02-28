"use client";

import { useState, useEffect } from "react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Adeyemi Oladipo",
      role: "Property Investor",
      text: "Fantabrand helped me secure a prime plot in a fast-growing location. The process was smooth, transparent, and highly professional.",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Chioma Nwosu",
      role: "Business Owner",
      text: "I highly recommend Fantabrand Properties. Their team is trustworthy and the investment has already started appreciating.",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Ibrahim Bello",
      role: "Real Estate Investor",
      text: "Exceptional service and verified properties. Fantabrand is my go-to company for real estate investment.",
      image: "https://randomuser.me/api/portraits/men/62.jpg",
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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

  return (
    <section style={sectionStyle}>
      <div style={containerStyle}>
        <h2 style={headingStyle}>
          Real People, Real Testimonials
        </h2>

        <div style={carouselWrapper}>
          <button onClick={prevSlide} style={arrowLeft}>
            ‹
          </button>

          <div style={carouselTrack}>
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                style={{
                  ...cardStyle,
                  opacity: index === current ? 1 : 0,
                  transform:
                    index === current
                      ? "scale(1)"
                      : "scale(0.95)",
                }}
              >
                {/* Centered Image */}
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  style={imageStyle}
                />

                {/* Text */}
                <p style={textStyle}>
                  “{testimonial.text}”
                </p>

                {/* Name */}
                <h4 style={nameStyle}>
                  {testimonial.name}
                </h4>

                {/* Role */}
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

        {/* Dots */}
        <div style={dotsWrapper}>
          {testimonials.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrent(index)}
              style={{
                ...dotStyle,
                background:
                  index === current
                    ? "#6a0dad"
                    : "#cccccc",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}


/* STYLES */

const sectionStyle = {
  padding: "100px 5%",
  background: "#ffffff",
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
  color: "#6a0dad",
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
  color: "#222",   // DARKER TEXT
  marginBottom: "25px",
  lineHeight: "1.7",
};

const nameStyle = {
  fontWeight: "600",
  fontSize: "18px",
  color: "#111",
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
