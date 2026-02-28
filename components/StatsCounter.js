"use client";

import { useEffect, useState } from "react";

export default function StatsCounter() {

  const stats = [
    {
      icon: "🏡",
      value: 120,
      label: "Plots Sold"
    },
    {
      icon: "😊",
      value: 70,
      label: "Happy Clients"
    },
    {
      icon: "📍",
      value: 5,
      label: "Prime Locations"
    },
    {
      icon: "⭐",
      value: 4,
      label: "Years Experience"
    }
  ];

  const [counts, setCounts] = useState(
    stats.map(() => 0)
  );

  useEffect(() => {

    const interval = setInterval(() => {

      setCounts((prev) =>
        prev.map((count, i) => {

          if (count < stats[i].value) {
            return count + 1;
          }

          return count;

        })
      );

    }, 25);

    return () => clearInterval(interval);

  }, []);

  return (
    <div className="w-full flex justify-center -mt-5 relative z-12">

      <div className="flex gap-2">

        {stats.map((stat, i) => (

          <div
            key={i}
            className="
              backdrop-blur-md
              bg-white/15
              border border-white/10
              rounded-xl
              shadow-lg
              px-6 py-4
              text-center
              w-40
              transition-all duration-300
              hover:scale-105
            "
          >

            
        

            {/* Counter */}
            <div className="text-xl font-bold text-white-700">
              {counts[i]}+
            </div>

            {/* Label */}
            <div className="text-xs text-white-800">
              {stat.label}
            </div>

          </div>

        ))}

      </div>

    </div>
  );

}
