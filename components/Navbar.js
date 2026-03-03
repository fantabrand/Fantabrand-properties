import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";

export default function Navbar() {

  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  const lastScrollY = useRef(0);

  /* Scroll behavior */
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

  useEffect(() => {
    setMenuOpen(false);
  }, [router.pathname]);

  return (
    <>
      <nav className={`nav ${scrolled ? "scrolled" : ""} ${hidden ? "hidden" : ""}`}>

        <div className="nav-inner">

          {/* LOGO */}
          <Link href="/" className="logo">

            <div className="logo-container">
              <img src="/logo.png" alt="Fantabrand Properties" />
            </div>

            <span className="brand-name">Fantabrand</span>

          </Link>

          {/* DESKTOP LINKS */}
          <div className="desktop-menu">

            <NavLink href="/" current={router.pathname}>Home</NavLink>
            <NavLink href="/properties" current={router.pathname}>Properties</NavLink>
            <NavLink href="/services" current={router.pathname}>Services</NavLink>
            <NavLink href="/news" current={router.pathname}>News</NavLink>
            <NavLink href="/about" current={router.pathname}>About</NavLink>
            <NavLink href="/contact" current={router.pathname}>Contact</NavLink>

          </div>

          {/* ACTIONS */}
          <div className="actions">

            <Link href="/admin/login" className="admin-btn">
              Admin
            </Link>

            <div
              className={`hamburger ${menuOpen ? "active" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>

          </div>

        </div>

        {/* MOBILE MENU */}
        <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>

          <NavLink href="/" current={router.pathname}>Home</NavLink>
          <NavLink href="/properties" current={router.pathname}>Properties</NavLink>
          <NavLink href="/services" current={router.pathname}>Services</NavLink>
          <NavLink href="/news" current={router.pathname}>News</NavLink>
          <NavLink href="/about" current={router.pathname}>About</NavLink>
          <NavLink href="/contact" current={router.pathname}>Contact</NavLink>

        </div>

      </nav>

<style jsx global>{`

/* REMOVE ALL LINK DECORATION INCLUDING VISITED STATE */

a,
a:link,
a:visited,
a:hover,
a:active {
  text-decoration: none !important;
  border: none !important;
  outline: none !important;
}

/* FORCE NAV LINKS COLOR */

.desktop-menu a,
.desktop-menu a:visited {
  color: #1a1a1a !important;
  font-weight: 800;
  letter-spacing: 0.4px;
}

.desktop-menu a:hover {
  color: #6d28d9 !important;
}

.desktop-menu a.active {
  color: #6d28d9 !important;
}

/* MOBILE */

.mobile-menu a,
.mobile-menu a:visited {
  color: #1a1a1a !important;
  font-weight: 800;
}

/* NAV STRUCTURE (UNCHANGED) */

.nav {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 94%;
  max-width: 1300px;
  border-radius: 60px;
  background: rgba(255,255,255,0.7);
  backdrop-filter: blur(12px);
  box-shadow: 0 10px 40px rgba(0,0,0,0.08);
  transition: all 0.4s ease;
  z-index: 999;
}

.nav.scrolled {
  background: rgba(255,255,255,0.95);
  box-shadow: 0 20px 60px rgba(0,0,0,0.15);
}

.nav.hidden {
  transform: translate(-50%, -120px);
}

.nav-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 28px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo-container {
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-container img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.brand-name {
  font-weight: 700;
  font-size: 18px;
  letter-spacing: 0.4px;
  color: #111;
  line-height: 1;
}

.desktop-menu {
  display: flex;
  gap: 30px;
}

.actions {
  display: flex;
  align-items: center;
  gap: 14px;
}

.admin-btn {
  padding: 8px 18px;
  border-radius: 30px;
  background: linear-gradient(90deg,#a855f7,#6d28d9);
  color: white !important;
  font-weight: 600;
}

.hamburger {
  display: none;
  flex-direction: column;
  cursor: pointer;
}

.hamburger span {
  width: 25px;
  height: 2px;
  background: #111;
  margin: 4px 0;
}

.mobile-menu {
  display: none;
  flex-direction: column;
  padding: 20px;
}

.mobile-menu.open {
  display: flex;
}

@media(max-width:1024px){
  .desktop-menu{
    display:none;
  }
  .hamburger{
    display:flex;
  }
}

`}</style>

    </>
  );
}

function NavLink({ href, children, current }) {
  const active = current === href;
  return (
    <Link href={href} className={active ? "active" : ""}>
      {children}
    </Link>
  );
}