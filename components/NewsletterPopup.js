import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase/client";
import styles from "../styles/NewsletterPopup.module.css";

export default function NewsletterPopup() {

  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const closed = localStorage.getItem("newsletter_closed");

    if (closed) return;

    function handleScroll() {

      const scrollTop = window.scrollY;
      const pageHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const scrollPercent = scrollTop / pageHeight;

      if (scrollPercent > 0.4) {

        setShow(true);

        window.removeEventListener("scroll", handleScroll);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);

  }, []);

  function closePopup() {

    setShow(false);

    localStorage.setItem("newsletter_closed", "true");
  }

  async function subscribe() {

    if (!email) {
      alert("Please enter your email");
      return;
    }

    setLoading(true);

    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert([{ email }]);

    setLoading(false);

    if (error) {

      alert(error.message);
console.log(error);

      return;
    }

    alert("You're subscribed to Fantabrand updates!");

    setEmail("");

    closePopup();
  }

  if (!show) return null;

  return (

    <div className={styles.overlay}>

      <div className={styles.popup}>

        <button
          className={styles.close}
          onClick={closePopup}
        >
          ×
        </button>

        <h3>Get Early Access to New Estates</h3>

        <p>
          Join the Fantabrand investor list and receive early
          access to new property launches, investment
          opportunities, and exclusive payment plans.
        </p>

        <div className={styles.form}>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <button
            onClick={subscribe}
            disabled={loading}
          >
            {loading ? "Joining..." : "Get Early Access"}
          </button>

        </div>

      </div>

    </div>

  );
}