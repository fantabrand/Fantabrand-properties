import { ShieldCheck, Home, Users, Award } from "lucide-react";

export default function WhyChoose() {
  const items = [
    {
      icon: <ShieldCheck size={32} />,
      title: "Trusted & Reliable",
      desc: "Fantabrand Properties is committed to transparency, integrity, and delivering only verified premium properties.",
    },
    {
      icon: <Home size={32} />,
      title: "Luxury Property Selection",
      desc: "We offer carefully curated luxury homes in prime locations that match your lifestyle and investment goals.",
    },
    {
      icon: <Users size={32} />,
      title: "Client-Focused Service",
      desc: "Our team provides personalized support throughout your property journey from inquiry to ownership.",
    },
    {
      icon: <Award size={32} />,
      title: "Proven Excellence",
      desc: "We have built a strong reputation for delivering quality developments and exceptional real estate service.",
    },
  ];

  return (
    <section className="whychoose-section">

      <div className="whychoose-container">

        <div className="whychoose-header">
          <h2>Why Choose Fantabrand Properties</h2>

          <p>
            We deliver premium real estate solutions with professionalism,
            trust, and unmatched quality.
          </p>
        </div>

        <div className="whychoose-grid">
          {items.map((item, index) => (
            <div key={index} className="whychoose-card">

              <div className="whychoose-icon">
                {item.icon}
              </div>

              <h3>{item.title}</h3>

              <p>{item.desc}</p>

            </div>
          ))}
        </div>

      </div>

    </section>
  );
}