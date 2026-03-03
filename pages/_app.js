import "../styles/globals.css";
import { Raleway } from "next/font/google";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useRouter } from "next/router";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-raleway",
});

export default function App({ Component, pageProps }) {

  const router = useRouter();

  // Check if route starts with /admin
  const isAdminRoute = router.pathname.startsWith("/admin");

  return (
    <main
      className={raleway.variable}
      style={{ fontFamily: "var(--font-raleway)" }}
    >

      {/* Only show Navbar + Footer if NOT admin */}
      {!isAdminRoute && <Navbar />}

      <Component {...pageProps} />

      {!isAdminRoute && <Footer />}

    </main>
  );
}