import Link from "next/link";
import styles from "../../styles/AdminSidebar.module.css";
import { useRouter } from "next/router";

export default function AdminSidebar() {
  const router = useRouter();

  const menu = [
    { name: "Dashboard", path: "/admin" },
    { name: "Properties", path: "/admin/properties" },
    { name: "Add Property", path: "/admin/properties/new" },
    { name: "Inspections", path: "/admin/inspections" },
  ];

  return (
    <div className={styles.sidebar}>

      <div className={styles.logo}>
        Fantabrand
      </div>

      <nav className={styles.nav}>
        {menu.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={
              router.pathname === item.path
                ? styles.active
                : styles.link
            }
          >
            {item.name}
          </Link>
        ))}
      </nav>

    </div>
  );
}