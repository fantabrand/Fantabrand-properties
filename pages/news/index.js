import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase/client";
import AdminLayout from "../../../components/admin/AdminLayout";
import Link from "next/link";

export default function AdminNews(){

  const [news,setNews] = useState([]);

  useEffect(()=>{
    fetchNews();
  },[]);

  async function fetchNews(){

    const { data } = await supabase
      .from("news")
      .select("*")
      .order("created_at",{ascending:false});

    setNews(data || []);

  }

  async function deletePost(id){

    const confirmDelete = confirm("Delete article?");

    if(!confirmDelete) return;

    await supabase
      .from("news")
      .delete()
      .eq("id",id);

    fetchNews();

  }

  return(

    <AdminLayout>

      <h1>Manage News</h1>

      <Link href="/admin/news/new">
        <button>Create Article</button>
      </Link>

      <br/><br/>

      {news.map(post=>(
        <div key={post.id} style={{
          background:"#111",
          padding:"20px",
          borderRadius:"10px",
          marginBottom:"15px"
        }}>

          <h3>{post.title}</h3>

          <p style={{opacity:0.7}}>
            {post.slug}
          </p>

          <Link href={`/news/${post.slug}`}>
            View
          </Link>

          {" | "}

          <button
            onClick={()=>deletePost(post.id)}
            style={{color:"red"}}
          >
            Delete
          </button>

        </div>
      ))}

    </AdminLayout>

  )

}