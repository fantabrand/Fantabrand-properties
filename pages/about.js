import Layout from "@/components/Layout";

export default function AboutPage() {
  return (
    <Layout title="About">
      <section className="section">
        <div className="container section__narrow">
          <h1 className="section__title">About Fantabrand Properties Ltd</h1>
          <p className="section__subtitle">
            Fantabrand Properties is a modern luxury real estate company based in Ilorin, Kwara State, Nigeria, serving
            discerning buyers, investors and developers across the country.
          </p>
          <p>
            We specialise in the acquisition, design, construction and sale of premium residential properties in
            high-growth corridors such as Lagos, Abuja and Ilorin. Our mandate is simple: combine beautiful architecture
            with sound investment fundamentals to create homes that feel as good as they perform.
          </p>
          <p>
            With a curated network of architects, engineers, surveyors, lawyers and facility managers, we manage the
            entire development process from concept to handover — ensuring every touchpoint reflects our philosophy of
            redefining luxury living.
          </p>
        </div>
      </section>
      <section className="section section--muted">
        <div className="container section__split">
          <div>
            <h2 className="section__title">Our promise to clients</h2>
            <ul className="checklist">
              <li>Strict due diligence on every property we list or develop.</li>
              <li>Clear, honest communication at every stage of your transaction.</li>
              <li>Professional documentation and regulatory compliance.</li>
              <li>After-sale support that protects your asset and peace of mind.</li>
            </ul>
          </div>
          <div>
            <h2 className="section__title">Who we work with</h2>
            <p>
              Our clients include high-net-worth individuals, diaspora buyers, developers seeking sales partners, and
              institutions looking to diversify into real assets.
            </p>
            <p>
              Whether you are acquiring your first investment property or assembling a portfolio across multiple cities,
              Fantabrand Properties provides local insight, data-backed advisory and on-ground execution.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
