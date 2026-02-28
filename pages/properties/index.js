import Layout from "@/components/Layout";
import PropertyGrid from "@/components/PropertyGrid";
import { properties } from "@/data/properties";

export default function PropertiesPage() {
  return (
    <Layout title="Properties">
      <PropertyGrid
        properties={properties}
        title="Available listings"
        subtitle="Explore our current selection of completed and off-plan homes across key Nigerian cities."
      />
    </Layout>
  );
}
