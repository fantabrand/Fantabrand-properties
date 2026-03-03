import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase/client";
import styles from "../../styles/PropertyDetails.module.css";

export default function PropertyDetails() {
  const router = useRouter();
  const { slug } = router.query;

  const [property, setProperty] = useState(null);

  useEffect(() => {
    if (slug) {
      fetchProperty();
    }
  }, [slug]);

  async function fetchProperty() {
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .eq("slug", slug)
      .single();

    if (!error) {
      setProperty(data);
    }
  }

  if (!property) return <p style={{ padding: "100px" }}>Loading...</p>;

  return (
    <div className={styles.container}>

      <div className={styles.imageSection}>
        <img
          src={property.image_url}
          alt={property.title}
          className={styles.image}
        />
      </div>

      <div className={styles.contentSection}>
        <h1>{property.title}</h1>

        <p className={styles.location}>
          {property.location}
        </p>

        <p className={styles.price}>
          ₦{property.price?.toLocaleString()}
        </p>

        <div className={styles.description}>
          {property.description}
        </div>

      </div>

    </div>
  );
}