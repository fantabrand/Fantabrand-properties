import styles from "../styles/Executive.module.css";

const executives = [
  {
    name: "Adebayo Emmanuel",
    role: "Chief Executive Officer",
    image: "/ceo.jpg",
    bio: "With over 15 years in real estate development, Emmanuel leads Fantabrand with a strategic focus on sustainable growth and premium property investments.",
    linkedin: "#"
  },
  {
    name: "Ayanduro Isaac",
    role: "Director of Operations",
    image: "/director.jpg",
    bio: "Isaac oversees project execution, ensuring all developments meet our architectural and investment standards.",
    linkedin: "#"
  },
  {
    name: "Adebayo Daniel",
    role: "Head of Sales",
    image: "/sales.jpg",
    bio: "Taiwo drives client acquisition and investor relations, delivering high-value opportunities to our partners.",
    linkedin: "#"
  }
];

export default function ExecutiveSection() {
  return (
    <section className={styles.executiveSection}>
      <h2>Meet our Team</h2>

      <div className={styles.grid}>
        {executives.map((exec, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.inner}>
              
              {/* FRONT */}
              <div className={styles.front}>
                <img src={exec.image} alt={exec.name} />
                <h3>{exec.name}</h3>
                <p>{exec.role}</p>
              </div>

              {/* BACK */}
              <div className={styles.back}>
                <h3>{exec.name}</h3>
                <p>{exec.bio}</p>
                <a 
                  href={exec.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.linkedin}
                >
                  View LinkedIn
                </a>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}