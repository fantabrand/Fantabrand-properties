"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export default function PropertyCard({ property }) {

  const supabase = createClient();

  if (!property) return null;

  const [imgSrc, setImgSrc] = useState(
    property.image_url &&
    property.image_url !== "" &&
    property.image_url !== "null"
      ? property.image_url
      : "/placeholder.jpg"
  );

  const [user, setUser] = useState(null);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const price =
    property.price && !isNaN(property.price)
      ? Number(property.price).toLocaleString()
      : "0";

  const title = property.title || "Untitled Property";
  const location = property.location || "No location";


  /* ================= GET USER ================= */

  useEffect(() => {

    async function getUser() {

      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);

      if (user) checkIfSaved(user.id);
    }

    getUser();

  }, []);


  /* ================= CHECK SAVED ================= */

  async function checkIfSaved(userId) {

    const { data } = await supabase
      .from("saved_properties")
      .select("id")
      .eq("user_id", userId)
      .eq("property_id", property.id)
      .maybeSingle();

    setSaved(!!data);
  }


  /* ================= SAVE / UNSAVE ================= */

  async function toggleSave(e) {

    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      alert("Please login to save properties");
      return;
    }

    setLoading(true);

    if (saved) {

      await supabase
        .from("saved_properties")
        .delete()
        .eq("user_id", user.id)
        .eq("property_id", property.id);

      setSaved(false);

    } else {

      await supabase
        .from("saved_properties")
        .insert({
          user_id: user.id,
          property_id: property.id,
        });

      setSaved(true);
    }

    setLoading(false);
  }


  return (
    <Link href={`/properties/${property.id}`}>

      <div className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer">

        {/* Image Container */}
        <div className="relative h-64 w-full bg-gray-200">

          <Image
            src={imgSrc}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            unoptimized
            onError={() => setImgSrc("/placeholder.jpg")}
          />

          {/* Price Badge */}
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-4 py-2 rounded-xl font-semibold text-purple-600 shadow">
            ₦{price}
          </div>


          {/* SAVE BUTTON ❤️ */}
          <button
            onClick={toggleSave}
            disabled={loading}
            className="absolute top-4 left-4 bg-white/95 backdrop-blur rounded-full w-10 h-10 flex items-center justify-center shadow hover:scale-110 transition"
          >
            {saved ? (
              <span className="text-red-500 text-lg">❤️</span>
            ) : (
              <span className="text-gray-400 text-lg">🤍</span>
            )}
          </button>

        </div>


        {/* Content */}
        <div className="p-5">

          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
            {title}
          </h3>

          <p className="text-gray-500 text-sm mt-2">
            📍 {location}
          </p>

        </div>

      </div>

    </Link>
  );
}