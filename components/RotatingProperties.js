import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase/client";
import styles from "../styles/RotatingProperties.module.css";

export default function RotatingProperties({ properties = [] }) {
  const [index, setIndex] = useState(0);

  const total = properties.length;

  useEffect(() => {
    if (total === 0) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % total);
    }, 4000);

    return () => clearInterval(interval);
  }, [total]);

  if (!properties || total === 0) {
    return null;
  }

  const property = properties[index];

  let imageUrl = null;

  if (property.image) {
    if (property.image.startsWith("http")) {
      imageUrl = property.image;
    } else {
      const { data } = supabase.storage
        .from("property-images")
        .getPublicUrl(property.image);

      imageUrl = data?.publicUrl;
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
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

        <h3>{property.title}</h3>
        <p>{property.location}</p>
      </div>
    </div>
  );
}