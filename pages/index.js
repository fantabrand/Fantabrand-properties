import HeroSlider from "@/components/HeroSlider";
import PropertyGrid from "@/components/PropertyGrid";
import { createClient } from "@supabase/supabase-js";

// Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Home({ properties }) {
  return (
    <>
      <HeroSlider />

      <PropertyGrid properties={properties} />
    </>
  );
}

// Server-side fetch from Supabase
export async function getServerSideProps() {
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase fetch error:", error);
    return {
      props: {
        properties: [],
      },
    };
  }

  return {
    props: {
      properties: data || [],
    },
  };
}