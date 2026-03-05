import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabase/client";
import styles from "../styles/Login.module.css";

export default function Login() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    // Wait for session to be ready
    const { data } = await supabase.auth.getSession();

    if (data.session) {
      router.push("/admin");
    }

    setLoading(false);
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleLogin} className={styles.card}>

        <h2>Admin Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

      </form>
    </div>
  );
}