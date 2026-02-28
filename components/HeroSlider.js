"use client";

import Link from "next/link";

export default function HeroSlider() {
  return (
    <section
      className="relative h-[90vh] flex items-center justify-center text-white"
      style={{
        backgroundImage:
          "url('/images/luxury-villa.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 text-center max-w-4xl px-6">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Redefining Luxury Living in Nigeria
        </h1>

        <p className="text-lg md:text-xl mb-8 text-gray-200">
          Exclusive properties. Strategic investments. Trusted advisory.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            href="/properties"
            className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold transition"
          >
            Explore Properties
          </Link>

          <Link
            href="/contact"
            className="border border-white hover:bg-white hover:text-black px-6 py-3 rounded-lg font-semibold transition"
          >
            Book Private Consultation
          </Link>
        </div>
      </div>
    </section>
  );
}