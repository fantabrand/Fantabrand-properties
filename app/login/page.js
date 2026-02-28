"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {

  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {

    setLoading(true);

    // Step 1: Login user
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    // Step 2: Handle login errors
    if (error) {

      if (error.message.includes("Email not confirmed")) {
        alert("Please confirm your email before logging in.");
        return;
      }

      alert(error.message);
      return;
    }

    // Step 3: Get user profile role
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .maybeSingle();

    if (profileError) {
      alert("Error loading profile.");
      return;
    }

    // Step 4: Redirect based on role
    if (profile?.role === "admin") {
  router.push("/admin");
} else {
  router.push("/dashboard");
}

  };


  return (

    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "#000"
    }}>

      <div style={{
        width: "400px",
        padding: "30px",
        background: "#111",
        borderRadius: "10px"
      }}>

        <h2 style={{
          color: "#fff",
          marginBottom: "20px"
        }}>
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "10px"
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px"
          }}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            background: "#6a0dad",
            color: "#fff",
            border: "none",
            cursor: "pointer"
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </div>

    </div>

  );
}