"use client";

import { useEffect, useState } from "react";
import supabase from "@/lib/supabase";
import { useRouter, useParams } from "next/navigation";

export default function EditProperty() {

  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProperty();
  }, []);

  async function fetchProperty() {

    const { data } = await supabase
      .from("properties")
      .select("*")
      .eq("id", id)
      .single();

    if (data) {

      setTitle(data.title);
      setPrice(data.price);
      setLocation(data.location);
      setDescription(data.description);

    }
  }

  async function handleUpdate(e) {

    e.preventDefault();

    setLoading(true);

    const { error } = await supabase
      .from("properties")
      .update({
        title,
        price,
        location,
        description
      })
      .eq("id", id);

    if (error) {
      alert("Update failed");
      setLoading(false);
      return;
    }

    alert("Updated successfully");

    router.push("/admin/properties");
  }

  return (
    <div>

      <h1>Edit Property</h1>

      <form onSubmit={handleUpdate}>

        <input
          value={title}
          onChange={e =>
            setTitle(e.target.value)
          }
        />

        <br /><br />

        <input
          value={price}
          onChange={e =>
            setPrice(e.target.value)
          }
        />

        <br /><br />

        <input
          value={location}
          onChange={e =>
            setLocation(e.target.value)
          }
        />

        <br /><br />

        <textarea
          value={description}
          onChange={e =>
            setDescription(e.target.value)
          }
        />

        <br /><br />

        <button disabled={loading}>
          {loading
            ? "Updating..."
            : "Update Property"}
        </button>

      </form>

    </div>
  );
}
