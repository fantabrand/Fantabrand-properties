import { useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function AddProperty() {

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!image) {
      alert("Please select an image");
      return;
    }

    setLoading(true);

    try {

      const fileName = `${Date.now()}-${image.name}`;

      // Upload image to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("property-images")
        .upload(fileName, image);

      if (uploadError) {
        console.error(uploadError);
        alert("Image upload failed");
        setLoading(false);
        return;
      }

      // Get public URL
      const { data } = supabase.storage
        .from("property-images")
        .getPublicUrl(fileName);

      const image_url = data.publicUrl;

      // Insert property into database
      const { error: dbError } = await supabase
        .from("properties")
        .insert([
          {
            title,
            price,
            location,
            description,
            image_url,
          },
        ]);

      if (dbError) {
        console.error(dbError);
        alert("Database insert failed");
        setLoading(false);
        return;
      }

      alert("Property uploaded successfully!");

      // Reset form
      setTitle("");
      setPrice("");
      setLocation("");
      setDescription("");
      setImage(null);

    } catch (error) {
      console.error(error);
      alert("Unexpected error occurred");
    }

    setLoading(false);
  }

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto" }}>
      <h1>Add Property</h1>

      <form onSubmit={handleSubmit}>

        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br /><br />

        <input
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <br /><br />

        <input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <br /><br />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br /><br />

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
        <br /><br />

        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload Property"}
        </button>

      </form>
    </div>
  );
}