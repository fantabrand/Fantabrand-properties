import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { supabase } from "../../lib/supabase/client";
import styles from "../../styles/PropertyDetails.module.css";
import Head from "next/head";

export default function PropertyDetails() {
  const router = useRouter();
  const { slug } = router.query;

  const [property, setProperty] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [mainImage, setMainImage] = useState(null);

  // ✅ FAQ STATE
  const [activeFAQ, setActiveFAQ] = useState(null);

  const sectionsRef = useRef([]);

  useEffect(() => {
    if (router.isReady && slug) fetchProperty();
  }, [router.isReady, slug]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.fadeIn);
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionsRef.current.forEach((el) => el && observer.observe(el));
  }, [property]);

  async function fetchProperty() {
    const { data } = await supabase
      .from("properties")
      .select("*")
      .eq("slug", slug)
      .single();

    setProperty(data);
    setMainImage(data.image_url);
  }

  const safeParse = (value, fallback) => {
    try {
      return value ? JSON.parse(value) : fallback;
    } catch {
      return fallback;
    }
  };

  if (!router.isReady || !property) {
    return <p className={styles.loading}>Loading...</p>;
  }

  const description = property.description || property.mission;
  const features = safeParse(property.estate_features, []);
  const whyLocation = safeParse(property.why_location, []);
  const attractions = safeParse(property.environment_attractions, []);
  const paymentPlan = safeParse(property.payment_plan, {}) || {};
  const galleryImages = safeParse(property.gallery_images, []);

const autoFAQs = [
  {
    question: "Where is this estate located?",
    answer: property.location
      ? `${property.title} is located at ${property.location}. A fast developing area with strong investment potential in ilorin`
      : "Location not specified",
  },
  {
    question: "What title document does this property have?",
    answer: property.title_document
      ? `${property.title} comes with ${property.title_document}, ensuring secure ownership.`
      : "Not specified",
  },
  {
    question: "Can I inspect this property before making payment?",
    answer: property.price
      ? `Yes. We organize site inspections so buyers can verify the property before making payment. Kindly book an inspection.`
      : "Contact for price",
  },
  {
    question: "Is installment payment available for this property?",
    answer: property.price
      ? `Yes. Flexible installment payment options may be available depending on the property.`
      : "Contact for price",
  },
];

const customFAQs = safeParse(property.faqs, []);

