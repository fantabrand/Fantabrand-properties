import { useRouter } from "next/router";
import Image from "next/image";
import Layout from "@/components/Layout";
import ContactForm from "@/components/ContactForm";
import { getPropertyBySlug } from "@/data/properties";

export default function PropertyDetailPage() {
  const router = useRouter();
  const { slug } = router.query;
  const property = slug ? getPropertyBySlug(slug) : null;

  if (!property) {
    return (
      <Layout title="Property not found">
        <section className="section">
          <div className="container section__narrow">
            <h1 className="section__title">Property not found</h1>
            <p className="section__subtitle">The property you are looking for may have been sold or is temporarily offline.</p>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout title={property.title}>
      <article className="section">
        <div className="container property-detail">
          <div className="property-detail__media">
            <div className="property-detail__hero">
              <Image
                src={property.heroImage}
                alt={property.title}
                fill
                className="property-detail__hero-image"
                sizes="(min-width: 1024px) 60vw, 100vw"
              />
              {property.badge && <span className="property-detail__badge">{property.badge}</span>}
            </div>
            <div className="property-detail__thumbs">
              {property.gallery.map((src) => (
                <div key={src} className="property-detail__thumb">
                  <Image src={src} alt={property.title} fill className="property-detail__thumb-image" sizes="200px" />
                </div>
              ))}
            </div>
          </div>
          <div className="property-detail__content">
            <h1 className="property-detail__title">{property.title}</h1>
            <p className="property-detail__location">{property.location}</p>
            <p className="property-detail__price">{property.price}</p>
            <div className="property-detail__meta">
              <span>{property.type}</span>
              <span>{property.bedrooms} bedrooms</span>
              <span>{property.bathrooms} bathrooms</span>
              <span>{property.area}</span>
              <span className="property-detail__status">{property.status}</span>
            </div>
            <p className="property-detail__description">{property.description}</p>
            <ul className="checklist">
              {property.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="property-detail__cta">
              <h2>Book a private viewing</h2>
              <p>Share your details and preferred time and our team will arrange a confidential inspection.</p>
              <ContactForm compact />
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
}
