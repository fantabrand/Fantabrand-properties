import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase/client";
import styles from "../../styles/PropertyDetails.module.css";

export default function PropertyDetails() {

const router = useRouter();
const { slug } = router.query;

const [property, setProperty] = useState(null);
const [name, setName] = useState("");
const [phone, setPhone] = useState("");
const [date, setDate] = useState("");
const [time, setTime] = useState("");
const [loading, setLoading] = useState(false);
const [mainImage, setMainImage] = useState(null);

useEffect(() => {
if (slug) fetchProperty();
}, [slug]);

async function fetchProperty() {

const { data, error } = await supabase
.from("properties")
.select("*")
.eq("slug", slug)
.single();

if (error) {
console.log(error);
} else {
setProperty(data);
setMainImage(data.image_url);
}

}

if (!property) return <p className={styles.loading}>Loading...</p>;


// SAFE JSON PARSING

const whyLocation = property.why_location
? JSON.parse(property.why_location)
: [];

const attractions = property.environment_attractions
? JSON.parse(property.environment_attractions)
: [];

const features = property.estate_features
? JSON.parse(property.estate_features)
: [];

const paymentPlan = property.payment_plan
? JSON.parse(property.payment_plan)
: {};

// GALLERY IMAGES

const galleryImages = property.gallery
? property.gallery.split(",")
: [];

const whatsappUrl = `https://wa.me/2349063504797?text=${encodeURIComponent(
`Hello, I am interested in ${property.title}`
)}`;

async function bookInspection() {

if (!name || !phone || !date || !time) {
  alert("Please fill all fields");
  return;
}

setLoading(true);

const { error } = await supabase
.from("inspection_requests")
.insert([
  {
    property_title: property.title,
    property_slug: property.slug,
    name: name,
    phone: phone,
    inspection_date: date,
    inspection_time: time,
  }
]);

setLoading(false);

if (error) {
  console.log(error);
  alert("Failed to book inspection");
} else {
  alert("Inspection request submitted successfully!");
  setName("");
  setPhone("");
  setDate("");
  setTime("");
}

}
return (

<div className={styles.container}>

<div className={styles.grid}>

{/* LEFT SIDE */}

<div className={styles.left}>

<h1 className={styles.title}>{property.title}</h1>
<p className={styles.subLocation}>{property.location}</p>

{/* MAIN IMAGE */}

<img
src={mainImage}
alt={property.title}
className={styles.heroImage}
/>

{/* GALLERY THUMBNAILS */}

{galleryImages.length > 0 && (

<div className={styles.galleryRow}>

{galleryImages.map((img, index) => (

<img
key={index}
src={img}
alt="gallery"
className={styles.galleryThumb}
onClick={() => setMainImage(img)}
/>

))}

</div>

)}

{/* DESCRIPTION */}

<div className={styles.section}>
<h2>Description</h2>
<p>{property.description}</p>
</div>

{/* WHY LOCATION */}

{whyLocation.length > 0 && (
<div className={styles.section}>
<h2>Why This Location</h2>
<ul>
{whyLocation.map((item, index) => (
<li key={index}>{item}</li>
))}
</ul>
</div>
)}

{/* ENVIRONMENT ATTRACTIONS */}

{attractions.length > 0 && (
<div className={styles.section}>
<h2>Environment Attractions</h2>
<ul>
{attractions.map((item, index) => (
<li key={index}>{item}</li>
))}
</ul>
</div>
)}

{/* ESTATE FEATURES */}

{features.length > 0 && (
<div className={styles.section}>
<h2>Estate Features</h2>

<div className={styles.featuresGrid}>
{features.map((item, index) => (
<div key={index} className={styles.featureCard}>
✔ {item}
</div>
))}
</div>

</div>
)}

{/* PAYMENT PLAN */}

{Object.keys(paymentPlan).length > 0 && (

<div className={styles.section}>

<h2>Payment Plan</h2>

<div className={styles.paymentGrid}>

{Object.keys(paymentPlan).map((size) => (

<div key={size} className={styles.paymentCard}>

<h4>{size}</h4>

<p>Outright: ₦{paymentPlan[size]?.outright || "-"}</p>
<p>3 Months: ₦{paymentPlan[size]?.["3months"] || "-"}</p>
<p>6 Months: ₦{paymentPlan[size]?.["6months"] || "-"}</p>
<p>
Initial Deposit: ₦{paymentPlan[size]?.initialDeposit || "-"}
</p>

</div>

))}

</div>

</div>

)}

</div>

{/* RIGHT SIDE */}

<div className={styles.right}>

<div className={styles.priceCard}>

<h1 className={styles.price}>₦{property.price}</h1>

<p className={styles.location}>{property.location}</p>

{property.title_document && (
<div
style={{
background: "#e6f4ea",
color: "#137333",
padding: "8px 12px",
borderRadius: "8px",
marginBottom: "15px",
fontWeight: "600",
textAlign: "center",
}}
>
📜 {property.title_document}
</div>
)}

{property.brochure_url && (
<a
href={property.brochure_url}
target="_blank"
rel="noopener noreferrer"
style={{
display: "block",
marginBottom: "15px",
textAlign: "center",
padding: "12px",
background: "#2563eb",
color: "white",
borderRadius: "8px",
textDecoration: "none",
fontWeight: "600",
}}
>
Download Brochure
</a>
)}

<a
href={whatsappUrl}
target="_blank"
rel="noopener noreferrer"
className={styles.whatsapp}
>
Chat on WhatsApp
</a>

<div className={styles.inspectBox}>

<input
  type="text"
  placeholder="Your Name"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>

<input
  type="tel"
  placeholder="Phone Number"
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
/>

<input
  type="date"
  value={date}
  onChange={(e) => setDate(e.target.value)}
/>

<select
  value={time}
  onChange={(e) => setTime(e.target.value)}
>
  <option value="">Select Time</option>
  <option>9:00 AM</option>
  <option>11:00 AM</option>
  <option>1:00 PM</option>
  <option>3:00 PM</option>
  <option>5:00 PM</option>
</select>

<button
  className={styles.inspectBtn}
  onClick={bookInspection}
>
  {loading ? "Booking..." : "Book Inspection"}
</button>

</div>

</div>

</div>

</div>

</div>

);

}