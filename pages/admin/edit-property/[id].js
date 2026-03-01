import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function EditProperty() {

  const router = useRouter();
  const { id } = router.query;

  const [checkingAuth, setCheckingAuth] = useState(true);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState("");

  useEffect(() => {

    if (id) {
      checkUser();
      fetchProperty();
    }

  }, [id]);

  async function checkUser() {

    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      router.push("/login");
      return;
    }

    setCheckingAuth(false);
  }

  async function fetchProperty() {

    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .eq("id", id)
      .single();

    if (!error) {

      setTitle(data.title);
      setPrice(data.price);
      setLocation(data.location);
      setDescription(data.description);
      setExistingImage(data.image_url);

    }
  }

  async function handleUpdate(e) {

    e.preventDefault();

    let image_url = existingImage;

    // Upload new image if selected
    if (image) {

      const fileName = `${Date.now()}-${image.name}`;

      const { error: uploadError } = await supabase.storage
        .from("property-images")
        .upload(fileName, image);

      if (uploadError) {
        alert("Image upload failed");
        return;
      }

      const { data } = supabase.storage
        .from("property-images")
        .getPublicUrl(fileName);

      image_url = data.publicUrl;
    }

    // Update database
    const { error } = await supabase
      .from("properties")
      .update({
        title,
        price,
        location,
        description,
        image_url,
        gallery: image_url
      })
      .eq("id", id);

    if (!error) {

      alert("Property updated successfully");

      router.push("/admin");

    } else {

      alert("Update failed");

    }
  }

  if (checkingAuth) {
    return <div className="p-10">Checking authentication...</div>;
  }

  return (

    <div className="max-w-2xl mx-auto p-10">

      <h1 className="text-3xl font-bold mb-6">
        Edit Property
      </h1>

      <form onSubmit={handleUpdate} className="space-y-4">

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-3 rounded"
          required
        />

        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border p-3 rounded"
          required
        />

        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border p-3 rounded"
          required
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-3 rounded"
        />

        {/* Existing Image */}
        <div>

          <p className="mb-2 font-semibold">Current Image:</p>

          <img
            src={existingImage}
            className="w-full h-48 object-cover rounded"
          />

        </div>

        {/* New Image */}
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button
          className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-3 rounded-lg"
        >
          Update Property
        </button>

      </form>

    </div>
  );
}