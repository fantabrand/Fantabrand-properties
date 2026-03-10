import { useState } from "react";
import WhatsAppFloat from "../components/WhatsAppFloat";
import ExecutiveChat from "../components/ExecutiveChat";
import { supabase } from "../lib/supabase/client";
import styles from "../styles/Contact.module.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from("contact")
      .insert([formData]);

    if (!error) {
      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: ""
      });
    }

    setLoading(false);
  };

  return (
    <div className={styles.contactPage}>

      <div className={styles.contactContainer}>
<WhatsAppFloat />
<ExecutiveChat />
        {/* LEFT SIDE */}
        <div className={styles.contactInfo}>
          <h1>We love hearing from you</h1>
          <p>
            Whether you're an investor, buyer, or strategic partner,
            Fantabrand Properties is ready to engage.
          </p>

          <div className={styles.infoBlock}>
            <h4>Email</h4>
            <span>info@fantabrandproperties.com</span>
          </div>

          <div className={styles.infoBlock}>
            <h4>Phone</h4>
            <span>+234 9063504797</span>
          </div>

          <div className={styles.infoBlock}>
            <h4>Office</h4>
            <span>2, Mubo Phase II, Ilorin, Kwara State</span>
          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className={styles.formWrapper}>
          {success ? (
            <div className={styles.successMessage}>
              <h3>Message Sent Successfully</h3>
              <p>Our team will respond to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
              />

              <textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              />

              <button type="submit" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
}