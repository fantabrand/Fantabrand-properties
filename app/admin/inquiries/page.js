"use client";

import { useEffect, useState } from "react";
import supabase from "@/lib/supabase";

export default function AdminInquiries() {

  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    fetchInquiries();

  }, []);



  async function fetchInquiries() {

    setLoading(true);

    const { data, error } = await supabase
      .from("inquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {

      setInquiries(data || []);

    }

    setLoading(false);

  }



  async function deleteInquiry(id) {

    const confirmDelete =
      confirm("Delete this inquiry?");

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("inquiries")
      .delete()
      .eq("id", id);

    if (!error) {

      fetchInquiries();

    }

  }



  function replyWhatsApp(inquiry) {

    if (!inquiry.phone) {
      alert("No phone number found");
      return;
    }

    // Clean phone number (remove spaces, symbols)
    let phone =
      inquiry.phone.replace(/\D/g, "");

    // Add country code if missing (Nigeria default)
    if (phone.startsWith("0")) {
      phone = "234" + phone.substring(1);
    }

    const message =
      `Hello ${inquiry.name || ""}, thank you for your inquiry about Fantabrand Properties. How may we assist you further?`;

    const whatsappUrl =
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(
      whatsappUrl,
      "_blank"
    );

  }



  return (
    <div>

      <h1 style={title}>
        Inquiry Management
      </h1>


      {loading ? (

        <p>Loading inquiries...</p>

      ) : inquiries.length === 0 ? (

        <p>No inquiries found.</p>

      ) : (

        <div style={table}>


          <div style={tableHeader}>

            <div>Name</div>
            <div>Phone</div>
            <div>Message</div>
            <div>Date</div>
            <div>Actions</div>

          </div>


          {inquiries.map((inquiry) => (

            <div key={inquiry.id} style={tableRow}>


              <div>
                {inquiry.name}
              </div>


              <div>
                {inquiry.phone}
              </div>


              <div style={message}>
                {inquiry.message}
              </div>


              <div>
                {new Date(
                  inquiry.created_at
                ).toLocaleDateString()}
              </div>


              <div style={actions}>


                <button
                  style={whatsappButton}
                  onClick={() =>
                    replyWhatsApp(inquiry)
                  }
                >
                  WhatsApp
                </button>


                <button
                  style={deleteButton}
                  onClick={() =>
                    deleteInquiry(inquiry.id)
                  }
                >
                  Delete
                </button>


              </div>


            </div>

          ))}


        </div>

      )}

    </div>
  );
}



/* STYLES */

const title = {
  fontSize: "28px",
  fontWeight: "bold",
  marginBottom: "20px",
};


const table = {
  background: "white",
  borderRadius: "10px",
  overflow: "hidden",
  boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
};


const tableHeader = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 2fr 1fr 1.5fr",
  padding: "15px",
  fontWeight: "bold",
  borderBottom: "1px solid #eee",
};


const tableRow = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 2fr 1fr 1.5fr",
  padding: "15px",
  borderBottom: "1px solid #eee",
  alignItems: "center",
};


const message = {
  color: "#555",
};


const actions = {
  display: "flex",
  gap: "10px",
};


const whatsappButton = {
  background: "#25D366",
  color: "white",
  border: "none",
  padding: "8px 14px",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
};


const deleteButton = {
  background: "#ef4444",
  color: "white",
  border: "none",
  padding: "8px 14px",
  borderRadius: "6px",
  cursor: "pointer",
};
