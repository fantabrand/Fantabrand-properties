import "../styles/globals.css";
import { Raleway } from "next/font/google";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ExecutiveChat from "../components/ExecutiveChat";
import WhatsAppFloat from "../components/WhatsAppFloat";
import { useRouter } from "next/router";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-raleway",
});

export default function App({ Component, pageProps }) {

  const router = useRouter();

  // Hide layout & assistant on admin routes
  const isAdminRoute = router.pathname.startsWith("/admin");

  return (
    <main
      className={raleway.variable}
      style={{ fontFamily: "var(--font-raleway)" }}
    >

      {/* Navbar (Hidden on admin) */}
      {!isAdminRoute && <Navbar />}

      {/* Page Content */}
      <Component {...pageProps} />

      {/* Footer (Hidden on admin) */}
      {!isAdminRoute && <Footer />}

      {/* Global Floating Features (Hidden on admin) */}
      {!isAdminRoute && <ExecutiveChat />}
      {!isAdminRoute && <WhatsAppFloat />}

    </main>
  );
}