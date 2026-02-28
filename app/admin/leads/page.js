"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase";

export default function LeadsPage() {

  const router = useRouter();

  const [contacts, setContacts] = useState([]);
  const [inspections, setInspections] = useState([]);
  const [loading, setLoading] = useState(true);


  /* ================= AUTH CHECK ================= */

  useEffect(() => {
    checkUser();
  }, []);


  async function checkUser() {

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/admin/login");
      return;
    }

    fetchData();
  }


  /* ================= FETCH DATA ================= */

  async function fetchData() {

    setLoading(true);

    const { data: contactData } =
      await supabase
        .from("contacts")
        .select("*")
        .order("created_at", { ascending: false });

    const { data: inspectionData } =
      await supabase
        .from("inspections")
        .select("*")
        .order("created_at", { ascending: false });

    setContacts(contactData || []);
    setInspections(inspectionData || []);

    setLoading(false);
  }


  /* ================= DELETE ================= */

  async function deleteContact(id) {

    await supabase
      .from("contacts")
      .delete()
      .eq("id", id);

    fetchData();
  }


  async function deleteInspection(id) {

    await supabase
      .from("inspections")
      .delete()
      .eq("id", id);

    fetchData();
  }


  /* ================= LOGOUT ================= */

  async function logout() {

    await supabase.auth.signOut();

    router.push("/admin/login");
  }


  /* ================= LOADING ================= */

  if (loading)
    return (
      <div style={container}>
        Loading dashboard...
      </div>
    );


  /* ================= UI ================= */

  return (

    <div style={container}>

      <button onClick={logout} style={logoutBtn}>
        Logout
      </button>


      <h1 style={title}>
        Admin Lead Dashboard
      </h1>


      {/* CONTACT SECTION */}

      <h2 style={sectionTitle}>
        Contact Messages
      </h2>

      {contacts.length === 0 && (
        <p style={empty}>
          No contact messages yet.
        </p>
      )}

      {contacts.map((lead) => (

        <div key={lead.id} style={card}>

          <div style={rowTop}>
            <strong>{lead.name}</strong>

            <span style={date}>
              {new Date(
                lead.created_at
              ).toLocaleString()}
            </span>
          </div>

          <p>Email: {lead.email}</p>

          <p>Phone: {lead.phone}</p>

          <p style={message}>
            {lead.message}
          </p>


          <div style={buttonRow}>

            <a
              href={`https://wa.me/${lead.phone}`}
              target="_blank"
              style={whatsappBtn}
            >
              WhatsApp Reply
            </a>

            <button
              onClick={() =>
                deleteContact(lead.id)
              }
              style={deleteBtn}
            >
              Delete
            </button>

          </div>

        </div>

      ))}



      {/* INSPECTION SECTION */}

      <h2 style={sectionTitle}>
        Inspection Requests
      </h2>

      {inspections.length === 0 && (
        <p style={empty}>
          No inspection requests yet.
        </p>
      )}

      {inspections.map((lead) => (

        <div key={lead.id} style={card}>

          <div style={rowTop}>
            <strong>{lead.name}</strong>

            <span style={date}>
              {new Date(
                lead.created_at
              ).toLocaleString()}
            </span>
          </div>

          <p>
            Property: {lead.property_title}
          </p>

          <p>Email: {lead.email}</p>

          <p>Phone: {lead.phone}</p>

          <p>
            Preferred Date:{" "}
            {lead.preferred_date}
          </p>

          <p style={message}>
            {lead.message}
          </p>


          <div style={buttonRow}>

            <a
              href={`https://wa.me/${lead.phone}`}
              target="_blank"
              style={whatsappBtn}
            >
              WhatsApp Reply
            </a>

            <button
              onClick={() =>
                deleteInspection(lead.id)
              }
              style={deleteBtn}
            >
              Delete
            </button>

          </div>

        </div>

      ))}

    </div>

  );

}



/* ================= STYLES ================= */

const container = {

  padding: "60px 40px",
  minHeight: "100vh",
  background: "#0f0f12",
  color: "#fff",

};


const title = {

  fontSize: "32px",
  marginBottom: "30px",

};


const sectionTitle = {

  fontSize: "22px",
  marginTop: "40px",
  marginBottom: "20px",
  color: "#9333ea",

};


const card = {

  background: "rgba(255,255,255,0.05)",
  padding: "20px",
  borderRadius: "12px",
  marginBottom: "20px",
  border: "1px solid rgba(255,255,255,0.08)",

};


const rowTop = {

  display: "flex",
  justifyContent: "space-between",
  marginBottom: "10px",

};


const date = {

  color: "#aaa",
  fontSize: "13px",

};


const message = {

  marginTop: "10px",
  marginBottom: "15px",
  color: "#ccc",

};


const buttonRow = {

  display: "flex",
  gap: "10px",

};


const whatsappBtn = {

  padding: "8px 14px",
  background: "#25D366",
  borderRadius: "8px",
  textDecoration: "none",
  color: "#fff",

};


const deleteBtn = {

  padding: "8px 14px",
  background: "#e11d48",
  borderRadius: "8px",
  border: "none",
  color: "#fff",
  cursor: "pointer",

};


const logoutBtn = {

  padding: "8px 16px",
  background: "#9333ea",
  border: "none",
  borderRadius: "8px",
  color: "#fff",
  cursor: "pointer",
  marginBottom: "20px",

};


const empty = {

  color: "#888",

};