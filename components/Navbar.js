"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import LogoutButton from "./LogoutButton";

export default function Navbar() {

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);

  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const navRef = useRef(null);
  const lastScrollY = useRef(0);

  const pathname = usePathname();

  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [leadCount, setLeadCount] = useState(0);


  /* ================= AUTH CHECK ================= */

  useEffect(() => {

    async function initAuth() {

      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);

      if (user) {
        fetchRole(user.id);
        fetchLeadCount();
      }
    }

    initAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {

      const currentUser = session?.user || null;

      setUser(currentUser);

      if (currentUser) {
        fetchRole(currentUser.id);
        fetchLeadCount();
      } else {
        setRole(null);
        setLeadCount(0);
      }

    });

    return () => subscription.unsubscribe();

  }, []);


  /* ================= FETCH ROLE ================= */

  async function fetchRole(userId) {

    const { data } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", userId)
      .maybeSingle();

    setRole(data?.role || null);
  }


  /* ================= FETCH LEADS ================= */

  async function fetchLeadCount() {

    const { count: contactCount } =
      await supabase
        .from("contacts")
        .select("*", { count: "exact", head: true });

    const { count: inspectionCount } =
      await supabase
        .from("inspections")
        .select("*", { count: "exact", head: true });

    setLeadCount((contactCount || 0) + (inspectionCount || 0));
  }


  /* ================= SCROLL ================= */

  useEffect(() => {

    const handleScroll = () => {

      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 30);

      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;

      if (menuOpen) setMenuOpen(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);

  }, [menuOpen]);


  /* ================= INDICATOR ================= */

  useEffect(() => {

    const nav = navRef.current;
    if (!nav) return;

    const activeLink = nav.querySelector(`[data-active="true"]`);

    if (activeLink) {

      const rect = activeLink.getBoundingClientRect();
      const navRect = nav.getBoundingClientRect();

      setIndicatorStyle({
        left: rect.left - navRect.left,
        width: rect.width,
        opacity: 1,
      });

    }

  }, [pathname]);


  const isActive = (path) => pathname === path;


  return (

<header
style={{
position: "fixed",
top: scrolled ? "12px" : "0px",
left: 0,
right: 0,
margin: "0 auto",
width: scrolled ? "95%" : "100%",
maxWidth: "1200px",
zIndex: 1000,
transition: "all 0.35s ease, transform 0.35s ease",
transform: visible ? "translateY(0)" : "translateY(-120%)",
background: scrolled ? "#e8b5f7bc" : "transparent",
backdropFilter: scrolled ? "blur(16px) saturate(180%)" : "none",
WebkitBackdropFilter: scrolled ? "blur(16px) saturate(180%)" : "none",
borderRadius: scrolled ? "14px" : "0px",
boxShadow: scrolled ? "0 8px 30px hsla(0, 0%, 100%, 0.12)" : "none",
border: scrolled ? "1px solid rgba(255,255,255,0.3)" : "none",
}}
>

<div style={styles.container}>

<Link href="/" style={styles.logoContainer}>
<img src="/logo.png" alt="Fantabrand Logo" style={styles.logoImage} />
<span style={styles.logoText}>Fantabrand</span>
</Link>

<nav style={styles.desktopNav} ref={navRef}>

<NavLink href="/" active={isActive("/")}>Home</NavLink>
<NavLink href="/properties" active={isActive("/properties")}>Properties</NavLink>
<NavLink href="/services" active={isActive("/services")}>Services</NavLink>
<NavLink href="/about" active={isActive("/about")}>About</NavLink>
<NavLink href="/contact" active={isActive("/contact")}>Contact</NavLink>

<span
style={{
position: "absolute",
bottom: "-2px",
left: indicatorStyle.left,
width: indicatorStyle.width,
height: "3px",
background: "linear-gradient(90deg,#6a0dad,#c77dff)",
borderRadius: "2px",
transition: "all 0.35s cubic-bezier(.4,0,.2,1)",
opacity: indicatorStyle.opacity,
}}
/>

{!user && (
  <Link href="/login" style={styles.admin}>
    Login
  </Link>
)}

{user && (
  <div style={{ position: "relative" }}>

    <div
      onClick={() => setMenuOpen(!menuOpen)}
      style={{
        width: "36px",
        height: "36px",
        borderRadius: "50%",
        background: "linear-gradient(135deg,#6a0dad,#c77dff)",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "600",
        cursor: "pointer",
      }}
    >
      {user.email.charAt(0).toUpperCase()}
    </div>

    {role === "admin" && leadCount > 0 && (
      <span style={styles.badge}>
        {leadCount}
      </span>
    )}

    {menuOpen && (
      <div style={{
        position: "absolute",
        right: 0,
        top: "45px",
        background: "#fff",
        borderRadius: "10px",
        boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
        padding: "10px 0",
        minWidth: "180px",
        zIndex: 999,
      }}>
        {role === "admin" && (
          <Link href="/admin" style={styles.dropdownItem}>
            Admin Dashboard
          </Link>
        )}

        {role === "user" && (
          <Link href="/dashboard" style={styles.dropdownItem}>
            User Dashboard
          </Link>
        )}

        <div style={{ padding: "0 15px", marginTop: "5px" }}>
          <LogoutButton />
        </div>

      </div>
    )}

  </div>
)}

</nav>

</div>

</header>
);
}


/* NAV LINK */
function NavLink({ href, children, active }) {
return (
<Link
href={href}
data-active={active}
style={{
textDecoration: "none",
color: "#111",
fontWeight: active ? "600" : "500",
paddingBottom: "6px",
}}
>
{children}
</Link>
);
}


const styles = {
container: {
padding: "18px 24px",
display: "flex",
justifyContent: "space-between",
alignItems: "center",
},
logoContainer: {
display: "flex",
alignItems: "center",
gap: "10px",
textDecoration: "none",
},
logoImage: {
height: "34px",
width: "34px",
objectFit: "contain",
},
logoText: {
fontSize: "22px",
fontWeight: "bold",
color: "#6a0dad",
},
desktopNav: {
display: "flex",
gap: "28px",
alignItems: "center",
position: "relative",
},
admin: {
background: "linear-gradient(135deg,#6a0dad,#c77dff)",
color: "#fff",
padding: "7px 16px",
borderRadius: "8px",
textDecoration: "none",
},
badge: {
position: "absolute",
top: "-6px",
right: "-10px",
background: "#ef4444",
color: "#fff",
borderRadius: "50%",
padding: "3px 7px",
fontSize: "11px",
fontWeight: "700",
},
dropdownItem: {
display: "block",
padding: "10px 15px",
textDecoration: "none",
color: "#111",
fontSize: "14px",
},
};