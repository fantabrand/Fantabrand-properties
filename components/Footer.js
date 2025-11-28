import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <div className="footer__logo">
            <img src="/logo.png" alt="Fantabrand" style={{height:"40px"}} />
            <span className="footer__logo-text">
              Fantabrand <span>Properties</span>
            </span>
          </div>
          <p className="footer__tagline">Redefining luxury living across Nigeria&apos;s most desirable addresses.</p>
        </div>
        <div className="footer__columns">
          <div className="footer__column">
            <h4>Navigation</h4>
            <Link href="/about">About</Link>
            <Link href="/services">Services</Link>
            <Link href="/properties">Properties</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div className="footer__column">
            <h4>Contact</h4>
            <p>Ilorin, Kwara State, Nigeria</p>
            <p>+234 (0) 000 000 0000</p>
            <p>hello@fantabrandproperties.com.ng</p>
          </div>
          <div className="footer__column">
            <h4>Follow</h4>
            <p><a href="https://instagram.com/fantabrand" target="_blank">Instagram</a><br/><a href="https://facebook.com/fantabrand" target="_blank">Facebook</a></p>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <span>© {year} Fantabrand Properties Ltd. All rights reserved.</span>
          <span className="footer__bottom-note">Redefining luxury living.</span>
        </div>
      </div>
    </footer>
  );
}
