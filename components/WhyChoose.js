"use client";

import { useEffect, useRef, useState } from "react";

export default function WhyChoose() {
  const sectionRef = useRef(null);
  const [visibleItems, setVisibleItems] = useState([]);

  const items = [
    {
      title: "Verified Properties",
      description:
        "Every property undergoes strict legal verification, ensuring secure and risk-free ownership.",
      icon: "✔",
    },
    {
      title: "Prime Locations",
      description:
        "Strategically located lands in high-growth areas with exceptional appreciation potential.",
      icon: "📍",
    },
    {
      title: "Trusted Reputation",
      description:
        "Fantabrand Properties is trusted for delivering consistent value and client satisfaction.",
      icon: "🤝",
    },
    {
      title: "Expert Guidance",
      description:
        "Our experienced team supports you from selection to ownership with professional care.",
      icon: "🎯",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateItems();
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  function animateItems() {
    items.forEach((_, index) => {
      setTimeout(() => {
        setVisibleItems((prev) => [...prev, index]);
      }, index * 180);
    });
  }

  return (
    <section ref={sectionRef} style={sectionStyle}>
      <div style={containerStyle}>
        
        <h2 style={headingStyle}>
          Why Choose Fantabrand
        </h2>

        <p style={subheadingStyle}>
          Experience excellence, trust, and premium real estate investment opportunities.
        </p>

        <div style={gridStyle}>
          {items.map((item, index) => {
            const visible = visibleItems.includes(index);

            return (
              <div
                key={index}
                style={{
                  ...cardStyle,
                  opacity: visible ? 1 : 0,
                  transform: visible
                    ? "translate3d(0,0,0)"
                    : "translate3d(0,40px,0)",
                }}
              >
                <div style={iconStyle}>
                  {item.icon}
                </div>

                <h3 style={titleStyle}>
                  {item.title}
                </h3>

                <p style={descStyle}>
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}


/* STYLES */

const sectionStyle = {
  padding: "110px 5%",
  background: "linear-gradient(to bottom, #ffffff, #f8fafc)",
};

const containerStyle = {
  maxWidth: "1200px",
  margin: "auto",
};

const headingStyle = {
  fontSize: "38px",
  fontWeight: "800",
  textAlign: "center",
  marginBottom: "12px",
  color: "#6a0dad",
};

const subheadingStyle = {
  textAlign: "center",
  color: "#000000",
  marginBottom: "65px",
  fontSize: "25px",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "30px",
};

const cardStyle = {
  background: "white",
  padding: "35px 25px",
  borderRadius: "18px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  textAlign: "center",
  cursor: "pointer",
  transitionProperty: "transform, opacity, box-shadow",
  transitionDuration: "0.6s",
  transitionTimingFunction: "cubic-bezier(.4,0,.2,1)",
  willChange: "transform, opacity",
};

const iconStyle = {
  width: "75px",
  height: "75px",
  margin: "auto",
  marginBottom: "18px",
  borderRadius: "50%",
  background: "linear-gradient(135deg, #000000, #000000)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "30px",
  color: "white",
  boxShadow: "0 10px 25px rgba(174, 174, 174, 0.35)",
};

const titleStyle = {
  fontSize: "20px",
  fontWeight: "700",
  color: "#111",
  marginBottom: "12px",
};

const descStyle = {
  color: "#444",
  lineHeight: "1.7",
  fontSize: "15.5px",
};
