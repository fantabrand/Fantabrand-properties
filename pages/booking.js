import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase/client";

export default function BookingPage() {
  const router = useRouter();
  const { property, size } = router.query;

  const [isMobile, setIsMobile] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [propertyData, setPropertyData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // ✅ Detect screen size
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // 🔥 Fetch property
  useEffect(() => {
    if (!property) return;
    fetchProperty();
  }, [property]);

  const fetchProperty = async () => {
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .eq("slug", property)
      .single();

    if (!error) setPropertyData(data);
  };

  if (!router.isReady) return null;

  const formatProperty = (slug) => {
    return slug?.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("bookings").insert([
      {
        name: form.name,
        phone: form.phone,
        email: form.email,
        property,
        size,
      },
    ]);

    setLoading(false);

    if (!error) setSuccess(true);
    else alert("Something went wrong!");
  };

  return (
    <div
      style={{
        ...styles.container,
        flexDirection: isMobile ? "column" : "row",
        padding: isMobile ? "20px" : "60px",
        gap: isMobile ? "30px" : "50px",
      }}
    >
      {/* LEFT */}
      <div style={styles.left}>
        <h1 style={styles.title}>Secure Your Plot Today</h1>

        <p style={styles.subtitle}>
          {propertyData?.title || formatProperty(property)}
        </p>

        <div style={styles.infoCard}>
          <Info label="Plot Size" value={size} />
          <Info label="Location" value={propertyData?.location || "..."} />
          <Info label="Title" value={propertyData?.title_document || "..."} />
        </div>

        <div style={styles.valueBox}>
          <p>✅ Flexible Payment Plans Available</p>
          <p>✅ Free Site Inspection</p>
          <p>✅ Instant Allocation</p>
          <p>✅ Verified & Secure Title</p>
        </div>

        <p style={styles.link}>
          Speak with our team to get current pricing →
        </p>
      </div>

      {/* RIGHT */}
      <div
        style={{
          ...styles.right,
          padding: isMobile ? "20px" : "40px",
        }}
      >
        {success ? (
          <div style={styles.successBox}>
            <h2>🎉 Booking Received</h2>
            <p>Our team will contact you shortly.</p>
          </div>
        ) : (
          <>
            <h1 style={styles.formTitle}>
              Interested in owning a piece of Luxury?
            </h1>

            <p style={styles.formSubtitle}>
              Fill the form below and we will contact you immediately
            </p>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                onChange={handleChange}
                style={styles.input}
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                required
                onChange={handleChange}
                style={styles.input}
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                onChange={handleChange}
                style={styles.input}
              />

              <button type="submit" style={styles.button} disabled={loading}>
                {loading ? "Processing..." : "Submit →"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

// 🔹 Info Component
const Info = ({ label, value }) => (
  <div style={styles.infoRow}>
    <span style={styles.label}>{label}</span>
    <span style={styles.value}>{value}</span>
  </div>
);

const styles = {
  container: {
    display: "flex",
    minHeight: "85vh",
    background: "#f8f9fc",
  },

  left: { flex: 1 },

  right: {
    flex: 1,
    background: "white",
    borderRadius: "16px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
    width: "100%",
  },

  title: {
    fontSize: "clamp(26px, 5vw, 36px)",
    fontWeight: "700",
  },

  subtitle: {
    color: "#7c3aed",
    marginBottom: "20px",
  },

  infoCard: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "20px",
  },

  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
    flexWrap: "wrap",
  },

  label: { color: "#666" },

  value: { fontWeight: "600" },

  input: {
    width: "100%",
    padding: "14px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },

  button: {
    width: "100%",
    padding: "14px",
    background: "linear-gradient(135deg,#6d28d9,#9333ea)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontWeight: "600",
  },

  successBox: { textAlign: "center" },

  valueBox: {
    marginTop: "15px",
    lineHeight: "1.8",
  },

  link: {
    marginTop: "15px",
    color: "#7c3aed",
    fontWeight: "600",
  },
};