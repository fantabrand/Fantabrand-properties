import AdminLayout from "../../components/admin/AdminLayout";
import styles from "../../styles/AdminDashboard.module.css";
import { supabase } from "../../lib/supabase/client";
import { useEffect, useState } from "react";

export default function AdminDashboard() {

  const [stats, setStats] = useState({
    properties: 0,
    inspections: 0,
    pending: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    const { count: properties } =
      await supabase
        .from("properties")
        .select("*", { count: "exact", head: true });

    const { count: inspections } =
      await supabase
        .from("inspections")
        .select("*", { count: "exact", head: true });

    const { count: pending } =
      await supabase
        .from("inspections")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending");

    setStats({
      properties: properties || 0,
      inspections: inspections || 0,
      pending: pending || 0,
    });
  }

  return (
    <AdminLayout>

      <h1 className={styles.title}>Dashboard Overview</h1>

      <div className={styles.grid}>

        <div className={styles.card}>
          <p>Total Properties</p>
          <h2>{stats.properties}</h2>
        </div>

        <div className={styles.card}>
          <p>Inspection Requests</p>
          <h2>{stats.inspections}</h2>
        </div>

        <div className={styles.card}>
          <p>Pending Requests</p>
          <h2>{stats.pending}</h2>
        </div>

      </div>

    </AdminLayout>
  );
}