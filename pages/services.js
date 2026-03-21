import styles from "../styles/Services.module.css";
import { FaBuilding, FaHardHat, FaChartLine, FaHome } from "react-icons/fa";

export default function Services() {

return ( <div className={styles.container}>

```
  <section className={styles.hero}>
    <h1>Our Services</h1>

    <p>
      Fantabrand Properties offers end-to-end real estate solutions —
      from land banking and design to construction, sales and long-term asset management.
    </p>
  </section>


  <section className={styles.grid}>

    <div className={styles.card}>
      <div className={styles.icon}>
        <FaBuilding />
      </div>

      <h2>Luxury Property Sales</h2>

      <p>
        We market and sell premium land, luxury properties and gated estates
        with strong emphasis on title security and capital appreciation.
      </p>

      <ul>
        <li>Primary and secondary market sales</li>
        <li>Off-plan and completed units</li>
        <li>Buyer representation and negotiation</li>
      </ul>
    </div>


    <div className={styles.card}>
      <div className={styles.icon}>
        <FaHardHat />
      </div>

      <h2>Development & Construction</h2>

      <p>
        From land acquisition to project delivery,
        we coordinate the full real estate development lifecycle.
      </p>

      <ul>
        <li>Site acquisition and feasibility studies</li>
        <li>Design coordination and approvals</li>
        <li>Construction oversight and quality control</li>
      </ul>
    </div>


    <div className={styles.card}>
      <div className={styles.icon}>
        <FaChartLine />
      </div>

      <h2>Investment Advisory</h2>

      <p>
        We guide local and diaspora investors in building
        high-performing real estate portfolios.
      </p>

      <ul>
        <li>Market research and location analysis</li>
        <li>Cashflow and yield modelling</li>
        <li>Joint-venture and co-investment structures</li>
      </ul>
    </div>


    <div className={styles.card}>
      <div className={styles.icon}>
        <FaHome />
      </div>

      <h2>Property Management</h2>

      <p>
        Protect your asset and maximize rental income through
        professional property and facility management.
      </p>

      <ul>
        <li>Tenant sourcing and vetting</li>
        <li>Rent collection and reporting</li>
        <li>Maintenance and service charge management</li>
      </ul>
    </div>

  </section>


  <section className={styles.cta}>

    <h2>Want to join early investors and buy Nigeria's fast growing cities?</h2>

    <p>
      Speak with Fantabrand Properties today and discover
      verified high-return property opportunities.
    </p>

    <a
      href="https://wa.me/2349063504797"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.ctaBtn}
    >
      Chat With Us on WhatsApp
    </a>

  </section>

</div>
);
}
