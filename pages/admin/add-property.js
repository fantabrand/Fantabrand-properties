import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/router";

export default function AddPropertyPage() {

  const router = useRouter();

  const [checkingAuth, setCheckingAuth] = useState(true);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {

    const { data, error } = await supabase.auth.getUser();

    if (error || !data.user) {
      router.push("/login");
      return;
    }

    setCheckingAuth(false);
  }

  async function handleSubmit(e) {

    e.preventDefault();

    if (!image) {
      alert("Please select an image");
      return;
    }

    const fileName = `${Date.now()}-${image.name}`;

    // Upload image
    const { error: uploadError } = await supabase.storage
      .from("property-images")
      .upload(fileName, image);

    if (uploadError) {
      alert("Image upload failed");
      return;
    }

    // Get public URL
    const { data } = supabase.storage
      .from("property-images")
      .getPublicUrl(fileName);

    const image_url = data.publicUrl;

    // Insert property
    const { error } = await supabase
      .from("properties")
      .insert([
        {
          title,
          price,
          location,
          description,
          image_url,
          gallery: image_url
        },
      ]);

    if (error) {
      alert("Property save failed");
    } else {
      alert("Property uploaded successfully");
      router.push("/admin");
    }
  }

  if (checkingAuth) {
    return (
      <div className="p-10 text-xl">
        Checking authentication...
      </div>
    );
  }

  return (

    <div className="max-w-2xl mx-auto p-10">

      <h1 className="text-3xl font-bold mb-6">
        Add New Property
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          placeholder="Property Title"
          className="w-full border p-3 rounded"
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          placeholder="Price"
          className="w-full border p-3 rounded"
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <input
          placeholder="Location"
          className="w-full border p-3 rounded"
          onChange={(e) => setLocation(e.target.value)}
          required
        />

        <textarea
          placeholder="Description"
          className="w-full border p-3 rounded"
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />

        <button
          className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-3 rounded-lg"
        >
          Upload Property
        </button>

      </form>

    </div>
  );
}