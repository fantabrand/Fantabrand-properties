export default function Hero() {
  return (
    <section
      className="w-full h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/hero.jpg')" }}
    >
      <div className="bg-black/40 p-10 rounded-xl text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold">
          Redefining Luxury Living
        </h1>
        <p className="mt-4 text-lg max-w-xl mx-auto">
          Buy, sell, and invest in premium real estate with Fantabrand Properties.
        </p>
      </div>
    </section>
  );
}
