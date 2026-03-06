import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase/client";
import { useRouter } from "next/router";

export default function AdminProtectedRoute({ children }) {

  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function checkAuth() {

      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        router.replace("/login");
      } else {
        setLoading(false);
      }

    }

    checkAuth();

  }, [router]);

  if (loading) {
    return <p style={{ padding: "40px" }}>Checking authentication...</p>;
  }

  return children;
}