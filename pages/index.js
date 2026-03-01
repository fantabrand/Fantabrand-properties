import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase/client";
import HeroSlider from "../components/HeroSlider";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Home() {

  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchProperties();
  }, []);

  async function fetchProperties() {
    const { data } = await supabase
      .from("properties")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(6);

    setProperties(data || []);
  }

  return (
    <main className={styles.home}>

      {/* HERO */}
      <HeroSlider />

      {/* FEATURED PROPERTIES */}
      <section className={styles.featureSection}>

        <div className={styles.container}>

          <h2 className={styles.sectionTitle}>
            Featured Properties
          </h2>

          <p className={styles.sectionSubtitle}>
            Handpicked premium real estate opportunities
          </p>

          <div className={styles.grid}>

            {properties.map((property) => (
              <div key={property.id} className={styles.card}>

                <img
                  src={property.image_url}
                  alt={property.title}
                  className={styles.image}
                />

                <div className={styles.cardContent}>
                  <h3>{property.title}</h3>
                  <p>{property.location}</p>
                  <strong>₦{property.price}</strong>
                </div>

              </div>
            ))}

          </div>

          <div className={styles.center}>
            <Link href="/properties" className={styles.primaryBtn}>
              View All Properties
            </Link>
          </div>

        </div>

      </section>

    </main>
  );
}