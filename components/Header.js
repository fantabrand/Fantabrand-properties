import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? "header--scrolled" : ""}`}>
      <div className="container header__inner">
        <Link href="/" className="header__brand">
          <img src="/logo.png" alt="Fantabrand" style={{height:"40px"}} />
          <span className="header__brand-text">
            <span className="header__brand-name">Fantabrand</span>
            <span className="header__brand-sub">Properties Ltd</span>
          </span>
        </Link>

        <nav className={`nav ${mobileOpen ? "nav--open" : ""}`}>
          <Link href="/" className="nav__link" onClick={() => setMobileOpen(false)}>
            Home
          </Link>
          <Link href="/about" className="nav__link" onClick={() => setMobileOpen(false)}>
            About
          </Link>
          <Link href="/services" className="nav__link" onClick={() => setMobileOpen(false)}>
            Services
          </Link>
          <Link href="/properties" className="nav__link" onClick={() => setMobileOpen(false)}>
            Properties
          </Link>
          <Link href="/contact" className="nav__link nav__link--primary" onClick={() => setMobileOpen(false)}>
            Book a Viewing
          </Link>
        </nav>

        <button
          className={`nav-toggle ${mobileOpen ? "nav-toggle--open" : ""}`}
          aria-label="Toggle navigation"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
