import { useState } from "react";
import styles from "../styles/PremiumFaq.module.css";

export default function PremiumFaq() {

const faqs = [
{
question: "What does Fantabrand Properties do?",
answer: "Fantabrand Properties Limited helps individuals and investors acquire verified land and real estate in high-growth locations across Nigeria."
},
{
question: "Where are your properties located?",
answer: "Our properties are located in fast-growing investment areas such as Ilorin, Kwara State and other strategic locations."
},
{
question: "Can I inspect the land before payment?",
answer: "Yes. We organize physical site inspections so buyers can verify the property before making payment."
},
{
question: "Do you offer installment payment plans?",
answer: "Yes. We provide flexible installment payment options depending on the property."
},
{
question: "What documents will I receive after purchase?",
answer: "Buyers receive important documents such as Deed of Assignment, Survey Plan, Payment Receipt and Allocation Letter."
}
];

const [active, setActive] = useState(null);

const toggle = (index) => {
setActive(active === index ? null : index);
};

return (
<section className={styles.faqSection}>

<h2 className={styles.title}>Frequently Asked Questions</h2>
<p className={styles.subtitle}>
Everything you need to know before investing with Fantabrand Properties.
</p>

<div className={styles.faqContainer}>

{faqs.map((faq, index) => (

<div
key={index}
className={`${styles.faqItem} ${active === index ? styles.active : ""}`}
>

<button
className={styles.question}
onClick={() => toggle(index)}
>

<span>{faq.question}</span>
<span className={styles.icon}>+</span>


</button>

<div className={styles.answer}>
<p>{faq.answer}</p>
</div>

</div>

))}

</div>

</section>
);
}