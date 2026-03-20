// components/Loader.js
import styles from "../styles/Loader.module.css";

export default function Loader() {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.logo}>F</div>
      <p className={styles.text}>Fantabrand Properties</p>
    </div>
  );
}