import { useState, useEffect } from "react";
import styles from "../styles/ExecutiveChat.module.css";

export default function ExecutiveChat() {

  const [open, setOpen] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {

    const timer = setTimeout(() => {
      setShowHint(true);
    }, 5000);

    return () => clearTimeout(timer);

  }, []);

  const phone = "2349063504797";

  const createLink = (text) => {
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  return (

    <div className={styles.chatWrapper}>

      {!open && showHint && (
        <div className={styles.tooltipHint}>
          Need help finding land?
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
              How can we assist you today?
            </p>

            <a
              href={createLink("Hello Fantabrand, I would like to see your available estates.")}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.optionButton}
            >
              View Available Estates
            </a>

            <a
              href={createLink("Hello Fantabrand, I would like to book a property inspection.")}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.optionButton}
            >
              Book Property Inspection
            </a>

            <a
              href={createLink("Hello Fantabrand, I need advice on real estate investment.")}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.optionButton}
            >
              Speak With Investment Advisor
            </a>

          </div>

        </div>

      )}

      <button
        className={styles.chatBubble}
        onClick={() => setOpen(!open)}
        aria-label="Open chat"
      >

        {open ? (
          "×"
        ) : (

          <div className={styles.typingDots}>
            <span></span>
            <span></span>
            <span></span>
          </div>

        )}

      </button>

    </div>

  );

}