import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabase/client";

export default function AdminProtectedRoute({ children }) {

  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function checkUser() {

      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login");
      } else {
        setLoading(false);
      }

    }

    checkUser();

  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Checking admin access...</p>
      </div>
    );
  }

  return children;

}