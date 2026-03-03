import styles from "../styles/WhatsAppFloat.module.css";

export default function WhatsAppFloat() {
  const phoneNumber = "2349000000000"; // replace with your real number

  const message = encodeURIComponent(
    "Hello Fantabrand Properties, I would like to make an inquiry."
  );

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.whatsapp}
    >
      <span>Chat on WhatsApp</span>
    </a>
  );
}