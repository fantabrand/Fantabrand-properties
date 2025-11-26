export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-20">
      <div className="max-w-6xl mx-auto text-center">
        <h3 className="text-xl font-semibold">Fantabrand Properties</h3>
        <p className="text-gray-400 mt-2">Redefining Luxury Living</p>
        <p className="text-gray-500 mt-4 text-sm">
          © {new Date().getFullYear()} Fantabrand Properties. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
