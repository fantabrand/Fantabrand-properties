"use client";

import Link from "next/link";

export default function PropertyCard({ property }) {

  return (

    <div className="bg-white rounded-xl shadow-md overflow-hidden">

      <img
        src={property.image_url}
        alt={property.title}
        className="w-full h-64 object-cover"
      />

      <div className="p-4">

        <h2 className="text-xl font-semibold">
          {property.title}
        </h2>

        <p className="text-purple-700 font-bold">
          {property.price}
        </p>

        <p className="text-gray-500">
          {property.location}
        </p>

      </div>

    </div>

  );
}