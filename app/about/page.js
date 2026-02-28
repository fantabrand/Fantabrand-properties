"use client";

import Image from "next/image";

export default function AboutPage() {

  return (

    <main className="min-h-screen bg-white pt-28 pb-20 px-6">

      {/* HEADER */}
      <section className="max-w-6xl mx-auto text-center mb-16">

        <h1 className="text-4xl md:text-5xl font-bold text-purple-700 mb-4">
          Luxury Living Redefined
        </h1>

        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          We help individuals and investors acquire secure, verified, and high-growth real estate assets.
        </p>

      </section>


      {/* ABOUT CONTENT */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-lg">

          <Image
            src="/about.jpg"
            alt="About Fantabrand"
            fill
            className="object-cover"
          />

        </div>

        <div>

          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            Who We Are
          </h2>

          <p className="text-gray-600 mb-4">
            Fantabrand Properties is a trusted real estate company focused on helping clients secure premium land and property investments in high-growth locations.
          </p>

          <p className="text-gray-600 mb-4">
            We provide verified properties, transparent processes, and exceptional customer experience.
          </p>

        </div>

      </section>



      {/* VISION & MISSION */}
      <section className="max-w-6xl mx-auto mt-20 grid md:grid-cols-2 gap-8">

        <div className="bg-purple-50 p-8 rounded-2xl">

          <h3 className="text-2xl font-semibold text-purple-700 mb-3">
            Our Vision
          </h3>

          <p className="text-gray-600">
            To become Africa’s most trusted real estate brand.
          </p>

        </div>


        <div className="bg-purple-50 p-8 rounded-2xl">

          <h3 className="text-2xl font-semibold text-purple-700 mb-3">
            Our Mission
          </h3>

          <p className="text-gray-600">
            To provide secure, verified, and profitable real estate investments.
          </p>

        </div>

      </section>



      {/* TEAM SECTION */}
      <section className="max-w-6xl mx-auto mt-24">

        <div className="mb-12">

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Meet Our Team
          </h2>

          <p className="text-gray-600 max-w-2xl">
            Our professional team ensures transparency, trust, and excellent service delivery.
          </p>

        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">


          <div className="group">

            <div className="relative w-full h-[280px] rounded-xl overflow-hidden mb-4">

              <img
                src="/team1.jpg"
                className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
              />

            </div>

            <h3 className="font-semibold text-lg text-gray-900">
              Adebayo Emmanuel
            </h3>

            <p className="text-purple-600 text-sm">
              Founder & CEO
            </p>

          </div>



          <div className="group">

            <div className="relative w-full h-[280px] rounded-xl overflow-hidden mb-4">

              <img
                src="/team2.jpg"
                className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
              />

            </div>

            <h3 className="font-semibold text-lg text-gray-900">
              Ayanduro Isaac
            </h3>

            <p className="text-purple-600 text-sm">
              Investment Director
            </p>

          </div>



          <div className="group">

            <div className="relative w-full h-[280px] rounded-xl overflow-hidden mb-4">

              <img
                src="/team3.jpg"
                className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
              />

            </div>

            <h3 className="font-semibold text-lg text-gray-900">
              Adebayo Taiwo
            </h3>

            <p className="text-purple-600 text-sm">
              Inspection Manager
            </p>

          </div>



          <div className="group">

            <div className="relative w-full h-[280px] rounded-xl overflow-hidden mb-4">

              <img
                src="/team4.jpg"
                className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
              />

            </div>

            <h3 className="font-semibold text-lg text-gray-900">
              Awosemo Ebunlomo
            </h3>

            <p className="text-purple-600 text-sm">
              Client Relations Manager
            </p>

          </div>


        </div>

      </section>


    </main>

  );

}
