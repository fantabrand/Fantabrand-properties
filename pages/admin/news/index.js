import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase/client";
import AdminLayout from "../../../components/admin/AdminLayout";
import Link from "next/link";

export default function AdminNews() {

  const [news, setNews] = useState([]);

  useEffect(() => {
    fetchNews();
  }, []);

  async function fetchNews() {

    const { data } = await supabase
      .from("news")
      .select("*")
      .order("created_at", { ascending: false });

    setNews(data || []);

  }

  async function deletePost(id) {

    const confirmDelete = confirm("Delete this article?");

    if (!confirmDelete) return;

    await supabase
      .from("news")
      .delete()
      .eq("id", id);

    fetchNews();

  }

  return (

    <AdminLayout>

      <h1>Manage News</h1>

      <Link href="/admin/news/new">
        <button>Create New Article</button>
      </Link>

      <br /><br />

      {news.map(post => (

        <div key={post.id} style={{ marginBottom: "25px" }}>

          <h3>{post.title}</h3>

          <Link href={`/news/${post.slug}`}>
            View
          </Link>

          {" | "}

          <button
            onClick={() => deletePost(post.id)}
          >
            Delete
          </button>

        </div>

      ))}

    </AdminLayout>

  );

}