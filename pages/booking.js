import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase/client";

export default function BookingPage() {
  const router = useRouter();
  const { property, size } = router.query;

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [propertyData, setPropertyData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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

    if (error) {
      console.log(error);
    } else {
      setPropertyData(data);
    }
  };

  if (!router.isReady) return null;

  // 🧠 Format slug fallback
  const formatProperty = (slug) => {
    return slug?.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  // 💰 FIXED PRICE
  const getPrice = () => {
    if (!propertyData?.price) return "₦0";

    let price = parseInt(propertyData.price);

    if (isNaN(price)) return "₦0";

    // 🔥 Fix small values like 375 → 3,750,000
    if (price < 10000) {
      price = price * 10000;
    }

    return `₦${price.toLocaleString()}`;
  };

  // 💰 FIXED DEPOSIT (20%)
  const getDeposit = () => {
    if (!propertyData?.price) return "₦0";

    let price = parseInt(propertyData.price);

    if (isNaN(price)) return "₦0";

    if (price < 10000) {
      price = price * 10000;
    }

    const deposit = price * 0.2;

    return `₦${deposit.toLocaleString()}`;
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

    if (error) {
      alert("Something went wrong!");
      console.log(error);
    } else {
      setSuccess(true);
    }
  };

  return (
    <div style={styles.container}>
      {/* LEFT */}
      <div style={styles.left}>
        <h1 style={styles.title}>Secure Your Plot Today</h1>

        <p style={styles.subtitle}>
          {propertyData?.title || formatProperty(property)}
        </p>

        <div style={styles.infoCard}>
          <Info label="Plot Size" value={size} />
          <Info label="Location" value={propertyData?.location || "..."} />
          <Info
            label="Title"
            value={propertyData?.title_document || "..."}
          />
        </div>

       <div style={styles.valueBox}>
  <p style={styles.valueItem}>✅ Flexible Payment Plans Available</p>
  <p style={styles.valueItem}>✅ Free Site Inspection</p>
  <p style={styles.valueItem}>✅ Instant Allocation</p>
  <p style={styles.valueItem}>✅ Verified & Secure Title</p>
</div>

<p style={{ marginTop: "15px", color: "#7c3aed", fontWeight: "600" }}>
  Speak with our team to get current pricing →
</p>
      </div>


      {/* RIGHT */}
      <div style={styles.right}>
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
    padding: "60px",
    background: "#f8f9fc",
    gap: "50px",
  },
  left: { flex: 1 },
  right: {
    flex: 1,
    background: "white",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
  },
  title: { fontSize: "36px", fontWeight: "700" },
  subtitle: { color: "#7c3aed", marginBottom: "20px" },
  infoCard: {
    background: "white",
    padding: "25px",
    borderRadius: "12px",
    marginBottom: "20px",
  },
  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  label: { color: "#666" },
  value: { fontWeight: "600" },
  price: { fontSize: "34px", fontWeight: "bold" },
  badge: { color: "red", marginTop: "10px" },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "10px",
    borderRadius: "6px",
    border: "1px solid #ddd",
  },
  button: {
    width: "100%",
    padding: "14px",
    background: "#7c3aed",
    color: "white",
    border: "none",
    borderRadius: "8px",
  },
  successBox: { textAlign: "center" },
  
};
