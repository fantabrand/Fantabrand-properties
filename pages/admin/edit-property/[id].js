import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "@/styles/AdminEditProperty.module.css";
import { supabase } from "@/lib/supabase/client";

export default function EditProperty() {

const router = useRouter();
const { id } = router.query;

const [checkingAuth,setCheckingAuth]=useState(true);
const [openSection,setOpenSection]=useState("basic");

const [formData,setFormData]=useState({
title:"",
slug:"",
location:"",
latitude:"",
longitude:"",
price:"",
description:"",
title_document:""
});

const [whyLocation,setWhyLocation]=useState("");
const [attractions,setAttractions]=useState("");
const [features,setFeatures]=useState("");

const [paymentPlan,setPaymentPlan]=useState({});

const [image,setImage]=useState(null);
const [existingImage,setExistingImage]=useState("");

const [galleryFiles,setGalleryFiles]=useState([]);
const [existingGallery,setExistingGallery]=useState([]);

const [brochureFile,setBrochureFile]=useState(null);
const [existingBrochure,setExistingBrochure]=useState("");

useEffect(()=>{

if(id){
checkUser();
fetchProperty();
}

},[id]);

function toggleSection(section){
setOpenSection(prev => prev===section ? null : section);
}

async function checkUser(){

const {data}=await supabase.auth.getUser();

if(!data.user){
router.push("/admin/login");
return;
}

setCheckingAuth(false);
}

async function fetchProperty(){

const {data,error}=await supabase
.from("properties")
.select("*")
.eq("id",id)
.single();

if(!error){

setFormData({
title:data.title || "",
slug:data.slug || "",
location:data.location || "",
latitude:data.latitude || "",
longitude:data.longitude || "",
price:data.price || "",
description:data.description || "",
title_document:data.title_document || ""
});

setExistingImage(data.image_url || "");

setExistingGallery(
data.gallery ? data.gallery.split(",") : []
);

setExistingBrochure(data.brochure_url || "");

setWhyLocation(
data.why_location
? JSON.parse(data.why_location).join("\n")
: ""
);

setAttractions(
data.environment_attractions
? JSON.parse(data.environment_attractions).join("\n")
: ""
);

setFeatures(
data.estate_features
? JSON.parse(data.estate_features).join("\n")
: ""
);

setPaymentPlan(
data.payment_plan
? JSON.parse(data.payment_plan)
: {}
);

}

}

function handleChange(e){

const {name,value}=e.target;

setFormData({
...formData,
[name]:value
});

}

/* DELETE GALLERY IMAGE */

function removeGalleryImage(index){

const updated=[...existingGallery];
updated.splice(index,1);
setExistingGallery(updated);

}

/* PAYMENT PLAN CHANGE */

function handlePaymentChange(e){

const {name,value}=e.target;

setPaymentPlan({
...paymentPlan,
[name]:value
});

}

async function uploadGalleryImages(){

const urls=[];

for(const file of galleryFiles){

const path=`properties/${formData.slug}/${Date.now()}-${file.name}`;

const {error}=await supabase.storage
.from("property-images")
.upload(path,file);

if(error) throw error;

const {data}=supabase.storage
.from("property-images")
.getPublicUrl(path);

urls.push(data.publicUrl);

}

return urls;

}

async function handleUpdate(e){

e.preventDefault();

let image_url=existingImage;

if(image){

const path=`properties/${Date.now()}-${image.name}`;

const {error}=await supabase.storage
.from("property-images")
.upload(path,image);

if(error){
alert("Image upload failed");
return;
}

const {data}=supabase.storage
.from("property-images")
.getPublicUrl(path);

image_url=data.publicUrl;

}

let brochureUrl=existingBrochure;

if(brochureFile){

const path=`brochures/${Date.now()}-${brochureFile.name}`;

const {error}=await supabase.storage
.from("property-images")
.upload(path,brochureFile);

if(error){
alert("Brochure upload failed");
return;
}

const {data}=supabase.storage
.from("property-images")
.getPublicUrl(path);

brochureUrl=data.publicUrl;

}

const galleryUrls=await uploadGalleryImages();

const galleryString=[
...existingGallery,
...galleryUrls
].join(",");

const whyArray=whyLocation.split("\n").map(i=>i.trim()).filter(Boolean);
const attractionArray=attractions.split("\n").map(i=>i.trim()).filter(Boolean);
const featureArray=features.split("\n").map(i=>i.trim()).filter(Boolean);

const {error}=await supabase
.from("properties")
.update({
...formData,
image_url,
gallery:galleryString,
brochure_url:brochureUrl,
why_location:JSON.stringify(whyArray),
environment_attractions:JSON.stringify(attractionArray),
estate_features:JSON.stringify(featureArray),
payment_plan:JSON.stringify(paymentPlan)
})
.eq("id",id);

if(!error){

alert("Property updated successfully");
router.push("/admin/properties");

}else{

alert("Update failed");

}

}

if(checkingAuth){
return <div className="p-10">Checking authentication...</div>;
}

return(

<div className={styles.container}>

<h1 className={styles.title}>Edit Property</h1>

<form onSubmit={handleUpdate} className={styles.form}>

{/* BASIC INFORMATION */}

<div className={styles.section}>

<div
className={styles.sectionHeader}
onClick={()=>toggleSection("basic")}
>

<h3>Basic Information</h3>
<span>{openSection==="basic"?"−":"+"}</span>

</div>

{openSection==="basic" && (

<div className={styles.sectionContent}>

<input name="title" value={formData.title} onChange={handleChange} className={styles.input}/>
<input name="slug" value={formData.slug} onChange={handleChange} className={styles.input}/>
<input name="location" value={formData.location} onChange={handleChange} className={styles.input}/>

<div className={styles.row}>
<input name="latitude" value={formData.latitude} onChange={handleChange} className={styles.input}/>
<input name="longitude" value={formData.longitude} onChange={handleChange} className={styles.input}/>
</div>

<input name="price" value={formData.price} onChange={handleChange} className={styles.input}/>

<textarea name="description" value={formData.description} onChange={handleChange} className={styles.textarea}/>

<select name="title_document" value={formData.title_document} onChange={handleChange} className={styles.input}>
<option value="">Select Title</option>
<option value="C of O">C of O</option>
<option value="Gazette">Gazette</option>
<option value="Excision">Excision</option>
<option value="Registered Survey">Registered Survey</option>
</select>

</div>

)}

</div>

{/* PROPERTY CONTENT */}

<div className={styles.section}>

<div
className={styles.sectionHeader}
onClick={()=>toggleSection("content")}
>

<h3>Property Description</h3>
<span>{openSection==="content"?"−":"+"}</span>

</div>

{openSection==="content" && (

<div className={styles.sectionContent}>

<textarea
value={whyLocation}
onChange={(e)=>setWhyLocation(e.target.value)}
placeholder="Why This Location"
className={styles.textarea}
/>

<textarea
value={attractions}
onChange={(e)=>setAttractions(e.target.value)}
placeholder="Environment Attractions"
className={styles.textarea}
/>

<textarea
value={features}
onChange={(e)=>setFeatures(e.target.value)}
placeholder="Estate Features"
className={styles.textarea}
/>

<h4>Payment Plan</h4>

<input
name="outright"
placeholder="Outright Payment"
value={paymentPlan.outright || ""}
onChange={handlePaymentChange}
className={styles.input}
/>

<input
name="three_months"
placeholder="3 Months Plan"
value={paymentPlan.three_months || ""}
onChange={handlePaymentChange}
className={styles.input}
/>

<input
name="six_months"
placeholder="6 Months Plan"
value={paymentPlan.six_months || ""}
onChange={handlePaymentChange}
className={styles.input}
/>

</div>

)}

</div>

{/* MEDIA UPLOADS */}

<div className={styles.section}>

<div
className={styles.sectionHeader}
onClick={()=>toggleSection("media")}
>

<h3>Media Uploads</h3>
<span>{openSection==="media"?"−":"+"}</span>

</div>

{openSection==="media" && (

<div className={styles.sectionContent}>

<p>Current Image</p>

<div className={styles.imagePreview}>
<img src={existingImage}/>
</div>

<input type="file" className={styles.fileInput} onChange={(e)=>setImage(e.target.files[0])}/>

<h4>Gallery Images</h4>

<div className={styles.galleryPreview}>

{existingGallery.map((img,index)=>(
<div key={index} className={styles.galleryItem}>

<img src={img}/>

<button
type="button"
className={styles.deleteBtn}
onClick={()=>removeGalleryImage(index)}
>
✕
</button>

</div>
))}

</div>

<input
type="file"
multiple
className={styles.fileInput}
onChange={(e)=>setGalleryFiles([...e.target.files])}
/>

<input
type="file"
accept="application/pdf"
className={styles.fileInput}
onChange={(e)=>setBrochureFile(e.target.files[0])}
/>

</div>

)}

</div>

<button className={styles.button}>
Update Property
</button>

</form>

</div>

);

}