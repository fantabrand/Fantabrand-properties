import Layout from "@/components/Layout";

const services = [
  {
    title: "Luxury Property Sales",
    description:
      "We market and sell premium apartments, villas and gated estates with a strong focus on title security, finishing quality and capital appreciation.",
    points: [
      "Primary and secondary market sales",
      "Off-plan and completed units",
      "Buyer representation and negotiation"
    ]
  },
  {
    title: "Development & Construction",
    description:
      "From bare land to keys in hand, we coordinate the full development life cycle with trusted technical partners.",
    points: [
      "Site acquisition and feasibility studies",
      "Design coordination and approvals",
      "Construction oversight and quality control"
    ]
  },
  {
    title: "Investment Advisory",
    description:
      "We help local and diaspora investors identify, structure and manage high-performing real estate portfolios.",
    points: [
      "Market research and location analysis",
      "Cashflow, yield and exit strategy reviews",
      "Joint-venture and co-investment structures"
    ]
  },
  {
    title: "Property Management",
    description:
      "Protect your asset and unlock its full value with professional facility and tenant management.",
    points: [
      "Tenant sourcing and vetting",
      "Rent collection and reporting",
      "Maintenance and service charge management"
    ]
  }
];

export default function ServicesPage() {
  return (
    <Layout title="Services">
      <section className="section">
        <div className="container section__narrow">
          <h1 className="section__title">Services</h1>
          <p className="section__subtitle">
            Fantabrand Properties offers end-to-end real estate services — from land banking and design to construction,
            sales and long-term management.
          </p>
        </div>
        <div className="container services-grid">
          {services.map((service) => (
            <article key={service.title} className="service-card">
              <h2>{service.title}</h2>
              <p>{service.description}</p>
              <ul className="bullet-list">
                {service.points.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
