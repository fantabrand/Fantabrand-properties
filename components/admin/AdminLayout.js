import AdminSidebar from "./AdminSidebar";
import AdminProtectedRoute from "./AdminProtectedRoute";
import styles from "../../styles/AdminLayout.module.css";

export default function AdminLayout({ children }) {

  return (

    <AdminProtectedRoute>

      <div className={styles.layout}>

        <AdminSidebar />

        <div className={styles.main}>
          {children}
        </div>

      </div>

    </AdminProtectedRoute>

  );

}