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
    const { data } = await supabase
      .from("properties")
      .select("*")
      .eq("slug", property)
      .single();

    setPropertyData(data);
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

  const whatsappLink = `https://wa.me/23463504797?text=Hello, I'm interested in ${formatProperty(
    property
  )} (${size})`;

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* LEFT SIDE */}
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
            <p>✅ Flexible Payment Plans</p>
            <p>✅ Free Site Inspection</p>
            <p>✅ Instant Allocation</p>
            <p>✅ Verified & Secure Title</p>
          </div>

          <a href={whatsappLink} target="_blank" style={styles.whatsapp}>
            💬 Chat on WhatsApp
          </a>
        </div>

        {/* RIGHT SIDE */}
        <div style={styles.right}>
          {success ? (
            <div style={styles.successBox}>
              <h2>🎉 Booking Confirmed</h2>
              <p>Our team will contact you shortly.</p>
            </div>
          ) : (
            <>
              <h2 style={styles.formTitle}>
                Own a Piece of Luxury Real Estate
              </h2>

              <form onSubmit={handleSubmit} style={styles.form}>
                <FloatingInput
                  name="name"
                  label="Full Name"
                  onChange={handleChange}
                />
                <FloatingInput
                  name="phone"
                  label="Phone Number"
                  onChange={handleChange}
                />
                <FloatingInput
                  name="email"
                  label="Email Address"
                  onChange={handleChange}
                />

                <button style={styles.button} disabled={loading}>
                  {loading ? "Processing..." : "Secure My Plot →"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// 🔹 Floating Input
const FloatingInput = ({ name, label, onChange }) => {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  return (
    <div style={styles.inputGroup}>
      <input
        name={name}
        required
        onChange={(e) => {
          onChange(e);
          setHasValue(e.target.value !== "");
        }}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          if (!e.target.value) setFocused(false);
        }}
        style={styles.input}
      />

      <label
        style={{
          ...styles.label,
          top: focused || hasValue ? "6px" : "50%",
          fontSize: focused || hasValue ? "11px" : "14px",
          color: focused ? "#7c3aed" : "#777",
          transform: focused || hasValue
            ? "translateY(0)"
            : "translateY(-50%)",
        }}
      >
        {label}
      </label>
    </div>
  );
};

// 🔹 Info Row
const Info = ({ label, value }) => (
  <div style={styles.infoRow}>
    <span>{label}</span>
    <strong>{value}</strong>
  </div>
);

// 🎨 STYLES (ELITE UI)
const styles = {
  page: {
    background: "#f6f7fb",
    padding: "20px",
  },

  container: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "40px",
    maxWidth: "1200px",
    margin: "auto",
  },

  left: {},

  right: {
    background: "rgba(255,255,255,0.7)",
    backdropFilter: "blur(20px)",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
  },

  title: {
    fontSize: "clamp(26px,5vw,38px)",
    fontWeight: "700",
  },

  subtitle: {
    color: "#7c3aed",
    marginBottom: "20px",
  },

  infoCard: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "20px",
  },

  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },

  valueBox: {
    lineHeight: "1.8",
    marginBottom: "20px",
  },

  whatsapp: {
    display: "inline-block",
    marginTop: "10px",
    color: "#25D366",
    fontWeight: "600",
  },

  formTitle: {
    marginBottom: "20px",
    fontSize: "22px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },

  inputGroup: {
    position: "relative",
  },

  input: {
  width: "100%",
  padding: "18px 14px 8px", // top padding creates space for label
  borderRadius: "10px",
  border: "1px solid #ddd",
  outline: "none",
  fontSize: "15px",
  color: "#111", // 🔥 VERY IMPORTANT (was too faint)
  background: "#fff",
  
},

  label: {
  position: "absolute",
  left: "12px",
  background: "#fff",
  padding: "0 6px",
  pointerEvents: "none",
  transition: "0.2s ease",
},

  button: {
    padding: "16px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(135deg,#6d28d9,#9333ea)",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.3s",
  },

  successBox: {
    textAlign: "center",
  },

  // 📱 MOBILE FIX
  "@media (max-width:768px)": {
    container: {
      gridTemplateColumns: "1fr",
    },
  },
};
