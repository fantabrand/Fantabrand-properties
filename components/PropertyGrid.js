import PropertyCard from "./PropertyCard";

export default function PropertyGrid({ properties, title, subtitle }) {
  return (
    <section className="section">
      <div className="container section__header">
        <div>
          <h2 className="section__title">{title}</h2>
          {subtitle && <p className="section__subtitle">{subtitle}</p>}
        </div>
      </div>
      <div className="container property-grid">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </section>
  );
}
