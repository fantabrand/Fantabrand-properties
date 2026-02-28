"use client";

import { createClient } from "@/lib/supabase/client";
import { useState } from "react";

export default function AdminInspectionActions({ inspectionId, currentStatus }) {

  const supabase = createClient();

  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);


  async function updateStatus(newStatus) {

    if (status === newStatus) return;

    setLoading(true);

    const { error } = await supabase
      .from("inspection_requests")   // ✅ FIXED TABLE NAME
      .update({ status: newStatus })
      .eq("id", inspectionId);

    if (error) {
      alert(error.message);
      console.error("Update error:", error);
    } else {
      setStatus(newStatus);
    }

    setLoading(false);
  }


  return (

    <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>

      <button
        onClick={() => updateStatus("approved")}
        disabled={loading}
        style={{
          padding: "6px 12px",
          borderRadius: "6px",
          border: "none",
          background: status === "approved" ? "green" : "#e5e7eb",
          color: status === "approved" ? "#fff" : "#000",
          cursor: "pointer"
        }}
      >
        Approve
      </button>


      <button
        onClick={() => updateStatus("rejected")}
        disabled={loading}
        style={{
          padding: "6px 12px",
          borderRadius: "6px",
          border: "none",
          background: status === "rejected" ? "red" : "#e5e7eb",
          color: status === "rejected" ? "#fff" : "#000",
          cursor: "pointer"
        }}
      >
        Reject
      </button>

    </div>

  );

}