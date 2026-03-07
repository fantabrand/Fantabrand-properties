import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import Link from "next/link";

export default function NewsPage(){

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

  return(

    <div style={{
      maxWidth:"1200px",
      margin:"auto",
      padding:"60px 20px"
    }}>

      <h1 style={{
        fontSize:"36px",
        marginBottom:"40px"
      }}>
        Latest News
      </h1>

      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",
        gap:"30px"
      }}>

        {news.map(post=>(

          <Link
            key={post.id}
            href={`/news/${post.slug}`}
            style={{textDecoration:"none"}}
          >

            <div style={{
              background:"#fff",
              borderRadius:"14px",
              overflow:"hidden",
              boxShadow:"0 10px 25px rgba(0,0,0,0.08)",
              transition:"0.3s"
            }}>

              {post.image_url && (

                <img
                  src={post.image_url}
                  style={{
                    width:"100%",
                    height:"200px",
                    objectFit:"cover"
                  }}
                />

              )}

              <div style={{padding:"20px"}}>

                <div style={{
                  fontSize:"13px",
                  color:"#777",
                  marginBottom:"10px"
                }}>
                  {new Date(post.created_at).toDateString()}
                </div>

                <h2 style={{
                  fontSize:"20px",
                  marginBottom:"10px",
                  color:"#111"
                }}>
                  {post.title}
                </h2>

                <p style={{
                  color:"#555",
                  fontSize:"14px",
                  lineHeight:"1.6"
                }}>
                  {post.excerpt}
                </p>

                <div style={{
                  marginTop:"15px",
                  fontWeight:"bold",
                  color:"#7c3aed"
                }}>
                  Read More →
                </div>

              </div>

            </div>

          </Link>

        ))}

      </div>

    </div>

  )

}