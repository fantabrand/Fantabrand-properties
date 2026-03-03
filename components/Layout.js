import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Layout({ children }) {

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };

  }, []);

  return (
    <>
      <Navbar />

      {/* Luxury Loading Bar */}
      <div className={`luxury-loader ${loading ? "active" : ""}`} />

      <main className="page-content">
        {children}
      </main>

      <Footer />

      <style jsx global>{`

        /* ===== LUXURY TOP LOADING BAR ===== */

        .luxury-loader {
          position: fixed;
          top: 0;
          left: 0;
          height: 3px;
          width: 0%;
          background: linear-gradient(90deg, #a855f7, #6d28d9);
          z-index: 3000;
          transition: width 0.4s ease, opacity 0.4s ease;
          opacity: 0;
        }

        .luxury-loader.active {
          width: 100%;
          opacity: 1;
        }

        /* ===== PAGE FADE TRANSITION ===== */

        .page-content {
          animation: fadeIn 0.6s ease;
          min-height: 100vh;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

      `}</style>
    </>
  );
}