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

    if(error){
      alert("Error publishing article");
      console.log(error);
      return;
    }

    router.push("/admin/news");

  }

  return (

    <AdminLayout>

      <h1>Create News Article</h1>

      <form onSubmit={createPost}>

        <input
          placeholder="Title"
          value={title}
          onChange={(e)=>{
            setTitle(e.target.value);
            generateSlug(e.target.value);
          }}
          required
        />

        <br/><br/>

        <input
          placeholder="Slug"
          value={slug}
          readOnly
        />

        <br/><br/>

        <input
          type="file"
          onChange={handleImageUpload}
        />

        <br/><br/>

        <textarea
          placeholder="Excerpt"
          value={excerpt}
          onChange={(e)=>setExcerpt(e.target.value)}
        />

        <br/><br/>

        <div style={{border:"1px solid #ccc", padding:"10px", minHeight:"200px"}}>
          <EditorContent editor={editor} />
        </div>

        <br/><br/>

        <input
          placeholder="SEO Meta Title"
          value={metaTitle}
          onChange={(e)=>setMetaTitle(e.target.value)}
        />

        <br/><br/>

        <textarea
          placeholder="SEO Meta Description"
          value={metaDescription}
          onChange={(e)=>setMetaDescription(e.target.value)}
        />

        <br/><br/>

        <button type="submit">
          Publish Article
        </button>

      </form>

    </AdminLayout>

  );

}