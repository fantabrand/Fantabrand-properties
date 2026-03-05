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
    router.replace("/login");
  } else {
    setLoading(false);
  }

}

checkUser();

// listen for logout or session expiry
const { data: listener } = supabase.auth.onAuthStateChange(
  (event, session) => {
    if (!session) {
      router.replace("/login");
    }
  }
);

return () => {
  listener.subscription.unsubscribe();
};

}, [router]);

if (loading) {
return ( <div className="min-h-screen flex items-center justify-center"> <p className="text-gray-600 text-lg">Checking admin access...</p> </div>
);
}

return children;

}
