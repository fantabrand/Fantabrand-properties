"use client";

import { useState, useEffect } from "react";
import supabase from "@/lib/supabase";

export default function ContactPage() {

  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 200);
  }, []);


  async function handleSubmit(e) {

    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    const { error } =
      await supabase.from("contacts").insert([
        {
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          message: formData.get("message"),
        },
      ]);

    setLoading(false);

    if (!error) {
      setSuccess(true);
      e.target.reset();
    }

  }


  return (

    <div style={pageWrapper}>


      {/* HERO */}

      <section style={{
        ...heroSection,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(60px)",
        transition: "all 1.2s ease"
      }}>

        <div style={heroContent}>

          <h1 style={heroTitle}>
            Contact Fantabrand Properties
          </h1>

          <p style={heroSubtitle}>
            Exclusive access to Nigeria’s most prestigious real estate opportunities.
          </p>

        </div>


        {/* BOLD SQUARE IMAGE */}

        <div style={{
          ...heroImageContainer,
          opacity: visible ? 1 : 0,
          transform: visible ? "scale(1)" : "scale(0.9)",
          transition: "all 1.4s ease"
        }}>

          <img
            src="/contact-luxury.jpg"
            style={heroImage}
          />

        </div>

      </section>



      {/* FLOATING CONTACT INFO */}

      <div style={glassWrapper}>

        <div style={{
          ...glassCard,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(80px)",
          transition: "all 1.6s ease"
        }}>

          <h3 style={glassTitle}>
            Private Advisory Office
          </h3>

          <p style={glassText}>📞 +234 906 350 4797</p>
          <p style={glassText}>✉ info@fantabrand.com.ng</p>
          <p style={glassText}>📍 Ilorin • Lagos • Nigeria</p>

        </div>

      </div>



      {/* CONTACT FORM */}

      <div style={formWrapper}>

        <div style={{
          ...formCard,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(80px)",
          transition: "all 1.8s ease"
        }}>

          <h2 style={formTitle}>
            Speak With Our Investment Team
          </h2>

          <p style={formSubtitle}>
            Discreet. Professional. Trusted.
          </p>


          {success &&
            <div style={successBox}>
              Your request has been received.
            </div>
          }


          <form onSubmit={handleSubmit} style={form}>

            <input name="name" placeholder="Full Name" required style={input} />

            <input name="email" placeholder="Email Address" required style={input} />

            <input name="phone" placeholder="Phone Number" required style={input} />

            <textarea
              name="message"
              placeholder="Tell us about your investment interest"
              required
              style={textarea}
            />

            <button style={button}>
              {loading ? "Submitting..." : "Submit Inquiry"}
            </button>

          </form>

        </div>

      </div>


    </div>

  );

}



/* PAGE */

const pageWrapper = {

  background: "#ffffff",

  minHeight: "100vh",

};



/* HERO */

const heroSection = {

  display: "grid",

  gridTemplateColumns: "1fr 500px",

  gap: "60px",

  alignItems: "center",

  maxWidth: "1200px",

  margin: "120px auto 80px auto",

  padding: "0 20px",

};



const heroContent = {

};



const heroTitle = {

  fontSize: "48px",

  fontWeight: "700",

  marginBottom: "16px",
  
background: "linear-gradient(135deg,#6a0dad,#9333ea)",
WebkitBackgroundClip: "text",
WebkitTextFillColor: "transparent",

};



const heroSubtitle = {

  fontSize: "18px",

  color: "#555",

};



const heroImageContainer = {

  width: "100%",
  aspectRatio: "1 / 1",

  borderRadius: "20px",

  overflow: "hidden",

  boxShadow: "0 30px 80px rgba(0,0,0,0.15)",

};



const heroImage = {

  width: "100%",
  height: "100%",

  objectFit: "cover",

};



/* GLASS CARD */

const glassWrapper = {

  display: "flex",

  justifyContent: "center",

  marginBottom: "80px",

};



const glassCard = {

  padding: "30px 50px",

  borderRadius: "20px",

  backdropFilter: "blur(20px)",

  background: "rgba(255,255,255,0.6)",

  border: "1px solid rgba(0,0,0,0.1)",

  boxShadow: "0 30px 80px rgba(0,0,0,0.1)",

};



const glassTitle = {

  fontSize: "20px",

  fontWeight: "600",

  marginBottom: "10px",

  color: "#6a0dad",

};



const glassText = {

  color: "#444",

};



/* FORM */

const formWrapper = {

  display: "flex",

  justifyContent: "center",

  paddingBottom: "120px",

};



const formCard = {

  width: "100%",

  maxWidth: "650px",

  padding: "50px",

  borderRadius: "20px",

  border: "1px solid rgba(0,0,0,0.08)",

  boxShadow: "0 30px 80px rgba(0,0,0,0.1)",

};



const formTitle = {

  fontSize: "28px",

  fontWeight: "700",

background: "linear-gradient(135deg,#6a0dad,#9333ea)",
WebkitBackgroundClip: "text",
WebkitTextFillColor: "transparent",

};



const formSubtitle = {

  marginBottom: "20px",

  color: "#666",

};



const form = {

  display: "flex",

  flexDirection: "column",

  gap: "16px",

};



const input = {

  padding: "16px",

  borderRadius: "10px",

  border: "1px solid rgba(0,0,0,0.1)",

};



const textarea = {

  padding: "16px",

  borderRadius: "10px",

  border: "1px solid rgba(0,0,0,0.1)",

  minHeight: "140px",

};



const button = {

  padding: "16px",

  borderRadius: "10px",

  border: "none",

  background:
    "linear-gradient(135deg,#6a0dad,#9333ea,#c77dff)",

  color: "#fff",

  fontWeight: "600",

  cursor: "pointer",

};



const successBox = {

  background: "#e6fff4",

  padding: "12px",

  borderRadius: "8px",

  marginBottom: "16px",

};