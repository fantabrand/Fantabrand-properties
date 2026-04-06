import Link from "next/link";
import styles from "../styles/PropertyCard.module.css";

export default function PropertyCard({ property }) {
  if (!property?.slug) return null;

  const whatsappMessage = encodeURIComponent(
    `Hello Fantabrand Properties, I am interested in ${property.title}.`
  );

  return (
    <div className={styles.cardWrapper}>
      {/* STATUS BADGE */}
      <div className={styles.badge}>
        {property.status || "For Sale"}
      </div>

      <Link href={`/properties/${property.slug}`}>
        <div className={styles.card}>
          <div className={styles.imageWrapper}>
            <img
              src={property.image_url || "/hero1.jpg"}
              alt={property.title}
              className={styles.image}
            />
            <div className={styles.overlay}></div>
          </div>

          <div className={styles.content}>
            <h3 className={styles.title}>{property.title}</h3>
            <p className={styles.location}>{property.location}</p>

            {/* FEATURES */}
            <div className={styles.features}>
              <span>{property.bedrooms || 150} sqm</span>
              <span>{property.bathrooms || 300} sqm</span>
              <span>{property.size || 500} sqm</span>
            </div>

            <p className={styles.price}>
              ₦{property.price?.toLocaleString()}
            </p>
          </div>
        </div>
      </Link>

     <Link href={`/properties/${property.slug}`} className={styles.exploreBtn}>
  <span className={styles.text}>Explore Estate</span>

  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={styles.icon}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>

  <span className={styles.ripple}></span>
</Link>
    </div>
  );
}