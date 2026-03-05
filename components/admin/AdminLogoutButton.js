import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/router";
import styles from "../../styles/AdminSidebar.module.css";

export default function AdminLogoutButton() {

const router = useRouter();

async function handleLogout() {

await supabase.auth.signOut();

router.replace("/login");

}

return ( <button
   onClick={handleLogout}
   className={styles.logoutBtn}
 >
Logout </button>
);
}
