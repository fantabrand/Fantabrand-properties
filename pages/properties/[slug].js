import { createClient } from "@supabase/supabase-js";
import Layout from "@/components/Layout";
import ContactForm from "@/components/ContactForm";

// Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function PropertyDetailPage({ property }) {
  if (!property) {
    return (
      <Layout>
        <div className="py-20 text-center">
          <h1 className="text-3xl font-bold">Property not found</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="max-w-6xl mx-auto px-6 py-16">

        {/* Image */}
        <div className="mb-8">
          <img
            src={property.image_url || "/placeholder.jpg"}
            alt={property.title}
            className="w-full h-[500px] object-cover rounded-xl"
          />
        </div>

        {/* Details */}
        <h1 className="text-4xl font-bold mb-4">
          {property.title}
        </h1>

        <p className="text-purple-600 text-xl mb-4">
          ₦{property.price?.toLocaleString()}
        </p>

        <p className="text-gray-600 mb-6">
          {property.location}
        </p>

        <p className="text-gray-700 mb-10">
          {property.description}
        </p>

        {/* Contact Form */}
        <ContactForm property={property} />

      </section>
    </Layout>
  );
}


// Fetch property from Supabase
export async function getServerSideProps({ params }) {

  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (error || !data) {
    return {
      props: {
        property: null,
      },
    };
  }

  return {
    props: {
      property: data,
    },
  };
}