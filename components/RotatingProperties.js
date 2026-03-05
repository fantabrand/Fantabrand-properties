import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabase/client";
import styles from "../styles/RotatingProperties.module.css";

export default function RotatingProperties({ properties = [] }) {

  const [index, setIndex] = useState(0);
  const total = properties.length;
  const touchStart = useRef(null);

  useEffect(() => {
    if (!total) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % total);
    }, 5000);

    return () => clearInterval(interval);

  }, [total]);

  if (!properties || total === 0) return null;

  const handleTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {

    const touchEnd = e.changedTouches[0].clientX;

    if (touchStart.current - touchEnd > 50) {
      setIndex((prev) => (prev + 1) % total);
    }

    if (touchStart.current - touchEnd < -50) {
      setIndex((prev) => (prev - 1 + total) % total);
    }
  };

  return (
    <div
      className={styles.sliderWrapper}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >

      <div
        className={styles.sliderTrack}
        style={{
          transform: `translateX(-${index * 33.33}%)`
        }}
      >

        {properties.map((property) => {

          let imageUrl = null;

          if (property?.image_url) {

            if (property.image_url.startsWith("http")) {
              imageUrl = property.image_url;

            } else {

              const { data } = supabase.storage
                .from("property-images")
                .getPublicUrl(property.image_url);

              imageUrl = data?.publicUrl;
            }
          }

          return (

            <Link
              key={property.id}
              href={`/properties/${property.slug}`}
              className={styles.card}
            >

              <div className={styles.imageWrapper}>

                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={property.title}
                    className={styles.image}
                  />
                ) : (
                  <div className={styles.imagePlaceholder}>
                    Image unavailable
                  </div>
                )}

              </div>

              <div className={styles.info}>
                <h3>{property.title}</h3>
                <p>{property.location}</p>
              </div>

            </Link>
          );
        })}

      </div>

    </div>
  );
}