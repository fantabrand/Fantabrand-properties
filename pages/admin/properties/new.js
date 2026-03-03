import { useState } from "react";
import { supabase } from "../../../lib/supabase/client";
import AdminLayout from "../../../components/admin/AdminLayout";
import styles from "../../../styles/AdminForm.module.css";
import { useRouter } from "next/router";

export default function NewProperty() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    let imageUrl = "";

    if (imageFile) {
      const fileName = `${Date.now()}-${imageFile.name}`;

      const { error: uploadError } = await supabase.storage
        .from("properties")
        .upload(fileName, imageFile);

      if (uploadError) {
        alert("Image upload failed");
        setLoading(false);
        return;
      }

      const { data } = supabase.storage
        .from("properties")
        .getPublicUrl(fileName);

      imageUrl = data.publicUrl;
    }

    const { error } = await supabase.from("properties").insert([
      {
        title,
        price,
        location,
        description,
        image_url: imageUrl,
      },
    ]);

    setLoading(false);

    if (!error) {
      router.push("/admin/properties");
    } else {
      alert("Error adding property");
    }
  }

  return (
    <AdminLayout>
      <h1>Add New Property</h1>

      <form onSubmit={handleSubmit} className={styles.form}>

        <input
          type="text"
          placeholder="Property Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />

        <textarea
          placeholder="Property Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="5"
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Add Property"}
        </button>

      </form>
    </AdminLayout>
  );
}