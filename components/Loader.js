// components/Loader.js
import { useEffect } from "react";
import styles from "../styles/Loader.module.css";

export default function Loader() {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className={styles.loaderContainer}>
      <div className={styles.logo}>F</div>
      <p className={styles.text}>Fantabrand Properties</p>
    </div>
  );
}