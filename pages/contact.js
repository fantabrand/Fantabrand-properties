import Layout from "@/components/Layout";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <Layout title="Contact">
      <section className="section">
        <div className="container section__split">
          <div>
            <h1 className="section__title">Let&apos;s talk about your next property move.</h1>
            <p className="section__subtitle">
              Whether you are buying, selling, developing or simply exploring options, Fantabrand Properties is available
              to guide you with clear, data-informed advice.
            </p>
            <div className="contact-info">
              <h2>Our office</h2>
              <p>Ilorin, Kwara State, Nigeria</p>
              <p>Phone: +234 (0) 000 000 0000</p>
              <p>Email: hello@fantabrandproperties.com.ng</p>
            </div>
          </div>
          <div className="section__card">
            <h2>Send us a message</h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </Layout>
  );
}
