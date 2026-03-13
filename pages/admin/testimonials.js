import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase/client";

export default function AdminTestimonials() {

const [testimonials,setTestimonials]=useState([]);
const [name,setName]=useState("");
const [role,setRole]=useState("");
const [text,setText]=useState("");
const [imageFile,setImageFile]=useState(null);
const [loading,setLoading]=useState(false);

useEffect(()=>{
fetchTestimonials();
},[]);

async function fetchTestimonials(){

const {data}=await supabase
.from("testimonials")
.select("*")
.order("created_at",{ascending:false});

setTestimonials(data || []);

}

async function uploadImage(){

if(!imageFile) return null;

const fileName=`testimonial-${Date.now()}-${imageFile.name}`;

const {error}=await supabase.storage
.from("testimonials")
.upload(fileName,imageFile);

if(error){
console.log(error);
return null;
}

const {data}=supabase.storage
.from("testimonials")
.getPublicUrl(fileName);

return data.publicUrl;

}

async function addTestimonial(){

if(!name || !text){
alert("Name and testimonial text required");
return;
}

setLoading(true);

let imageUrl=null;

if(imageFile){
imageUrl=await uploadImage();
}

const {error}=await supabase
.from("testimonials")
.insert([
{
name,
role,
text,
image:imageUrl
}
]);

setLoading(false);

if(error){
alert("Failed to add testimonial");
console.log(error);
}else{

setName("");
setRole("");
setText("");
setImageFile(null);

fetchTestimonials();

}

}

async function deleteTestimonial(id){

if(!confirm("Delete testimonial?")) return;

await supabase
.from("testimonials")
.delete()
.eq("id",id);

fetchTestimonials();

}

return(

<div style={{padding:"40px",maxWidth:"900px",margin:"auto"}}>

<h1 style={{marginBottom:"30px"}}>
Testimonials Manager
</h1>

{/* ADD FORM */}

<div style={{
border:"1px solid #eee",
padding:"25px",
borderRadius:"10px",
marginBottom:"40px"
}}>

<h3>Add Testimonial</h3>

<input
placeholder="Client Name"
value={name}
onChange={(e)=>setName(e.target.value)}
style={inputStyle}
/>

<input
placeholder="Client Role"
value={role}
onChange={(e)=>setRole(e.target.value)}
style={inputStyle}
/>

<textarea
placeholder="Testimonial"
value={text}
onChange={(e)=>setText(e.target.value)}
style={{...inputStyle,height:"120px"}}
/>

<input
type="file"
accept="image/*"
onChange={(e)=>setImageFile(e.target.files[0])}
style={inputStyle}
/>

<button
onClick={addTestimonial}
style={btnStyle}
>
{loading ? "Saving..." : "Add Testimonial"}
</button>

</div>

{/* LIST */}

<h3>Existing Testimonials</h3>

{testimonials.map(t=> (

<div
key={t.id}
style={{
border:"1px solid #eee",
padding:"20px",
borderRadius:"10px",
marginBottom:"15px",
display:"flex",
gap:"15px",
alignItems:"center"
}}
>

{t.image && (

<img
src={t.image}
style={{
width:"60px",
height:"60px",
borderRadius:"50%",
objectFit:"cover"
}}
/>

)}

<div style={{flex:1}}>

<strong>{t.name}</strong>
<div style={{color:"#777"}}>{t.role}</div>

<p style={{marginTop:"5px"}}>
{t.text}
</p>

</div>

<button
onClick={()=>deleteTestimonial(t.id)}
style={deleteBtn}
>
Delete
</button>

</div>

))}

</div>

);

}

/* styles */

const inputStyle={
width:"100%",
padding:"12px",
marginBottom:"10px",
borderRadius:"6px",
border:"1px solid #ccc"
};

const btnStyle={
  background: "linear-gradient(to right, #3aed70, #1b9a27)",
color:"#fff",
padding:"12px 20px",
border:"none",
borderRadius:"8px",
cursor:"pointer"
};

const deleteBtn={
background:"#ef4444",
color:"#fff",
border:"none",
padding:"8px 14px",
borderRadius:"6px",
cursor:"pointer"
};