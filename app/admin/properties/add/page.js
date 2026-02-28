"use client";

import { useState } from "react";
import supabase from "@/lib/supabase";

export default function AddPropertyPage() {

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");

  // file upload
  const [imageFile, setImageFile] = useState(null);

  // structured fields
  const [overview, setOverview] = useState("");
  const [whyLocation, setWhyLocation] = useState("");
  const [environment, setEnvironment] = useState("");
  const [features, setFeatures] = useState("");
  const [paymentPlan, setPaymentPlan] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");


  async function handleSubmit(e) {

    e.preventDefault();

    try {

      setLoading(true);
      setMessage("");

      let image_url = "";


      // ✅ upload image to correct bucket: property-images
      if (imageFile) {

        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;

        const { error: uploadError } =
          await supabase.storage
            .from("property-images")   // ✅ corrected bucket name
            .upload(fileName, imageFile);

        if (uploadError) {
          console.error(uploadError);
          setMessage("Image upload failed");
          setLoading(false);
          return;
        }

        const { data: publicUrlData } =
          supabase.storage
            .from("property-images")   // ✅ corrected bucket name
            .getPublicUrl(fileName);

        image_url = publicUrlData.publicUrl;

      }



      // format structured description safely
      const formattedDescription = `
Description:
${overview}

Why Location:
${whyLocation
  .split("\n")
  .filter(Boolean)
  .map(i => "- " + i)
  .join("\n")}

Environment Attractions:
${environment
  .split("\n")
  .filter(Boolean)
  .map(i => "- " + i)
  .join("\n")}

Features:
${features
  .split("\n")
  .filter(Boolean)
  .map(i => "- " + i)
  .join("\n")}

Payment Plan:
${paymentPlan
  .split("\n")
  .filter(Boolean)
  .map(i => "- " + i)
  .join("\n")}
`;



      // insert into database
      const { error } =
        await supabase
          .from("properties")
          .insert({
            title,
            price,
            location,
            image_url,
            description: formattedDescription,
          });


      if (error) {
        console.error(error);
        setMessage("Failed to add property");
        setLoading(false);
        return;
      }


      setMessage("Property added successfully");


      // reset form
      setTitle("");
      setPrice("");
      setLocation("");
      setImageFile(null);
      setOverview("");
      setWhyLocation("");
      setEnvironment("");
      setFeatures("");
      setPaymentPlan("");


    } catch (err) {

      console.error(err);
      setMessage("Unexpected error");

    } finally {

      setLoading(false);

    }

  }



  return (

    <div style={container}>

      <h1 style={heading}>
        Add New Property
      </h1>


      <form onSubmit={handleSubmit} style={form}>


        <input
          placeholder="Property Title"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          style={input}
          required
        />


        <input
          placeholder="Price"
          value={price}
          onChange={(e)=>setPrice(e.target.value)}
          style={input}
          required
        />


        <input
          placeholder="Location"
          value={location}
          onChange={(e)=>setLocation(e.target.value)}
          style={input}
          required
        />


        {/* image upload */}
        <input
          type="file"
          accept="image/*"
          onChange={(e)=>
            setImageFile(e.target.files[0])
          }
          style={input}
        />


        <textarea
          placeholder="Overview / Description"
          value={overview}
          onChange={(e)=>setOverview(e.target.value)}
          style={textarea}
        />


        <textarea
          placeholder="Why Location (one per line)"
          value={whyLocation}
          onChange={(e)=>setWhyLocation(e.target.value)}
          style={textarea}
        />


        <textarea
          placeholder="Environment Attractions (one per line)"
          value={environment}
          onChange={(e)=>setEnvironment(e.target.value)}
          style={textarea}
        />


        <textarea
          placeholder="Features (one per line)"
          value={features}
          onChange={(e)=>setFeatures(e.target.value)}
          style={textarea}
        />


        <textarea
          placeholder="Payment Plan (one per line)"
          value={paymentPlan}
          onChange={(e)=>setPaymentPlan(e.target.value)}
          style={textarea}
        />


        <button style={button} disabled={loading}>
          {loading ? "Uploading..." : "Add Property"}
        </button>


        {message && (
          <p style={messageStyle}>{message}</p>
        )}


      </form>

    </div>

  );

}



/* styles */

const container = {
  padding: "40px",
};

const heading = {
  fontSize: "28px",
  marginBottom: "20px",
};

const form = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  maxWidth: "600px",
};

const input = {
  padding: "12px",
  fontSize: "16px",
};

const textarea = {
  padding: "12px",
  fontSize: "16px",
  minHeight: "100px",
};

const button = {
  padding: "14px",
  background: "#6a0dad",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "16px",
  cursor: "pointer",
};

const messageStyle = {
  marginTop: "10px",
  fontWeight: "600",
};