const faqs = [...autoFAQs, ...customFAQs];

  const whatsappUrl = `https://wa.me/2349063504797?text=${encodeURIComponent(
    `Hello, I am interested in ${property.title}`
  )}`;

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  // ===== ELITE REAL ESTATE SVG ICON SYSTEM =====
const FeatureIcon = ({ label }) => {
  const iconMap = {
    "smart security": (
      <svg viewBox="0 0 24 24" className={styles.svgIcon} fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 3l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V7l7-4z" />
        <path d="M9.5 12l2 2 3-3" />
      </svg>
    ),

    "dry land": (
      <svg viewBox="0 0 24 24" className={styles.svgIcon} fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 17l6-6 4 4 6-6 2 2" />
        <path d="M3 21h18" />
      </svg>
    ),

    "modern gatehouse": (
      <svg viewBox="0 0 24 24" className={styles.svgIcon} fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 10h18" />
        <path d="M5 10v10M19 10v10" />
        <path d="M9 10v10M15 10v10" />
        <path d="M3 10l9-6 9 6" />
      </svg>
    ),

    "prime location": (
      <svg viewBox="0 0 24 24" className={styles.svgIcon} fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
  };

  return iconMap[label?.toLowerCase()] || (
    <svg viewBox="0 0 24 24" className={styles.svgIcon} fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="8" />
    </svg>
  );
};

  return (
    <>
      <Head />

      <div className={styles.container}>
        <div className={styles.grid}>
          {/* LEFT */}
          <div className={styles.left}>
            <h1 className={styles.title}>{property.title}</h1>
            <p className={styles.subLocation}>{property.location}</p>

            <img src={mainImage} className={styles.heroImage} />

            {galleryImages.length > 0 && (
              <div className={styles.thumbnailWrapper}>
                {galleryImages.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    className={`${styles.thumbnail} ${
                      mainImage === img ? styles.activeThumbnail : ""
                    }`}
                    onClick={() => setMainImage(img)}
                  />
                ))}
              </div>
            )}

            {description && (
              <div
                className={styles.section}
                ref={(el) => (sectionsRef.current[0] = el)}
              >
                <h2>About This Estate</h2>
                <p className={styles.description}>{description}</p>
              </div>
            )}

            {features.length > 0 && (
              <div
                className={styles.section}
                ref={(el) => (sectionsRef.current[1] = el)}
              >
                <h2>Estate Features</h2>
                <div className={styles.featureGrid}>
                  {features.map((item, i) => (
                    <div key={i} className={styles.featureCard}>
                      <FeatureIcon label={item} />
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {whyLocation.length > 0 && (
              <div
                className={styles.section}
                ref={(el) => (sectionsRef.current[2] = el)}
              >
                <h2>Why This Location</h2>
                <ul className={styles.list}>
                  {whyLocation.map((item, i) => (
                    <li key={i}> {item}</li>
                  ))}
                </ul>
              </div>
            )}

            {attractions.length > 0 && (
              <div
                className={styles.section}
                ref={(el) => (sectionsRef.current[3] = el)}
              >
                <h2>Nearby Attractions</h2>
                <ul className={styles.list}>
                  {attractions.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {Object.keys(paymentPlan).length > 0 && (
              <div
                className={styles.section}
                ref={(el) => (sectionsRef.current[4] = el)}
              >
                <h2 style={{ textAlign: "center" }}>Payment Plan</h2>

                <div className={styles.paymentGrid}>
                  {Object.keys(paymentPlan).map((size) => {
                    const plan = paymentPlan[size] || {};

                    return (
                      <div key={size} className={styles.paymentCard}>
                        <h4 className={styles.paymentSize}>
                          {size.toUpperCase()}
                        </h4>

                        {Object.keys(plan).map((key) => (
                          <p key={key} className={styles.paymentLine}>
                            {key}: ₦{plan[key]}
                          </p>
                        ))}

                        <Link
                          href={`/booking?property=${property.slug}&size=${size}`}
                          className={styles.reservePlotLink}
                        >
                          Reserve Plot
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 🔥 PREMIUM FAQ */}
{/* ✅ FAQ SECTION (AUTO + DYNAMIC) */}
{faqs.length > 0 && (
  <div
    className={styles.section}
    ref={(el) => (sectionsRef.current[5] = el)}
  >
    <h2 className={styles.faqTitle}>Property FAQs</h2>

    <div className={styles.faqContainer}>
      {faqs.map((faq, index) => {
        const isActive = activeFAQ === index;

        return (
          <div key={index} className={styles.faqItem}>
            <div
              className={styles.faqQuestion}
              onClick={() => toggleFAQ(index)}
            >
              <span>{faq.question}</span>

              <span
                className={`${styles.faqIcon} ${
                  isActive ? styles.rotateIcon : ""
                }`}
              >
                +
              </span>
            </div>

            <div
              className={`${styles.faqAnswerWrapper} ${
                isActive ? styles.open : ""
              }`}
            >
              <div className={styles.faqAnswer}>
                {faq.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
)}
              </div>         

          {/* RIGHT */}
          <div className={styles.right}>
            <div className={styles.priceCard}>
              <h1>₦{property.price}</h1>

              {property.title_document && (
                <div className={styles.titleDoc}>
                  📜 {property.title_document}
                </div>
              )}

              <a href={whatsappUrl} className={styles.whatsapp}>
                Chat on WhatsApp
              </a>

              {property.brochure_url && (
                <a href={property.brochure_url} className={styles.brochureBtn}>
                  Download Brochure
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}