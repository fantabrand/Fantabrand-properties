import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const router = useRouter();
  const { locale, asPath } = router; // ✅ ADD THIS

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  /* =========================
     Scroll Behavior
  ========================= */
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      setScrolled(currentScroll > 30);

      if (currentScroll > lastScrollY.current && currentScroll > 120) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      lastScrollY.current = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* =========================
     Close Menu On Route Change
  ========================= */
  useEffect(() => {
    setMenuOpen(false);
  }, [router.pathname]);

  /* =========================
     Body Scroll Lock
  ========================= */
  useEffect(() => {
    if (menuOpen) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [menuOpen]);

  return (
    <>
      <nav
        className={`${styles.nav} 
        ${scrolled ? styles.scrolled : ""} 
        ${hidden ? styles.hidden : ""}`}
      >
        <div className={styles.navInner}>
          {/* LOGO */}
          <Link href="/" className={styles.logo}>
            <div className={styles.logoContainer}>
              <img src="/logo.png" alt="Fantabrand Properties" />
            </div>
            <span className={styles.brandName}>Fantabrand</span>
          </Link>

          {/* DESKTOP MENU */}
          <div className={styles.desktopMenu}>
            <NavLink href="/" current={router.pathname}>Home</NavLink>
            <NavLink href="/properties" current={router.pathname}>Projects</NavLink>
            <NavLink href="/services" current={router.pathname}>Services</NavLink>
            <NavLink href="/news" current={router.pathname}>Blog</NavLink>
            <NavLink href="/about" current={router.pathname}>About</NavLink>
            <NavLink href="/become-a-partner" current={router.pathname}>Become A Partner</NavLink>
            <NavLink href="/contact" current={router.pathname}>Contact</NavLink>

            {/* 🌍 LANGUAGE SWITCH (DESKTOP) */}
            <Link href={asPath} locale={locale === "en" ? "fr" : "en"}>
              <span style={{ marginLeft: "15px", cursor: "pointer", fontWeight: "600" }}>
                {locale === "en" ? "FR 🇫🇷" : "EN 🇬🇧"}
              </span>
            </Link>
          </div>

          {/* ACTIONS */}
          <div className={styles.actions}>
            {/* MOBILE MENU BUTTON */}
            <div
              className={`${styles.menuButton} ${
                menuOpen ? styles.active : ""
              }`}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className={styles.menuText}>Menu</span>

              <div className={styles.hamburger}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      <div
        className={`${styles.overlay} ${
          menuOpen ? styles.show : ""
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Slide Panel */}
      <div
        className={`${styles.mobileMenu} ${
          menuOpen ? styles.open : ""
        }`}
      >
        <NavLink href="/" current={router.pathname}>Home</NavLink>
        <NavLink href="/properties" current={router.pathname}>Properties</NavLink>
        <NavLink href="/services" current={router.pathname}>Services</NavLink>
        <NavLink href="/news" current={router.pathname}>Blog</NavLink>
        <NavLink href="/about" current={router.pathname}>About</NavLink>
        <NavLink href="/become-a-partner" current={router.pathname}>Become A Partner</NavLink>
        <NavLink href="/contact" current={router.pathname}>Contact</NavLink>

        {/* 🌍 LANGUAGE SWITCH (MOBILE) */}
        <Link href={asPath} locale={locale === "en" ? "fr" : "en"}>
          <span style={{ marginTop: "20px", display: "block", fontWeight: "600" }}>
            {locale === "en" ? "Switch to French 🇫🇷" : "Switch to English 🇬🇧"}
          </span>
        </Link>
      </div>
    </>
  );
}

function NavLink({ href, children, current }) {
  const active = current.startsWith(href);

  return (
    <Link href={href} className={active ? styles.active : ""}>
      {children}
    </Link>
  );
}