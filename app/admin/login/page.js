"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase";

export default function AdminLogin() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [checking, setChecking] = useState(true);


  /* ================= AUTO REDIRECT IF LOGGED IN ================= */

  useEffect(() => {
    checkUser();
  }, []);


  async function checkUser() {

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      router.push("/admin");
      return;
    }

    setChecking(false);
  }


  /* ================= LOGIN ================= */

  async function handleLogin(e) {

    e.preventDefault();

    setErrorMsg("");

    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {

      setErrorMsg("Invalid email or password");
      return;

    }

    router.push("/admin");
  }


  /* ================= LOADING ================= */

  if (checking) {

    return (
      <div style={container}>
        Checking session...
      </div>
    );

  }


  /* ================= LOGIN UI ================= */

  return (

    <div style={container}>

      <div style={card}>

        <h1 style={title}>
          Admin Login
        </h1>


        {errorMsg && (
          <div style={errorBox}>
            {errorMsg}
          </div>
        )}


        <form onSubmit={handleLogin} style={form}>

          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
            style={input}
          />


          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
            style={input}
          />


          <button style={button}>
            Login
          </button>

        </form>

      </div>

    </div>

  );

}



/* ================= STYLES ================= */

const container = {

  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#0f0f12",
  color: "#fff",

};


const card = {

  background: "rgba(255,255,255,0.05)",
  padding: "40px",
  borderRadius: "14px",
  width: "400px",
  border: "1px solid rgba(255,255,255,0.1)",

};


const title = {

  marginBottom: "20px",

};


const form = {

  display: "flex",
  flexDirection: "column",
  gap: "16px",

};


const input = {

  padding: "12px",
  borderRadius: "8px",
  border: "1px solid rgba(255,255,255,0.2)",
  background: "rgba(255,255,255,0.05)",
  color: "#fff",

};


const button = {

  padding: "12px",
  borderRadius: "8px",
  background: "linear-gradient(135deg,#6a0dad,#9333ea)",
  border: "none",
  color: "#fff",
  fontWeight: "600",
  cursor: "pointer",

};


const errorBox = {

  background: "rgba(255,0,0,0.15)",
  padding: "10px",
  borderRadius: "8px",
  marginBottom: "15px",
  color: "#ff4d4d",

};