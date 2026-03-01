import { useRouter } from "next/router";
import { supabase } from "@/lib/supabase/client";

export default function AdminLogoutButton() {

  const router = useRouter();

  async function handleLogout() {

    const { error } = await supabase.auth.signOut();

    if (!error) {
      router.push("/login");
    } else {
      alert("Logout failed");
    }
  }

  return (

    <button
      onClick={handleLogout}
      className="bg-black hover:bg-gray-800 text-white px-5 py-2 rounded-lg"
    >
      Logout
    </button>

  );
}