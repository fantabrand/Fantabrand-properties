import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminProtectedRoute from "./AdminProtectedRoute";
import styles from "../../styles/AdminLayout.module.css";

export default function AdminLayout({ children }) {

  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (

    <AdminProtectedRoute>

      {/* Mobile Menu Button */}
      <button
        className={styles.menuButton}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      {/* Overlay */}
      {menuOpen && (
        <div
          className={styles.overlay}
          onClick={closeMenu}
        />
      )}

      <div className={styles.layout}>

        {/* Sidebar */}
        <div
          className={`${styles.sidebar} ${menuOpen ? styles.sidebarOpen : ""}`}
          onClick={closeMenu}
        >
          <AdminSidebar />
        </div>

        {/* Main Content */}
        <div className={styles.main}>
          {children}
        </div>

      </div>

    </AdminProtectedRoute>

  );

}