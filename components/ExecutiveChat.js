import { useState, useEffect } from "react";
import styles from "../styles/ExecutiveChat.module.css";

export default function ExecutiveChat() {

  const [open, setOpen] = useState(false);
  const [typingText, setTypingText] = useState("");

  const fullText = "I’m online, how may I help you?";

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
    "Hello Fantabrand Properties, I saw your website and would like assistance."
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
            Executive Assistant
          </div>

          <div className={styles.chatBody}>

            <p>
              Welcome to Fantabrand Properties.
              How may we assist you today?
            </p>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.chatButton}
            >
              Speak on WhatsApp
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