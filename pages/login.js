import { useState } from "react";
import { supabase } from "../lib/supabase/client";
import { useRouter } from "next/router";
import styles from "../styles/Login.module.css";

export default function Login() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    // wait briefly for session initialization
    setTimeout(() => {
      router.replace("/admin");
    }, 500);
  }

  return (
    <div className={styles.container}>

      <form onSubmit={handleLogin} className={styles.card}>

        <h2>Admin Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">
          {loading ? "Logging in..." : "Login"}
        </button>

      </form>

    </div>
  );
}