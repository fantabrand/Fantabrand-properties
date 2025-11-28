import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero" style={{ backgroundImage: 'url(/hero-luxury.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <div className="hero__overlay" />
      <div className="container hero__content">
        <div className="hero__eyebrow">Luxury Real Estate • Investment Grade</div>
        <h1 className="hero__title">
          Redefining <span>Luxury Living</span> for the modern Nigerian investor.
        </h1>
        <p className="hero__subtitle">
          Fantabrand Properties curates high-yield, design-forward homes and developments across Lagos, Abuja and Ilorin —
          crafted for individuals and institutions who demand more from real estate.
        </p>
        <div className="hero__actions">
          <Link href="/properties" className="btn btn--primary">
            Explore Properties
          </Link>
          <Link href="/contact" className="btn btn--ghost">
            Speak to an Advisor
          </Link>
        </div>
        <div className="hero__stats">
          <div>
            <span className="hero__stat-number">15+</span>
            <span className="hero__stat-label">Premium projects</span>
          </div>
          <div>
            <span className="hero__stat-number">98%</span>
            <span className="hero__stat-label">Client satisfaction</span>
          </div>
          <div>
            <span className="hero__stat-number">₦5B+</span>
            <span className="hero__stat-label">In managed assets</span>
          </div>
        </div>
      </div>
    </section>
  );
}
