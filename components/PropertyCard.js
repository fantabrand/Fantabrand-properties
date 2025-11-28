import Link from "next/link";
import Image from "next/image";

export default function PropertyCard({ property }) {
  return (
    <Link href={`/properties/${property.slug}`} className="property-card">
      <div className="property-card__image-wrapper">
        <Image
          src={property.heroImage}
          alt={property.title}
          fill
          className="property-card__image"
          sizes="(min-width: 1024px) 400px, 100vw"
        />
        {property.badge && <span className="property-card__badge" style={{color:"#fff"}}>{property.badge}</span>}
      </div>
      <div className="property-card__body">
        <h3 className="property-card__title">{property.title}</h3>
        <p className="property-card__location">{property.location}</p>
        <p className="property-card__price">{property.price}</p>
        <div className="property-card__meta">
          <span>{property.bedrooms} bed</span>
          <span>{property.bathrooms} bath</span>
          <span>{property.area}</span>
        </div>
        <p className="property-card__excerpt">{property.shortDescription}</p>
        <span className="property-card__link">View details</span>
      </div>
    </Link>
  );
}
