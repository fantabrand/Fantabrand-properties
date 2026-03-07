import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function NewsDetails() {

  const router = useRouter();
  const { slug } = router.query;

  const [item, setItem] = useState(null);

  useEffect(() => {
    if (slug) fetchNews();
  }, [slug]);

  async function fetchNews() {

    const { data, error } = await supabase
      .from("news")
      .select("*")
      .eq("slug", slug)
      .single();

    if (!error) {
      setItem(data);
    }

  }

  if (!item) {
    return <div style={{ padding: "40px" }}>Loading...</div>;
  }

  return (

    <div style={{
      maxWidth: "800px",
      margin: "auto",
      padding: "40px 20px"
    }}>

      {item.image_url && (

        <img
          src={item.image_url}
          style={{
            width: "100%",
            borderRadius: "12px",
            marginBottom: "20px"
          }}
        />

      )}

      <div style={{ color: "#666", marginBottom: "10px" }}>
        {new Date(item.created_at).toDateString()}
      </div>

      <h1 style={{
        fontSize: "32px",
        fontWeight: "bold",
        marginBottom: "20px"
      }}>
        {item.title}
      </h1>

      <div style={{
        lineHeight: "1.8",
        fontSize: "16px"
      }}>
        {item.content}
      </div>

    </div>

  );

}