export default function Features() {
  return (
    <section id="services" className="max-w-6xl mx-auto py-20 px-4">
      <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="p-6 border rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-bold mb-2">Property Sales</h3>
          <p className="text-gray-600">
            Explore a wide range of premium properties across Nigeria.
          </p>
        </div>

        <div className="p-6 border rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-bold mb-2">Construction</h3>
          <p className="text-gray-600">
            High-end luxury construction services built to global standards.
          </p>
        </div>

        <div className="p-6 border rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-bold mb-2">Property Investment</h3>
          <p className="text-gray-600">
            Secure, high-ROI real estate investment opportunities.
          </p>
        </div>
      </div>
    </section>
  );
}
