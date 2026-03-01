export default function PropertyGrid({ properties }) {
  return (
    <section className="property-section">
      
      <div className="container">

        <h2 className="heading">
          Featured Properties
        </h2>

        <p className="subheading">
          Handpicked premium real estate opportunities
        </p>

        <div className="grid">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

      </div>

      <style jsx>{`
        .property-section {
          background: #ffffff;
          padding: 80px 20px;
        }

        .container {
          max-width: 1200px;
          margin: auto;
          text-align: center;
        }

        .heading {
          font-size: 36px;
          font-weight: 600;
          color: #111;
          margin-bottom: 10px;
        }

        .subheading {
          font-size: 16px;
          color: #666;
          margin-bottom: 40px;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
        }

        @media (max-width: 768px) {
          .heading {
            font-size: 28px;
          }

          .property-section {
            padding: 60px 16px;
          }
        }

      `}</style>

    </section>
  );
}