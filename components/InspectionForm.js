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
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    }

    fetchUser();
  }, [supabase]);

  /* ================= BOOK INSPECTION ================= */
  async function handleBooking(e) {
    e.preventDefault();

    if (!user) {
      alert("Please login to book inspection.");
      router.push("/admin/login");
      return;
    }

    if (!date) {
      alert("Please select inspection date.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from("inspection_requests").insert({
        user_id: user.id,
        property_id: property.slug,
        preferred_date: date,
        status: "pending",
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

  return (
    <div className="inspectBox">
      <h3 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "10px" }}>
        Book Inspection
      </h3>

      {success ? (
        <div
          style={{
            padding: "14px",
            background: "#ecfdf5",
            color: "#065f46",
            borderRadius: "10px",
            fontWeight: "600",
            border: "1px solid #d1fae5",
          }}
        >
          ✅ Inspection request sent successfully!
          <button
            onClick={() => setSuccess(false)}
            className="inspectBtn"
            style={{ marginTop: "12px" }}
          >
            Book Another Date
          </button>
        </div>
      ) : (
        <form onSubmit={handleBooking} className="inspectBox">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <button type="submit" disabled={loading} className="inspectBtn">
            {loading ? "Booking..." : "Confirm Booking"}
          </button>
        </form>
      )}
    </div>
  );
}