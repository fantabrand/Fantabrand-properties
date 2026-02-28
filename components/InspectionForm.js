"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function InspectionForm({ property }) {

  const supabase = createClient();
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);


  /* ================= GET USER ================= */

  useEffect(() => {

    async function fetchUser() {

      const {
        data: { user }
      } = await supabase.auth.getUser();

      setUser(user);
    }

    fetchUser();

  }, []);


  /* ================= BOOK INSPECTION ================= */

  async function handleBooking(e) {

    e.preventDefault();

    if (!user) {
      alert("Please login to book inspection.");
      router.push("/login");
      return;
    }

    if (!date) {
      alert("Please select inspection date.");
      return;
    }

    setLoading(true);

    try {

      const { error } = await supabase
        .from("inspection_requests")   // ✅ FIXED TABLE NAME
        .insert({
          user_id: user.id,
          property_id: property.id,
          preferred_date: date,       // ✅ FIXED COLUMN NAME
          status: "pending"
        });

      if (error) {
        console.error("Supabase insert error:", error);
        alert(error.message);
        return;
      }

      setSuccess(true);
      setDate("");

    } catch (err) {

      console.error("Unexpected error:", err);
      alert("Unexpected error occurred.");

    } finally {

      setLoading(false);

    }

  }


  /* ================= SUCCESS MESSAGE ================= */

  if (success) {

    return (

      <div style={successBox}>

        ✅ Inspection request sent successfully!

        <div style={{ marginTop: "10px" }}>

          <button
            onClick={() => setSuccess(false)}
            style={button}
          >
            Book Another Date
          </button>

        </div>

      </div>

    );

  }


  return (

    <form onSubmit={handleBooking} style={formBox}>

      <h3 style={heading}>
        Book Inspection
      </h3>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={input}
        required
      />

      <button
        type="submit"
        disabled={loading}
        style={button}
      >
        {loading ? "Booking..." : "Confirm Booking"}
      </button>

    </form>

  );

}



/* ================= STYLES ================= */

const formBox = {

  marginTop: "20px",
  padding: "20px",
  background: "#ffffff",
  borderRadius: "10px",
  border: "1px solid #eee"

};


const successBox = {

  marginTop: "20px",
  padding: "20px",
  background: "#ecfdf5",
  borderRadius: "10px",
  color: "#065f46",
  fontWeight: "600"

};


const heading = {

  fontSize: "18px",
  marginBottom: "10px"

};


const input = {

  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc"

};


const button = {

  width: "100%",
  padding: "12px",
  background: "linear-gradient(135deg,#6a0dad,#9333ea)",
  color: "#fff",
  borderRadius: "8px",
  border: "none",
  fontWeight: "600",
  cursor: "pointer"

};