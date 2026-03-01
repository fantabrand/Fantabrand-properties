"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function AdminNewsPage() {

  const [news, setNews] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("news");

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchNews();
  }, []);

  /* ================= FETCH NEWS ================= */

  async function fetchNews() {

    const { data, error } = await supabase
      .from("news")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setNews(data);
    }
  }

  /* ================= IMAGE UPLOAD ================= */

  async function handleImageUpload(e) {

    const file = e.target.files[0];

    if (!file) return;

    setUploading(true);

    const fileName = Date.now() + "-" + file.name;

    const { error } = await supabase.storage
      .from("news-images")
      .upload(fileName, file);

    if (error) {
      alert("Upload failed: " + error.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage
      .from("news-images")
      .getPublicUrl(fileName);

    setImage(data.publicUrl);

    setUploading(false);
  }

  /* ================= RESET FORM ================= */

  function resetForm() {

    setTitle("");
    setContent("");
    setImage("");
    setCategory("news");
    setEditingId(null);
  }

  /* ================= SUBMIT ================= */

  async function handleSubmit(e) {

    e.preventDefault();

    setLoading(true);
    setMessage("");

    if (editingId) {

      const { error } = await supabase
        .from("news")
        .update({
          title,
          content,
          image,
          category
        })
        .eq("id", editingId);

      if (error) {
        setMessage(error.message);
      } else {
        setMessage("Post updated successfully");
      }

    } else {

      const { error } = await supabase
        .from("news")
        .insert([{
          title,
          content,
          image,
          category,
          author: "Fantabrand Properties"
        }]);

      if (error) {
        setMessage(error.message);
      } else {
        setMessage("Post published successfully");
      }
    }

    setLoading(false);

    resetForm();

    fetchNews();
  }

  /* ================= EDIT ================= */

  function handleEdit(item) {

    setEditingId(item.id);
    setTitle(item.title);
    setContent(item.content);
    setImage(item.image || "");
    setCategory(item.category || "news");

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ================= DELETE ================= */

  async function handleDelete(id) {

    const confirmDelete = confirm("Delete this post?");

    if (!confirmDelete) return;

    await supabase
      .from("news")
      .delete()
      .eq("id", id);

    fetchNews();
  }

  return (

    <div style={styles.container}>

      <h1 style={styles.heading}>
        Manage News & Updates
      </h1>

      {/* FORM */}

      <form onSubmit={handleSubmit} style={styles.form}>

        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={styles.input}
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows="5"
          style={styles.input}
        />

        {/* IMAGE UPLOAD */}

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={styles.input}
        />

        {uploading && (
          <p>Uploading image...</p>
        )}

        {image && (
          <img
            src={image}
            style={styles.preview}
          />
        )}

        {/* CATEGORY */}

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={styles.input}
        >
          <option value="news">News</option>
          <option value="greeting">Greeting</option>
          <option value="allocation">Allocation</option>
          <option value="ambassador">Ambassador</option>
          <option value="announcement">Announcement</option>
        </select>

        <button
          type="submit"
          disabled={loading || uploading}
          style={styles.button}
        >
          {loading
            ? "Saving..."
            : editingId
            ? "Update Post"
            : "Publish Post"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={resetForm}
            style={styles.cancel}
          >
            Cancel Edit
          </button>
        )}

        {message && (
          <p style={styles.message}>
            {message}
          </p>
        )}

      </form>

      {/* POSTS LIST */}

      <div style={{ marginTop: "50px" }}>

        <h2>All Posts</h2>

        {news.map(item => (

          <div key={item.id} style={styles.card}>

            <div>

              <strong>{item.title}</strong>

              <p style={styles.meta}>
                {new Date(item.created_at).toDateString()} | {item.category}
              </p>

            </div>

            <div style={{ display: "flex", gap: "10px" }}>

              <button
                onClick={() => handleEdit(item)}
                style={styles.edit}
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(item.id)}
                style={styles.delete}
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}


/* ================= STYLES ================= */

const styles = {

  container: {
    maxWidth: "900px",
    margin: "auto",
    padding: "40px 20px"
  },

  heading: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "20px"
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },

  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd"
  },

  button: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(135deg,#6a0dad,#c77dff)",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer"
  },

  cancel: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    background: "#f3f3f3",
    cursor: "pointer"
  },

  preview: {
    width: "200px",
    borderRadius: "10px"
  },

  message: {
    color: "green"
  },

  card: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px",
    border: "1px solid #eee",
    borderRadius: "10px",
    marginTop: "10px"
  },

  meta: {
    fontSize: "13px",
    color: "#666"
  },

  edit: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer"
  },

  delete: {
    background: "#dc2626",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer"
  }

};