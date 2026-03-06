import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../../styles/AdminSidebar.module.css";

export default function AdminLogoutButton() {

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {

    if (loading) return;

    setLoading(true);

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout error:", error);
      alert("Logout failed. Please try again.");
      setLoading(false);
      return;
    }

    router.replace("/login");

  }

  return (
    <button
      onClick={handleLogout}
      className={styles.logoutBtn}
      disabled={loading}
    >
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
}