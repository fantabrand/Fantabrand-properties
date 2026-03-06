import Link from "next/link";
import styles from "../../styles/AdminSidebar.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase/client";
import AdminLogoutButton from "./AdminLogoutButton";

export default function AdminSidebar() {

  const router = useRouter();

  const [counts, setCounts] = useState({
    inspections: 0,
    subscribers: 0,
  });

  const menu = [
    { name: "Dashboard", path: "/admin" },
    { name: "Properties", path: "/admin/properties" },
    { name: "Add Property", path: "/admin/properties/new" },
    { name: "Inspections", path: "/admin/inspections" },
    { name: "Newsletter", path: "/admin/newsletter" },
  ];

  useEffect(() => {

    let interval;

    async function fetchCounts() {

      const [
        inspectionsRes,
        subscribersRes
      ] = await Promise.all([

        supabase
          .from("inspections")
          .select("*", { count: "exact", head: true }),

        supabase
          .from("newsletter_subscribers")
          .select("*", { count: "exact", head: true }),

      ]);

      setCounts({
        inspections: inspectionsRes.count || 0,
        subscribers: subscribersRes.count || 0,
      });
    }

    fetchCounts();

    interval = setInterval(fetchCounts, 15000);

    return () => clearInterval(interval);

  }, []);

  return (

    <div className={styles.sidebar}>
      
      <div className={styles.logo}>
        Fantabrand
      </div>

      <nav className={styles.nav}>
        {menu.map((item) => {

          let badge = null;

          if (item.name === "Inspections" && counts.inspections > 0) {
            badge = <span className={styles.badge}>{counts.inspections}</span>;
          }

          if (item.name === "Newsletter" && counts.subscribers > 0) {
            badge = <span className={styles.badge}>{counts.subscribers}</span>;
          }

          return (
            <Link
              key={item.path}
              href={item.path}
              className={
                router.pathname === item.path
                  ? styles.active
                  : styles.link
              }
            >
              {item.name} {badge}
            </Link>
          );

        })}
      </nav>

      <div className={styles.logout}>
        <AdminLogoutButton />
      </div>

    </div>

  );

}