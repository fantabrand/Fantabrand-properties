import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import PropertyGrid from "@/components/PropertyGrid";
import ContactForm from "@/components/ContactForm";
import { properties } from "@/data/properties";

export default function HomePage() {
  return (
    <Layout>
      <Hero />
      <PropertyGrid
        properties={properties}
        title="Curated luxury residences"
        subtitle="Every Fantabrand property is handpicked for design integrity, location strength and long-term value."
      />
      <section className="section section--muted">
        <div className="container section__split">
          <div>
            <h2 className="section__title">A boutique real estate partner for serious investors.</h2>
            <p className="section__subtitle">
              From site acquisition and development to off-plan sales and secondary market resales, Fantabrand Properties
              walks with you through every stage of the real estate value chain.
            </p>
            <ul className="checklist">
              <li>Off-plan and completed luxury developments</li>
              <li>Transparent due diligence and documentation support</li>
              <li>End-to-end sales, marketing and facility management</li>
              <li>Advisory for HNIs, diaspora buyers and institutional investors</li>
            </ul>
          </div>
          <div className="section__card">
            <h3>Book a private consultation</h3>
            <p>Share your goals and our team will design a tailored property roadmap for you.</p>
            <ContactForm compact />
          </div>
        </div>
      </section>
    </Layout>
  );
}
