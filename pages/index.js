import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase/client";
import HeroSlider from "../components/HeroSlider";
import WhyChoose from "../components/WhyChoose";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Home() {

  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchProperties();
  }, []);

  async function fetchProperties() {

    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(6);

    if (!error) {
      setProperties(data || []);
    }
  }

  return (
    <main className={styles.home}>

      {/* HERO SECTION */}
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

              <Link
                key={property.id}
                href={`/properties/${property.id}`}
                className={styles.card}
              >

                <img
                  src={property.image_url}
                  alt={property.title}
                  className={styles.image}
                />

                <div className={styles.cardContent}>

                  <h3 className={styles.cardTitle}>
                    {property.title}
                  </h3>

                  <p className={styles.cardLocation}>
                    {property.location}
                  </p>

                  <p className={styles.cardPrice}>
                    ₦{property.price?.toLocaleString()}
                  </p>

                </div>

              </Link>

            ))}

          </div>

          {/* VIEW ALL BUTTON */}
          <div className={styles.center}>

            <Link
              href="/properties"
              className={styles.primaryBtn}
            >
              View All Properties
            </Link>

          </div>

        </div>

      </section>

      {/* WHY CHOOSE US */}
      <WhyChoose />

    </main>
  );
}