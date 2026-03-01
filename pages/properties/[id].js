import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function PropertyDetails() {

  const router = useRouter();
  const { id } = router.query;

  const [property, setProperty] = useState(null);

  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (id) {
      fetchProperty();
    }

  }, [id]);

  async function fetchProperty() {

    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .eq("id", id)
      .single();

    if (!error) {

      setProperty(data);

    } else {

      console.error(error);

    }

    setLoading(false);
  }

  async function handleBooking(e) {

    e.preventDefault();

    const { error } = await supabase
      .from("inspection_requests")
      .insert([
        {
          property_id: property.id,
          name: clientName,
          email: clientEmail,
          phone: clientPhone,
          message: message,
          status: "pending"
        }
      ]);

    if (!error) {

      alert("Inspection request submitted successfully!");

      setClientName("");
      setClientEmail("");
      setClientPhone("");
      setMessage("");

    } else {

      alert("Booking failed");

      console.error(error);

    }
  }

  if (loading) {

    return (
      <div className="p-10 text-xl">
        Loading property...
      </div>
    );
  }

  if (!property) {

    return (
      <div className="p-10">
        Property not found
      </div>
    );
  }

  return (

    <div className="max-w-5xl mx-auto p-10">

      {/* IMAGE */}
      <img
        src={property.image_url}
        className="w-full h-96 object-cover rounded-xl mb-6"
      />

      {/* DETAILS */}
      <h1 className="text-4xl font-bold mb-3">
        {property.title}
      </h1>

      <p className="text-purple-700 text-xl font-semibold mb-2">
        ₦{property.price}
      </p>

      <p className="text-gray-600 mb-4">
        {property.location}
      </p>

      <p className="text-gray-700 mb-10">
        {property.description}
      </p>

      {/* BOOKING FORM */}
      <div className="bg-white shadow-lg p-8 rounded-xl">

        <h2 className="text-2xl font-bold mb-6">
          Book Inspection
        </h2>

        <form
          onSubmit={handleBooking}
          className="space-y-4"
        >

          <input
            placeholder="Your Name"
            className="w-full border p-3 rounded"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 rounded"
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
            required
          />

          <input
            placeholder="Phone"
            className="w-full border p-3 rounded"
            value={clientPhone}
            onChange={(e) => setClientPhone(e.target.value)}
            required
          />

          <textarea
            placeholder="Message"
            className="w-full border p-3 rounded"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button
            className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-3 rounded-lg"
          >
            Submit Inspection Request
          </button>

        </form>

      </div>

    </div>

  );
}