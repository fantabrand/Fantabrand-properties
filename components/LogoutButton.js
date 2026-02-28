"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {

  const supabase = createClient();
  const router = useRouter();

  const handleLogout = async () => {

    await supabase.auth.signOut();

    router.push("/login");
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        background: "linear-gradient(135deg,#6a0dad,#c77dff)",
        color: "#fff",
        padding: "8px 16px",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer"
      }}
    >
      Logout
    </button>
  );
}