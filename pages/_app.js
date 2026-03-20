import Head from "next/head";
import "../styles/globals.css";
import "../styles/logo-animation.css";
import { Raleway } from "next/font/google";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ExecutiveChat from "../components/ExecutiveChat";
import NewsletterPopup from "../components/NewsletterPopup";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion"; // ✅ ADDED

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-raleway",
});

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isAdminRoute = router.pathname.startsWith("/admin");
  const isHomePage = router.pathname === "/";

  const [loading, setLoading] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  // 🔥 FIRST VISIT ONLY LOADER (24h reset)
  useEffect(() => {
    if (!isHomePage) return;

    const lastVisit = localStorage.getItem("hasVisited");

    if (!lastVisit || Date.now() - lastVisit > 86400000) {
      setLoading(true);

      setTimeout(() => {
        setFadeOut(true);

        setTimeout(() => {
          setLoading(false);
          localStorage.setItem("hasVisited", Date.now());
        }, 600);
      }, 2200);
    }
  }, [isHomePage]);

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
      <Head>
        <link rel="icon" href="/favicon.png" />
      </Head>

      {/* 🔥 PREMIUM LOADER */}
      {loading && isHomePage && (
        <div
          style={{
            position: "fixed",
            width: "100%",
            height: "100vh",
            background: "#0a0a0a",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            zIndex: 9999,
            opacity: fadeOut ? 0 : 1,
            transform: fadeOut ? "scale(1.05)" : "scale(1)",
            filter: fadeOut ? "blur(6px)" : "blur(0px)",
            transition: "all 0.6s ease",
          }}
        >
          <svg className="logo-svg" viewBox="0 0 904.9 805.81" width="120">
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6a0dad" />
                <stop offset="100%" stopColor="#ff4ecd" />
              </linearGradient>
            </defs>

            <path
              className="path1"
              d="M0.69 805.01l2.53 -4.36c0.98,-1.99 1.53,-3.07 2.52,-5.06 1.83,-3.64 2.99,-6.71 4.82,-10.34 1.75,-3.48 3.09,-6.15 4.82,-9.65 12.82,-25.86 34.13,-59.76 52.99,-81.4l13.79 -15.84c4.81,-5.19 10.08,-10.14 15.16,-15.17 6.54,-6.47 28.05,-20.7 34.98,-24.29 6.73,-3.48 12.54,-6.68 19.99,-9.64 11.68,-4.64 22.5,-7.5 35.43,-9.37 9.63,-1.4 18.3,-1.68 28,-1.64 3.47,0.01 4.61,-0.39 7,-0.63 3.02,-0.3 4.03,0.47 6.76,0.62 18.74,1.03 40.85,-0 59.96,-0 79.49,0 158.97,0 238.46,0 51.34,0 104.65,-9.37 142.37,-36.82 17.74,-12.91 17.12,-13.56 31.82,-28.14 4.88,-4.84 9.21,-10.74 13.37,-16.27 32.52,-43.29 54.02,-107.95 24.93,-156.77 -10.98,-18.43 -28.44,-33.05 -49.23,-39.67 -8.12,-2.58 -16.56,-3.52 -25.61,-4.72 -12.88,-1.7 -18.85,-0.27 -28.04,-0.16l-357.71 0.66c-18.41,0 -35.48,1.37 -52.46,6.81 -29.09,9.31 -53.85,23.17 -75.21,44.71l-7.58 7.59c-1.24,1.35 -6.57,7.18 -7.42,7.75 1.34,-5 18.82,-26.48 23.43,-32.4l10.16 -11.89c1.06,-1.05 1.78,-1.66 2.77,-2.74l13.78 -14.48c-12.69,-12.69 22.12,-20.72 38.04,-30.19 19.64,-11.68 37.34,-20.49 63.95,-25.64 24.17,-4.68 57.87,-3.27 87.02,-3.27 59.96,0 119.92,0 179.88,0 69.67,0 151.21,5.06 210.81,-13.86 11.59,-3.68 21.15,-8.04 31.55,-13.24 20.28,-10.14 36.5,-23.42 51.75,-38.54 3.78,-3.75 6.76,-7.72 10.33,-11.72 8.64,-9.69 20.75,-28.52 26.84,-40.7 1.37,-2.74 2.05,-4.85 3.43,-7.59 1.37,-2.71 2.1,-4.79 3.28,-7.75 6.21,-15.53 10.13,-31.68 10.73,-47.69l0 -8.51c-0.68,-17.84 -5.75,-35.35 -16.66,-51.48l-10.38 -12.36c-31.81,-31.54 -64.09,-29.12 -105.96,-29.12l-113.03 0c-8.18,0 -14.61,0.72 -22.05,0.69 -59.94,-0.22 -119.93,-0 -179.88,-0 -77.82,0 -120.86,-5.95 -183.62,41.06 -22.22,16.64 -43.14,41.9 -57.57,65.8 -14.21,23.55 -20.14,45.51 -28.9,73.1l-84.41 275.34c-3.17,10.78 -7.59,20.3 -11.56,33.24l-45.32 157.3c-1.74,5.95 -3.51,11.63 -5.05,17.69 -5.39,21.19 -13.83,48.37 -19.99,70.29l-17.47 61.1c-0.88,3.07 -2.11,6.32 -2.37,9.35z"
            />

            <path
              className="path2"
              d="M0.69 805.01l-0.69 0 0.57 0.8 0.11 -0.8z"
            />
          </svg>

          <p style={{ marginTop: "16px", color: "#e5e5e5", fontSize: "13px", letterSpacing: "3px" }}>
            FANTABRAND PROPERTIES
          </p>

          <div className="shimmer-line" />

          <style jsx global>{`
            .shimmer-line {
              margin-top: 20px;
              width: 120px;
              height: 2px;
              background: linear-gradient(90deg, transparent, #a855f7, transparent);
              animation: shimmer 1.5s infinite;
            }
            @keyframes shimmer {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(100%); }
            }
          `}</style>
        </div>
      )}

      {/* 🔥 MAIN CONTENT WITH TRANSITIONS */}
      {!loading && (
        <>
          {!isAdminRoute && <Navbar />}

          <div
            style={{
              flex: 1,
              paddingTop: !isAdminRoute ? "100px" : "0px",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={router.route}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{ height: "100%" }}
              >
                <Component {...pageProps} />
              </motion.div>
            </AnimatePresence>
          </div>

          {!isAdminRoute && <Footer />}
          {!isAdminRoute && <ExecutiveChat />}
          {!isAdminRoute && <NewsletterPopup />}
        </>
      )}
    </div>
  );
}