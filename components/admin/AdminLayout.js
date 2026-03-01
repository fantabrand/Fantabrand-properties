import AdminSidebar from "./AdminSidebar";
import styles from "../../styles/AdminLayout.module.css";

export default function AdminLayout({ children }) {
  return (
    <div className={styles.layout}>
      <AdminSidebar />
      <div className={styles.main}>
        {children}
      </div>
    </div>
  );
}