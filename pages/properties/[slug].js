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
  const faqs = safeParse(property.faqs, []);

  const whatsappUrl = `https://wa.me/2349063504797?text=${encodeURIComponent(
    `Hello, I am interested in ${property.title}`
  )}`;

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const FeatureIcon = ({ index }) => {
    const icons = [
      <svg viewBox="0 0 24 24" className={styles.svgIcon}>
        <path d="M12 2L4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6l-8-4z" />
      </svg>,
      <svg viewBox="0 0 24 24" className={styles.svgIcon}>
        <path d="M4 20l8-16 8 16M12 4v16" />
      </svg>,
      <svg viewBox="0 0 24 24" className={styles.svgIcon}>
        <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
      </svg>,
      <svg viewBox="0 0 24 24" className={styles.svgIcon}>
        <path d="M12 2C8 8 6 11 6 14a6 6 0 0012 0c0-3-2-6-6-12z" />
      </svg>,
    ];

    return icons[index % icons.length];
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
                      <FeatureIcon index={i} />
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
                    <li key={i}>📍 {item}</li>
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
                    <li key={i}>🏙 {item}</li>
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
            {faqs.length > 0 && (
              <div
                className={styles.section}
                ref={(el) => (sectionsRef.current[5] = el)}
              >
                <h2>Frequently Asked Questions</h2>

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