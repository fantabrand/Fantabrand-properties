import { useState } from "react";
import { supabase } from "../../../lib/supabase/client";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import AdminLayout from "../../../components/admin/AdminLayout";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function AddNews() {

  const router = useRouter();

  const [title,setTitle] = useState("");
  const [slug,setSlug] = useState("");
  const [excerpt,setExcerpt] = useState("");
  const [content,setContent] = useState("");
  const [image_url,setImage] = useState("");

  const [metaTitle,setMetaTitle] = useState("");
  const [metaDescription,setMetaDescription] = useState("");

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  function generateSlug(text){

    const slug = text
      .toLowerCase()
      .replace(/[^\w ]+/g,"")
      .replace(/ +/g,"-");

    setSlug(slug);

  }

  async function handleImageUpload(e){

    const file = e.target.files[0];
    if(!file) return;

    const fileName = `${uuidv4()}-${file.name}`;

    const { error } = await supabase.storage
      .from("news-images")
      .upload(fileName,file);

    if(error){
      alert("Image upload failed");
      console.log(error);
      return;
    }

    const { data } = supabase.storage
      .from("news-images")
      .getPublicUrl(fileName);

    setImage(data.publicUrl);

  }

  async function createPost(e){

    e.preventDefault();

    const { error } = await supabase
      .from("news")
      .insert([
        {
          title,
          slug,
          excerpt,
          content,
          image_url,
          meta_title: metaTitle,
          meta_description: metaDescription,
          category:"news",
          author:"Fantabrand Properties"
        }
      ]);

    if (error) {
      console.log(error);
      alert(error.message);
      return;
    }

    router.push("/admin/news");

  }

  const inputStyle = {
    width:"100%",
    padding:"12px",
    borderRadius:"8px",
    border:"1px solid #ddd",
    marginBottom:"15px",
    fontSize:"14px"
  };

  return (

    <AdminLayout>

      <div
        style={{
          maxWidth:"850px",
          margin:"auto",
          background:"#fff",
          padding:"40px",
          borderRadius:"14px",
          boxShadow:"0 10px 25px rgba(0,0,0,0.08)"
        }}
      >

        <h1 style={{marginBottom:"30px"}}>
          Create News Article
        </h1>

        <form onSubmit={createPost}>

          <input
            style={inputStyle}
            placeholder="Article Title"
            value={title}
            onChange={(e)=>{
              setTitle(e.target.value);
              generateSlug(e.target.value);
            }}
            required
          />

          <input
            style={inputStyle}
            placeholder="Slug"
            value={slug}
            readOnly
          />

          <div style={{marginBottom:"20px"}}>

            <input
              type="file"
              onChange={handleImageUpload}
            />

            {image_url && (
              <img
                src={image_url}
                style={{
                  width:"100%",
                  marginTop:"15px",
                  borderRadius:"10px"
                }}
              />
            )}

          </div>

          <textarea
            style={inputStyle}
            rows="3"
            placeholder="Short excerpt (used on blog list page)"
            value={excerpt}
            onChange={(e)=>setExcerpt(e.target.value)}
          />

          {/* Editor Toolbar */}

          {editor && (
            <div style={{marginBottom:"10px"}}>

              <button type="button" onClick={()=>editor.chain().focus().toggleBold().run()}>
                Bold
              </button>

              <button type="button" onClick={()=>editor.chain().focus().toggleHeading({ level: 2 }).run()}>
                H2
              </button>

              <button type="button" onClick={()=>editor.chain().focus().toggleBulletList().run()}>
                Bullet List
              </button>

            </div>
          )}

          {/* Rich Text Editor */}

          <div
  style={{
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "15px",
    minHeight: "220px",
    background: "#ffffff",
    color: "#111",
    fontSize: "15px",
    lineHeight: "1.7"
  }}
>
  <EditorContent editor={editor} />
</div>

          <h3 style={{marginBottom:"10px"}}>
            SEO Settings
          </h3>

          <input
            style={inputStyle}
            placeholder="SEO Meta Title"
            value={metaTitle}
            onChange={(e)=>setMetaTitle(e.target.value)}
          />

          <textarea
            style={inputStyle}
            rows="3"
            placeholder="SEO Meta Description"
            value={metaDescription}
            onChange={(e)=>setMetaDescription(e.target.value)}
          />

          <button
            type="submit"
            style={{
              background:"#7c3aed",
              color:"#fff",
              border:"none",
              padding:"14px 26px",
              borderRadius:"8px",
              fontWeight:"600",
              cursor:"pointer",
              fontSize:"15px"
            }}
          >
            Publish Article
          </button>

        </form>

      </div>

    </AdminLayout>

  );

}