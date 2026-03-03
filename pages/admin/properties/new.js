import { useState } from "react";
import { supabase } from "../../../lib/supabase/client";
import { useRouter } from "next/router";

export default function AddProperty() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    location: "",
    price: "",
    description: "",
    title_document: "",
  });

  const [whyLocation, setWhyLocation] = useState("");
  const [attractions, setAttractions] = useState("");
  const [features, setFeatures] = useState("");

  const [paymentPlan, setPaymentPlan] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [brochureFile, setBrochureFile] = useState(null);

  // AUTO SLUG GENERATOR
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "title") {
      setFormData({
        ...formData,
        title: value,
        slug: generateSlug(value),
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handlePaymentChange = (size, field, value) => {
    setPaymentPlan((prev) => ({
      ...prev,
      [size]: {
        ...prev[size],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!imageFile) {
        alert("Please upload a property image.");
        return;
      }

      // ===== UPLOAD IMAGE =====
      const imagePath = `properties/${formData.slug}/${imageFile.name}`;

      const { error: imageError } = await supabase.storage
        .from("property-images")
        .upload(imagePath, imageFile);

      if (imageError) throw imageError;

      const { data: imageUrlData } = supabase.storage
        .from("property-images")
        .getPublicUrl(imagePath);

      const imageUrl = imageUrlData.publicUrl;

      // ===== UPLOAD BROCHURE (OPTIONAL) =====
      let brochureUrl = null;

      if (brochureFile) {
        const brochurePath = `brochures/${formData.slug}/${brochureFile.name}`;

        const { error: brochureError } = await supabase.storage
          .from("property-images")
          .upload(brochurePath, brochureFile);

        if (brochureError) throw brochureError;

        const { data: brochureUrlData } = supabase.storage
          .from("property-images")
          .getPublicUrl(brochurePath);

        brochureUrl = brochureUrlData.publicUrl;
      }

      // ===== SPLIT TEXTAREAS BY NEW LINE =====
      const whyArray = whyLocation
        .split("\n")
        .map((i) => i.trim())
        .filter(Boolean);

      const attractionArray = attractions
        .split("\n")
        .map((i) => i.trim())
        .filter(Boolean);

      const featureArray = features
        .split("\n")
        .map((i) => i.trim())
        .filter(Boolean);

      // ===== INSERT INTO DATABASE =====
      const { error } = await supabase.from("properties").insert({
        ...formData,
        image_url: imageUrl,
        brochure_url: brochureUrl,
        why_location: JSON.stringify(whyArray),
        environment_attractions: JSON.stringify(attractionArray),
        estate_features: JSON.stringify(featureArray),
        payment_plan: JSON.stringify(paymentPlan),
      });

      if (error) throw error;

      alert("Property Added Successfully 🚀");
      router.push("/properties");

    } catch (err) {
      alert("Error: " + err.message);
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Add New Property</h1>

      <form
        onSubmit={handleSubmit}
        style={{ display: "grid", gap: "20px", maxWidth: "600px" }}
      >
        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
          required
        />

        <input
          name="slug"
          placeholder="Auto Generated Slug"
          value={formData.slug}
          readOnly
        />

        <input
          name="location"
          placeholder="Location"
          onChange={handleChange}
          required
        />

        <input
          name="price"
          placeholder="Price"
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          required
        />

        <select
          name="title_document"
          onChange={handleChange}
          required
        >
          <option value="">Select Title Document</option>
          <option value="C of O">C of O</option>
          <option value="Gazette">Gazette</option>
          <option value="Excision">Excision</option>
          <option value="Registered Survey">Registered Survey</option>
        </select>

        <textarea
          placeholder="Why Location (one per line)"
          onChange={(e) => setWhyLocation(e.target.value)}
        />

        <textarea
          placeholder="Environment Attractions (one per line)"
          onChange={(e) => setAttractions(e.target.value)}
        />

        <textarea
          placeholder="Estate Features (one per line)"
          onChange={(e) => setFeatures(e.target.value)}
        />

        <h3>Payment Plan</h3>

        {/* 300sqm */}
        <div>
          <h4>300sqm</h4>
          <input placeholder="Outright" onChange={(e) =>
            handlePaymentChange("300sqm", "outright", e.target.value)} />
          <input placeholder="3 Months" onChange={(e) =>
            handlePaymentChange("300sqm", "3months", e.target.value)} />
          <input placeholder="6 Months" onChange={(e) =>
            handlePaymentChange("300sqm", "6months", e.target.value)} />
          <input placeholder="Initial Deposit" onChange={(e) =>
            handlePaymentChange("300sqm", "initialDeposit", e.target.value)} />
        </div>

        {/* 500sqm */}
        <div>
          <h4>500sqm</h4>
          <input placeholder="Outright" onChange={(e) =>
            handlePaymentChange("500sqm", "outright", e.target.value)} />
          <input placeholder="3 Months" onChange={(e) =>
            handlePaymentChange("500sqm", "3months", e.target.value)} />
          <input placeholder="6 Months" onChange={(e) =>
            handlePaymentChange("500sqm", "6months", e.target.value)} />
          <input placeholder="Initial Deposit" onChange={(e) =>
            handlePaymentChange("500sqm", "initialDeposit", e.target.value)} />
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          required
        />

        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setBrochureFile(e.target.files[0])}
        />

        <button type="submit">Add Property</button>
      </form>
    </div>
  );
}