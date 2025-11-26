export default function Navbar() {
  return (
    <header className="w-full fixed top-0 left-0 bg-white shadow z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        <h1 className="text-xl font-bold">Fantabrand Properties</h1>
        <nav className="hidden md:flex space-x-6 text-gray-700">
          <a href="#about" className="hover:text-blue-600 transition">About</a>
          <a href="#services" className="hover:text-blue-600 transition">Services</a>
          <a href="#properties" className="hover:text-blue-600 transition">Properties</a>
          <a href="#contact" className="hover:text-blue-600 transition">Contact</a>
        </nav>
      </div>
    </header>
  );
}
