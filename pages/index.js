import HeroSlider from "@/components/HeroSlider";
import PropertyGrid from "@/components/PropertyGrid";
import properties from "@/data/properties";

export default function Home() {
  return (
    <>
      <HeroSlider />

      <PropertyGrid
        properties={properties}
        title="Featured Properties"
        subtitle="Exclusive luxury listings curated for you"
      />
    </>
  );
}