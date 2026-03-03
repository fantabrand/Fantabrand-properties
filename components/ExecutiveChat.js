import { useState, useEffect } from "react";
import styles from "../styles/ExecutiveChat.module.css";

export default function ExecutiveChat() {
  const [open, setOpen] = useState(false);
  const [typingText, setTypingText] = useState("");
  const fullText = "I’m online, how may I help you?";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypingText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) clearInterval(interval);
    }, 40);

    return () => clearInterval(interval);
  }, []);

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
            Executive Assistant
          </div>

          <div className={styles.chatBody}>
            <p>
              Welcome to Fantabrand Properties.
              How may we assist you today?
            </p>

            <a
              href="https://wa.me/2349000000000"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.chatButton}
            >
              Speak on WhatsApp
            </a>
          </div>
        </div>
      )}

      <div
        className={styles.chatBubble}
        onClick={() => setOpen(!open)}
      >
        {open ? "×" : "Chat"}
      </div>

    </div>
  );
}