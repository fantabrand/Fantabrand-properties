import { useState, useEffect } from "react";
import styles from "../styles/ExecutiveChat.module.css";

export default function ExecutiveChat() {

  const [open, setOpen] = useState(false);
  const [typingText, setTypingText] = useState("");

  const fullText = "Executive assistant online";

  useEffect(() => {

    let index = 1;

    const interval = setInterval(() => {

      setTypingText(fullText.slice(0, index));

      if (index >= fullText.length) {
        clearInterval(interval);
      }

      index++;

    }, 40);

    return () => clearInterval(interval);

  }, []);


  const whatsappMessage = encodeURIComponent(
    "Hello Fantabrand Properties, I would like to enquire about your available estates."
  );

  const whatsappLink = `https://wa.me/2349063504797?text=${whatsappMessage}`;


  return (

    <div className={styles.chatWrapper}>

      {!open && (
        <div className={styles.onlineText}>
          <span className={styles.onlineDot}></span>
          {typingText}
        </div>
      )}

      {open && (
        <div className={styles.chatBox}>

          <div className={styles.chatHeader}>
            Fantabrand Executive Desk
          </div>

          <div className={styles.chatBody}>

            <p className={styles.chatIntro}>
              Welcome to <strong>Fantabrand Properties</strong>.
              Our executive desk is available to assist you with
              property enquiries, inspections, and investment options.
            </p>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.chatButton}
            >
              Continue on WhatsApp
            </a>

          </div>

        </div>
      )}

      <button
        className={styles.chatBubble}
        onClick={() => setOpen(!open)}
        aria-label="Open chat"
      >
        {open ? "×" : "Chat"}
      </button>

    </div>

  );
}