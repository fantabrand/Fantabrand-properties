import { useEffect, useRef, useState } from "react";
import PropertyCard from "./PropertyCard";

export default function PropertyGrid({ properties }) {

  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);

  const visibleCount = 3;

  // Duplicate properties for seamless loop
  const extendedProperties = [...properties, ...properties];

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      setIndex(prev => prev + 1);
    }, 5000);
  };

  const stopAutoSlide = () => {
    clearInterval(intervalRef.current);
  };

  const handleTransitionEnd = () => {
    if (index >= properties.length) {
      setIndex(0);
    }
  };

  return (
    <section className="property-section">

      <div className="container">

        <h2 className="heading">
          Featured Properties
        </h2>

        <p className="subheading">
          Handpicked premium real estate opportunities
        </p>

        <div
          className="carousel-wrapper"
          onMouseEnter={stopAutoSlide}
          onMouseLeave={startAutoSlide}
        >
          <div
            className="carousel-track"
            style={{
              transform: `translateX(-${(100 / visibleCount) * index}%)`
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {extendedProperties.map((property, i) => (
              <div className="carousel-item" key={i}>
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        </div>

      </div>

      <style jsx>{`

        .property-section {
          background: #ffffff;
          padding: 80px 20px;
          overflow: hidden;
        }

        .container {
          max-width: 1200px;
          margin: auto;
          text-align: center;
        }

        .heading {
          font-size: 36px;
          font-weight: 700;
          color: #111;
          margin-bottom: 10px;
        }

        .subheading {
          font-size: 16px;
          color: #666;
          margin-bottom: 50px;
        }

        .carousel-wrapper {
          overflow: hidden;
          position: relative;
        }

        .carousel-track {
          display: flex;
          transition: transform 0.8s ease;
          width: max-content;
        }

        .carousel-item {
          flex: 0 0 calc(100% / 3);
          padding: 0 12px;
        }

        @media (max-width: 1024px) {
          .carousel-item {
            flex: 0 0 50%;
          }
        }

        @media (max-width: 768px) {
          .carousel-item {
            flex: 0 0 100%;
          }

          .heading {
            font-size: 28px;
          }

          .property-section {
            padding: 60px 16px;
          }
        }

      `}</style>

    </section>
  );
}