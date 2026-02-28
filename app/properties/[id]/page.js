"use client";

import InspectionForm from "@/components/InspectionForm";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import supabase from "@/lib/supabase";

export default function PropertyDetails() {

  const params = useParams();
  const id = params?.id;

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchProperty();
  }, [id]);


  async function fetchProperty() {

    try {

      setLoading(true);

      const { data, error } =
        await supabase
          .from("properties")
          .select("*")
          .eq("id", id)
          .single();

      if (error) {
        console.error(error);
        return;
      }

      setProperty(data);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }

  }


  if (loading)
    return <div style={container}>Loading property...</div>;

  if (!property)
    return <div style={container}>Property not found.</div>;


  const image =
    property.image_url || "/placeholder.jpg";


  const price =
    property.price
      ? Number(property.price).toLocaleString()
      : "0";


  const whatsappLink =
    `https://wa.me/2349063504797?text=Hello,%20I%20am%20interested%20in%20${encodeURIComponent(property.title)}`;


  const sections =
    property.description
      ? property.description.split("\n")
      : [];


  function renderSection(title) {

    const index =
      sections.findIndex(s =>
        s.trim().toLowerCase() === title.toLowerCase()
      );

    if (index === -1) return null;

    const content = [];

    for (let i = index + 1; i < sections.length; i++) {

      if (sections[i].endsWith(":"))
        break;

      if (sections[i].trim())
        content.push(sections[i]);

    }

    return content;

  }


  const description = renderSection("Description:");
  const whyLocation = renderSection("Why Location:");
  const environment = renderSection("Environment Attractions:");
  const features = renderSection("Features:");
  const paymentPlan = renderSection("Payment Plan:");


  return (

    <div style={container}>

      <h1 style={title}>
        {property.title}
      </h1>


      <div style={layout}>


        {/* LEFT COLUMN */}
        <div style={leftColumn}>

          <img
            src={image}
            alt={property.title}
            style={imageStyle}
            onError={(e) =>
              e.target.src = "/placeholder.jpg"
            }
          />

          <div style={priceStyle}>
            ₦{price}
          </div>

          <div style={buttonRow}>

            <a
              href="tel:+2349063504797"
              style={inspectionButton}
            >
              Book Inspection
            </a>

            <a
              href={whatsappLink}
              target="_blank"
              style={whatsappButton}
            >
              WhatsApp
            </a>

          </div>

        </div>



        {/* RIGHT COLUMN */}
        <div style={rightColumn}>

          <h3 style={detailsHeading}>
            Property Details
          </h3>


          {description && (
            <>
              <h4 style={subHeading}>
                Description
              </h4>

              {description.map((text, i) => (
                <p key={i} style={descriptionText}>
                  {text}
                </p>
              ))}
            </>
          )}


          {whyLocation && (
            <>
              <div style={divider}></div>

              <h4 style={subHeading}>
                Why Location
              </h4>

              {whyLocation.map((item, i) => (
                <div key={i} style={bullet}>
                  <span style={dot}></span>
                  {item.replace("-", "")}
                </div>
              ))}
            </>
          )}


          {environment && (
            <>
              <div style={divider}></div>

              <h4 style={subHeading}>
                Environment Attractions
              </h4>

              {environment.map((item, i) => (
                <div key={i} style={bullet}>
                  <span style={dot}></span>
                  {item.replace("-", "")}
                </div>
              ))}
            </>
          )}


          {features && (
            <>
              <div style={divider}></div>

              <h4 style={subHeading}>
                Features
              </h4>

              {features.map((item, i) => (
                <div key={i} style={bullet}>
                  <span style={dot}></span>
                  {item.replace("-", "")}
                </div>
              ))}
            </>
          )}


          {paymentPlan && (
            <>
              <div style={divider}></div>

              <h4 style={subHeading}>
                Payment Plan
              </h4>

              {paymentPlan.map((item, i) => (
                <div key={i} style={bullet}>
                  <span style={dot}></span>
                  {item.replace("-", "")}
                </div>
              ))}
            </>
          )}


          {/* INSPECTION FORM INSERTED HERE */}
          <div style={divider}></div>

          <InspectionForm property={property} />


        </div>


      </div>

    </div>

  );

}



/* ================= STYLES ================= */

const container = {

  padding: "60px 40px",
  background: "#ffffff",
  minHeight: "100vh",

};


const title = {

  fontSize: "36px",
  fontWeight: "700",
  marginBottom: "30px",

};


const layout = {

  display: "grid",
  gridTemplateColumns: "1fr 1.2fr",
  gap: "50px",

};


const leftColumn = {

  display: "flex",
  flexDirection: "column",

};


const rightColumn = {

  background: "#f7f7f7",
  padding: "32px",
  borderRadius: "14px",
  color: "#1a1a1a",
  boxShadow: "0 6px 24px rgba(0,0,0,0.05)",
  border: "1px solid rgba(0,0,0,0.04)",

};


const imageStyle = {

  width: "100%",
  height: "420px",
  objectFit: "cover",
  borderRadius: "14px",

};


const priceStyle = {

  fontSize: "28px",
  fontWeight: "700",
  marginTop: "20px",
  marginBottom: "14px",
  color: "#111",

};


const buttonRow = {

  display: "flex",
  gap: "14px",

};


const inspectionButton = {

  padding: "12px 22px",
  background: "linear-gradient(135deg,#6a0dad,#9333ea)",
  color: "#fff",
  borderRadius: "10px",
  textDecoration: "none",
  fontWeight: "600",

};


const whatsappButton = {

  padding: "12px 22px",
  background: "#25D366",
  color: "#fff",
  borderRadius: "10px",
  textDecoration: "none",
  fontWeight: "600",

};


const detailsHeading = {

  fontSize: "22px",
  marginBottom: "18px",
  fontWeight: "700",

};


const subHeading = {

  marginTop: "24px",
  marginBottom: "10px",
  fontWeight: "600",
  color: "#6a0dad",

};


const descriptionText = {

  lineHeight: "1.7",
  color: "#333",

};


const bullet = {

  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "8px",

};


const dot = {

  width: "6px",
  height: "6px",
  background: "#6a0dad",
  borderRadius: "50%",

};


const divider = {

  height: "1px",
  background:
    "linear-gradient(to right, transparent, rgba(106,13,173,0.25), transparent)",
  margin: "22px 0",

};