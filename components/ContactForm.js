import { useState } from "react";

export default function ContactForm({ compact = false }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: ""
  });
  const [status, setStatus] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.name || !form.phone || !form.message) {
      setStatus({ type: "error", message: "Please fill in your name, phone number and message." });
      return;
    }
    // In a real project this would submit to an API route or CRM.
    console.log("Form submitted:", form);
    setStatus({ type: "success", message: "Thank you. A member of our advisory team will reach out shortly." });
    setForm({
      name: "",
      email: "",
      phone: "",
      interest: "",
      message: ""
    });
  };

  return (
    <form className={`contact-form ${compact ? "contact-form--compact" : ""}`} onSubmit={handleSubmit}>
      <div className="contact-form__grid">
        <div className="contact-form__field">
          <label htmlFor="name">Full name *</label>
          <input id="name" name="name" value={form.name} onChange={handleChange} placeholder="Enter your full name" />
        </div>
        <div className="contact-form__field">
          <label htmlFor="phone">Phone number *</label>
          <input
            id="phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+234..."
          />
        </div>
        <div className="contact-form__field">
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
          />
        </div>
        <div className="contact-form__field">
          <label htmlFor="interest">What are you interested in?</label>
          <select id="interest" name="interest" value={form.interest} onChange={handleChange}>
            <option value="">Select an option</option>
            <option value="buying">Buying a home</option>
            <option value="selling">Selling a property</option>
            <option value="development">Joint venture / development</option>
            <option value="advisory">Investment advisory</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
      <div className="contact-form__field">
        <label htmlFor="message">Tell us a bit more *</label>
        <textarea
          id="message"
          name="message"
          rows={compact ? 3 : 5}
          value={form.message}
          onChange={handleChange}
          placeholder="Share your goals, preferred locations, budget or timeline..."
        />
      </div>
      <button type="submit" className="btn btn--primary">
        Submit enquiry
      </button>
      {status && (
        <p className={`contact-form__status contact-form__status--${status.type}`}>{status.message}</p>
      )}
    </form>
  );
}
