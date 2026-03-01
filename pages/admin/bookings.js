import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/router";

export default function AdminBookings() {

  const router = useRouter();

  const [bookings, setBookings] = useState([]);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {

    checkUser();

  }, []);

  async function checkUser() {

    const { data } = await supabase.auth.getUser();

    if (!data.user) {

      router.push("/login");

      return;
    }

    fetchBookings();

    setCheckingAuth(false);
  }

  async function fetchBookings() {

    const { data, error } = await supabase
      .from("inspection_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {

      setBookings(data);

    } else {

      console.error(error);

    }
  }

  async function deleteBooking(id) {

    const confirmDelete = confirm(
      "Are you sure you want to delete this inspection request?"
    );

    if (!confirmDelete) return;

    await supabase
      .from("inspection_requests")
      .delete()
      .eq("id", id);

    fetchBookings();
  }

  if (checkingAuth) {

    return (
      <div className="p-10 text-xl">
        Checking authentication...
      </div>
    );
  }

  return (

    <div className="max-w-6xl mx-auto p-10">

      <h1 className="text-3xl font-bold mb-6">
        Inspection Requests
      </h1>

      <div className="space-y-4">

        {bookings.length === 0 && (

          <p>No inspection requests yet.</p>

        )}

        {bookings.map((booking) => (

          <div
            key={booking.id}
            className="bg-white shadow p-6 rounded-xl"
          >

            <p>
              <strong>Name:</strong> {booking.name}
            </p>

            <p>
              <strong>Email:</strong> {booking.email}
            </p>

            <p>
              <strong>Phone:</strong> {booking.phone}
            </p>

            <p>
              <strong>Message:</strong> {booking.message}
            </p>

            <p>
              <strong>Status:</strong> {booking.status}
            </p>

            <p className="text-gray-500 text-sm mb-3">
              {new Date(booking.created_at).toLocaleString()}
            </p>

            <button
              onClick={() => deleteBooking(booking.id)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              Delete Request
            </button>

          </div>

        ))}

      </div>

    </div>

  );
}