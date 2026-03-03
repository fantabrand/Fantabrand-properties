import { useEffect, useState, useRef } from "react";
import PropertyCard from "./PropertyCard";
import styles from "../styles/RotatingProperties.module.css";

export default function RotatingProperties({ properties }) {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const visibleCount = 3;

  if (!properties || properties.length === 0) return null;

  const total = properties.length;

  // Auto rotate
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % total);
    }, 4000);

    return () => clearInterval(interval);
  }, [total]);

  // Swipe handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;

    if (distance > 50) {
      setIndex((prev) => (prev + 1) % total);
    }

    if (distance < -50) {
      setIndex((prev) => (prev - 1 + total) % total);
    }
  };

  return (
    <div className={styles.wrapper}>
      
      <div
        className={styles.viewport}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={styles.track}
          style={{
            transform: `translateX(-${index * (100 / visibleCount)}%)`,
          }}
        >
          {properties.map((property) => (
            <div key={property.id} className={styles.slide}>
              <PropertyCard property={property} />
            </div>
          ))}
        </div>
      </div>

      {/* Dots only */}
      <div className={styles.dots}>
        {properties.map((_, i) => (
          <span
            key={i}
            className={i === index ? styles.activeDot : ""}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>

    </div>
  );
}