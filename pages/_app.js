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

  const isAdminRoute = router.pathname.startsWith("/admin");

  return (
    <div
      className={raleway.variable}
      style={{
        fontFamily: "var(--font-raleway)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Navbar */}
      {!isAdminRoute && <Navbar />}

      {/* Main Content Area */}
      <div style={{ flex: 1 }}>
        <Component {...pageProps} />
      </div>

      {/* Footer */}
      {!isAdminRoute && <Footer />}

      {/* Floating Components */}
      {!isAdminRoute && <ExecutiveChat />}
      {!isAdminRoute && <WhatsAppFloat />}
    </div>
  );
}