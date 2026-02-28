import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata = {
  title: "Fantabrand Properties",
  description: "Luxury real estate investments in Nigeria",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">

      <body>

        {/* Navigation */}
        <Navbar />

        {/* Page Content */}
        {children}

        {/* Footer */}
        <Footer />

        {/* Floating WhatsApp Button */}
        <WhatsAppButton />

      </body>

    </html>
  );

}
