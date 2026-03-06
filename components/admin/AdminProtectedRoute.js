import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabase/client";

export default function AdminProtectedRoute({ children }) {

  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const checkSession = async () => {

      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        router.push("/admin/login");
      } else {
        setLoading(false);
      }

    };

    checkSession();

  }, []);

  if (loading) {
    return <p style={{ padding: "40px" }}>Checking authentication...</p>;
  }

  return children;
}