import AdminLayout from "../../components/admin/AdminLayout";
import styles from "../../styles/AdminDashboard.module.css";
import { supabase } from "../../lib/supabase/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function AdminDashboard() {

  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    properties: 0,
    inspections: 0,
    pending: 0,
    subscribers: 0,
  });

  useEffect(() => {

    let interval;

    async function init() {

      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        router.push("/admin/login");
        return;
      }

      await fetchStats();
      setLoading(false);

      // Auto refresh every 15 seconds
      interval = setInterval(fetchStats, 15000);
    }

    init();

    return () => {
      if (interval) clearInterval(interval);
    };

  }, [router]);

  async function fetchStats() {

    const [
      propertiesRes,
      inspectionsRes,
      pendingRes,
      subscribersRes
    ] = await Promise.all([

      supabase
        .from("properties")
        .select("*", { count: "exact", head: true }),

      supabase
        .from("inspections")
        .select("*", { count: "exact", head: true }),

      supabase
        .from("inspections")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending"),

      supabase
        .from("newsletter_subscribers")
        .select("*", { count: "exact", head: true }),

    ]);

    setStats({
      properties: propertiesRes.count || 0,
      inspections: inspectionsRes.count || 0,
      pending: pendingRes.count || 0,
      subscribers: subscribersRes.count || 0,
    });

  }

  if (loading) {
    return (
      <AdminLayout>
        <p style={{ padding: "40px" }}>
          Checking authentication...
        </p>
      </AdminLayout>
    );
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

        <div className={styles.card}>
          <p>Newsletter Subscribers</p>
          <h2>{stats.subscribers}</h2>
        </div>

      </div>

    </AdminLayout>

  );

}