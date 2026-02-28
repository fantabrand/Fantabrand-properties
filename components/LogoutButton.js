"use client";

import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {

  const router = useRouter();

  async function handleLogout() {

    await supabase.auth.signOut();

    router.push("/login");

  }

  return (
    <button
      onClick={handleLogout}
      className="bg-purple-700 text-white px-4 py-2 rounded"
    >
      Logout
    </button>
  );
}