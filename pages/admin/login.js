import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/router";

export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {

    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      router.push("/admin");
    }
  }

  return (

    <div className="min-h-screen flex items-center justify-center">

      <form
        onSubmit={handleLogin}
        className="bg-white p-8 shadow rounded w-96"
      >

        <h1 className="text-2xl font-bold mb-6">
          Admin Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-4"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-purple-700 text-white py-2"
        >
          Login
        </button>

      </form>

    </div>

  );
}