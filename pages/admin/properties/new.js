import { useState } from "react";
import { supabase } from "../../../lib/supabase/client";
import { useRouter } from "next/router";
import styles from "../../../styles/AdminForm.module.css";

export default function AddProperty() {

const router = useRouter();

const [formData, setFormData] = useState({
title: "",
slug: "",
location: "",
latitude: "",
longitude: "",
price: "",
description: "",
title_document: "",
});

const [whyLocation, setWhyLocation] = useState("");
const [attractions, setAttractions] = useState("");
const [features, setFeatures] = useState("");

const [paymentPlan, setPaymentPlan] = useState({});

const [imageFile, setImageFile] = useState(null);
const [galleryFiles, setGalleryFiles] = useState([]);

const [imagePreview, setImagePreview] = useState(null);

const [brochureFile, setBrochureFile] = useState(null);

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
  setFormData({
    ...formData,
    [name]: value,
  });
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

const uploadGalleryImages = async () => {

const urls = [];

for (const file of galleryFiles) {

  const path = `properties/${formData.slug}/${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from("property-images")
    .upload(path, file);

  if (error) throw error;

  const { data } = supabase.storage
    .from("property-images")
    .getPublicUrl(path);

  urls.push(data.publicUrl);

}

return urls;

};

const handleSubmit = async (e) => {

e.preventDefault();

try {

  if (!imageFile) {
    alert("Please upload a main property image.");
    return;
  }

  /* MAIN IMAGE */

  const imagePath = `properties/${formData.slug}/${imageFile.name}`;

  const { error: imageError } = await supabase.storage
    .from("property-images")
    .upload(imagePath, imageFile);

  if (imageError) throw imageError;

  const { data: imageUrlData } = supabase.storage
    .from("property-images")
    .getPublicUrl(imagePath);

  const imageUrl = imageUrlData.publicUrl;

  /* GALLERY IMAGES */

  const galleryUrls = await uploadGalleryImages();

  const galleryString = galleryUrls.join(",");

  /* BROCHURE */

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

  /* TEXT ARRAYS */

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

  /* INSERT PROPERTY */

  const { error } = await supabase.from("properties").insert({
    ...formData,
    image_url: imageUrl,
    gallery: galleryString,
    brochure_url: brochureUrl,
    why_location: JSON.stringify(whyArray),
    environment_attractions: JSON.stringify(attractionArray),
    estate_features: JSON.stringify(featureArray),
    payment_plan: JSON.stringify(paymentPlan),
  });

  if (error) throw error;

  alert("Property Added Successfully 🚀");

  router.push("/admin/properties");

} catch (err) {

  console.error(err);

  alert("Error: " + err.message);

}

};

return (

<div className={styles.container}>

<h1 className={styles.title}>Add New Property</h1>

<form onSubmit={handleSubmit} className={styles.form}>

<div className={styles.section}>

<h3 className={styles.sectionTitle}>Basic Information</h3>

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

<div className={styles.row}>

<input
name="latitude"
placeholder="Latitude (Example: 8.4799)"
value={formData.latitude}
onChange={handleChange}
/>

<input
name="longitude"
placeholder="Longitude (Example: 4.5418)"
value={formData.longitude}
onChange={handleChange}
/>

</div>

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
<option value="R of O">R of O</option>
<option value="Gazette">Gazette</option>
<option value="Excision">Excision</option>
<option value="Registered Survey">Registered Survey</option>
</select>

</div>

<div className={styles.section}>

<h3 className={styles.sectionTitle}>Why This Location</h3>

<textarea
placeholder="One reason per line"
onChange={(e) => setWhyLocation(e.target.value)}
/>

</div>

<div className={styles.section}>

<h3 className={styles.sectionTitle}>Environment Attractions</h3>

<textarea
placeholder="One attraction per line"
onChange={(e) => setAttractions(e.target.value)}
/>

</div>

<div className={styles.section}>

<h3 className={styles.sectionTitle}>Estate Features</h3>

<textarea
placeholder="One feature per line"
onChange={(e) => setFeatures(e.target.value)}
/>

</div>
<div className={styles.section}>
  <h3 className={styles.sectionTitle}>Payment Plan</h3>

  {/* 150sqm */}

  <h4>150sqm</h4>

  <div className={styles.row}>
    <input
      placeholder="Outright"
      onChange={(e) =>
        handlePaymentChange("150sqm", "outright", e.target.value)
      }
    />

    <input
      placeholder="3 Months"
      onChange={(e) =>
        handlePaymentChange("150sqm", "3months", e.target.value)
      }
    />

    <input
      placeholder="6 Months"
      onChange={(e) =>
        handlePaymentChange("150sqm", "6months", e.target.value)
      }
    />
  </div>

  <input
    placeholder="Initial Deposit"
    onChange={(e) =>
      handlePaymentChange("150sqm", "initialDeposit", e.target.value)
    }
  />

  <br />

  {/* 300sqm */}

  <h4>300sqm</h4>

  <div className={styles.row}>
    <input
      placeholder="Outright"
      onChange={(e) =>
        handlePaymentChange("300sqm", "outright", e.target.value)
      }
    />

    <input
      placeholder="3 Months"
      onChange={(e) =>
        handlePaymentChange("300sqm", "3months", e.target.value)
      }
    />

    <input
      placeholder="6 Months"
      onChange={(e) =>
        handlePaymentChange("300sqm", "6months", e.target.value)
      }
    />
  </div>

  <input
    placeholder="Initial Deposit"
    onChange={(e) =>
      handlePaymentChange("300sqm", "initialDeposit", e.target.value)
    }
  />

  <br />

  {/* 500sqm */}

  <h4>500sqm</h4>

  <div className={styles.row}>
    <input
      placeholder="Outright"
      onChange={(e) =>
        handlePaymentChange("500sqm", "outright", e.target.value)
      }
    />

    <input
      placeholder="3 Months"
      onChange={(e) =>
        handlePaymentChange("500sqm", "3months", e.target.value)
      }
    />

    <input
      placeholder="6 Months"
      onChange={(e) =>
        handlePaymentChange("500sqm", "6months", e.target.value)
      }
    />
  </div>

  <input
    placeholder="Initial Deposit"
    onChange={(e) =>
      handlePaymentChange("500sqm", "initialDeposit", e.target.value)
    }
  />
</div>
<div className={styles.section}>

<h3 className={styles.sectionTitle}>Uploads</h3>

<p>Main Image</p>

<input
type="file"
accept="image/*"
onChange={(e)=>{

const file = e.target.files[0];

setImageFile(file);

if(file){
setImagePreview(URL.createObjectURL(file));
}

}}
required
/>

{imagePreview && (

<div className={styles.imagePreview}>
<img src={imagePreview} alt="Preview"/>
</div>

)}

<p>Gallery Images</p>

<input
type="file"
accept="image/*"
multiple
onChange={(e)=>setGalleryFiles([...e.target.files])}
/>

<p>Brochure PDF</p>

<input
type="file"
accept="application/pdf"
onChange={(e)=>setBrochureFile(e.target.files[0])}
/>

</div>

<button type="submit">
Publish Property
</button>

</form>

</div>

);

}