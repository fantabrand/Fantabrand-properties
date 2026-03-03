import Link from "next/link";

export default function PropertyCard({ property }) {
  return (
    <Link href={`/properties/${property.slug}`}>
      
      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition duration-300 cursor-pointer">

        {/* Image */}
        <div className="relative overflow-hidden">
          
          <img
            src={property.image_url}
            alt={property.title}
            className="w-full h-64 object-cover hover:scale-110 transition duration-500"
          />

          {/* Price badge */}
          <div className="absolute bottom-3 left-3 bg-gradient-to-r from-purple-500 to-purple-700 text-white text-sm font-semibold px-3 py-1 rounded-md shadow">
            ₦{property.price?.toLocaleString()}
          </div>

        </div>

        {/* Content */}
        <div className="p-4">

          <h3 className="text-gray-900 text-lg font-semibold">
            {property.title}
          </h3>

          <p className="text-gray-500 text-sm mt-1">
            {property.location}
          </p>

        </div>

      </div>

    </Link>
  );
}