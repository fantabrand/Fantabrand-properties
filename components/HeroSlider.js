import { useEffect, useState } from "react";
import styles from "../styles/HeroSlider.module.css";

const slides = [
  {
    image: "/hero1.jpg",
    title: "Luxury Homes in Prime Locations",
    subtitle: "Discover exclusive properties designed for refined living.",
  },
  {
    image: "/hero2.jpg",
    title: "Invest in Nigeria’s Finest Real Estate",
    subtitle: "Secure high-value assets with strong appreciation potential.",
  },
  {
    image: "/hero3.jpg",
    title: "Where Elegance Meets Comfort",
    subtitle: "Experience modern architecture and timeless luxury.",
  },
];

export default function HeroSlider() {

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.slider}>

      {slides.map((slide, index) => (
        <div
          key={index}
          className={`${styles.slide} ${
            index === current ? styles.active : ""
          }`}
          style={{
            backgroundImage: `url("${slide.image}")`,
          }}
        />
      ))}

      <div className={styles.overlay} />

      <div key={current} className={styles.textContainer}>
        <h1 className={styles.title}>
          {slides[current].title}
        </h1>

        <p className={styles.subtitle}>
          {slides[current].subtitle}
        </p>
      </div>

    </div>
  );
}