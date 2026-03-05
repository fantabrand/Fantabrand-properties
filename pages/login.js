import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/router";

export default function LoginPage() {

const router = useRouter();

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [showPassword, setShowPassword] = useState(false);
const [loading, setLoading] = useState(false);

async function handleLogin(e) {

e.preventDefault();
setLoading(true);

const { error } = await supabase.auth.signInWithPassword({
  email,
  password,
});

if (error) {
  alert(error.message);
  setLoading(false);
} else {
  router.push("/admin");
}


}

return (

<div
  style={{
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f8fafc"
  }}
>

  <form
    onSubmit={handleLogin}
    style={{
      width: "380px",
      background: "white",
      padding: "40px",
      borderRadius: "12px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
    }}
  >

    <h1
      style={{
        fontSize: "26px",
        fontWeight: "700",
        marginBottom: "25px",
        textAlign: "center"
      }}
    >
      Admin Login
    </h1>

    <input
      type="email"
      placeholder="Email"
      required
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      style={{
        width: "100%",
        padding: "12px",
        marginBottom: "15px",
        borderRadius: "8px",
        border: "1px solid #ddd"
      }}
    />

    <div style={{ position: "relative" }}>

      <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #ddd"
        }}
      />

      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        style={{
          position: "absolute",
          right: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          border: "none",
          background: "none",
          cursor: "pointer",
          color: "#6d28d9",
          fontWeight: "600"
        }}
      >
        {showPassword ? "Hide" : "Show"}
      </button>

    </div>

    <button
      type="submit"
      disabled={loading}
      style={{
        width: "100%",
        marginTop: "20px",
        padding: "12px",
        borderRadius: "8px",
        border: "none",
        background: "linear-gradient(90deg,#a855f7,#6d28d9)",
        color: "white",
        fontWeight: "600",
        cursor: "pointer"
      }}
    >
      {loading ? "Logging in..." : "Login"}
    </button>

  </form>

</div>

);
}
