import { useState } from "react";
import { supabase } from "../../../lib/supabase/client";
import AdminLayout from "../../../components/admin/AdminLayout";
import styles from "../../../styles/AdminForm.module.css";

export default function AddProperty() {

  const [form, setForm] = useState({
    title: "",
    price: "",
    location: "",
    image_url: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();

    await supabase.from("properties").insert([form]);

    alert("Property added successfully");
  }

  return (
    <AdminLayout>

      <h1>Add New Property</h1>

      <form onSubmit={handleSubmit} className={styles.form}>

        <input
          placeholder="Title"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          placeholder="Price"
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <input
          placeholder="Location"
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />

        <input
          placeholder="Image URL"
          onChange={(e) => setForm({ ...form, image_url: e.target.value })}
        />

        <button type="submit">Add Property</button>

      </form>

    </AdminLayout>
  );
}