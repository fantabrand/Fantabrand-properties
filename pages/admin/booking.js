import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase/client";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setBookings(data);
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Bookings</h1>

      {bookings.map((b) => (
        <div
          key={b.id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "10px",
          }}
        >
          <p><strong>Name:</strong> {b.name}</p>
          <p><strong>Phone:</strong> {b.phone}</p>
          <p><strong>Email:</strong> {b.email}</p>
          <p><strong>Property:</strong> {b.property}</p>
          <p><strong>Size:</strong> {b.size}</p>
        </div>
      ))}
    </div>
  );
}