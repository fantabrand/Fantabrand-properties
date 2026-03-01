import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase/client";

export default function PropertyDetails() {

  const router = useRouter();
  const { id } = router.query;

  const [property, setProperty] = useState(null);

  useEffect(() => {
    if (id) fetchProperty();
  }, [id]);

  async function fetchProperty() {
    const { data } = await supabase
      .from("properties")
      .select("*")
      .eq("id", id)
      .single();

    setProperty(data);
  }

  if (!property) return null;

  // WhatsApp message
  const whatsappMessage = encodeURIComponent(
    `Hello Fantabrand Properties, I'm interested in "${property.title}". Please provide more details.`
  );

  const whatsappLink = `https://wa.me/2349063504797?text=${whatsappMessage}`;

  return (
    <div className="property-page">

      <div className="container">

        <div className="layout">

          {/* IMAGE */}
          <div className="image-wrapper">
            <img
              src={property.image_url}
              alt={property.title}
            />
          </div>

          {/* DETAILS */}
          <div className="details">

            <h1>{property.title}</h1>

            {/* PRICE + BUTTONS ROW */}
            <div className="price-row">

              <div className="price">
                ₦{property.price?.toLocaleString()}
              </div>

              <div className="actions">

                <a
                  href={whatsappLink}
                  target="_blank"
                  className="whatsapp-btn"
                >
                  WhatsApp
                </a>

                <button className="inspect-btn">
                  Book Inspection
                </button>

              </div>

            </div>

            <p className="location">
              {property.location}
            </p>


            {/* FEATURES GRID */}
            <div className="features">

              <div className="feature">
                <span className="label">Bedrooms</span>
                <span className="value">{property.bedrooms || "--"}</span>
              </div>

              <div className="feature">
                <span className="label">Bathrooms</span>
                <span className="value">{property.bathrooms || "--"}</span>
              </div>

              <div className="feature">
                <span className="label">Area</span>
                <span className="value">{property.area || "--"} sqm</span>
              </div>

              <div className="feature">
                <span className="label">Property Type</span>
                <span className="value">{property.type || "Property"}</span>
              </div>

            </div>


            {/* DESCRIPTION */}
            <div className="description">
              {property.description}
            </div>

          </div>

        </div>

      </div>


      <style jsx>{`

        .property-page {
          padding: 80px 20px;
          background: #fff;
        }

        .container {
          max-width: 1200px;
          margin: auto;
        }

        .layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
        }

        .image-wrapper {
          height: 400px;
          overflow: hidden;
          border-radius: 12px;
        }

        .image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .details h1 {
          font-size: 32px;
          margin-bottom: 15px;
        }

        .price-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
          flex-wrap: wrap;
          gap: 15px;
        }

        .price {
          font-size: 26px;
          font-weight: 700;
        }

        .actions {
          display: flex;
          gap: 10px;
        }

        .whatsapp-btn {
          background: #25D366;
          color: white;
          padding: 10px 18px;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 500;
        }

        .inspect-btn {
          background: black;
          color: white;
          border: none;
          padding: 10px 18px;
          border-radius: 6px;
          cursor: pointer;
        }

        .location {
          color: #777;
          margin-bottom: 25px;
        }

        .features {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-bottom: 30px;
        }

        .feature {
          background: #f8f8f8;
          padding: 15px;
          border-radius: 8px;
        }

        .label {
          display: block;
          font-size: 13px;
          color: #777;
        }

        .value {
          font-size: 18px;
          font-weight: 600;
        }

        .description {
          line-height: 1.7;
          color: #444;
        }


        @media (max-width: 900px) {

          .layout {
            grid-template-columns: 1fr;
          }

          .image-wrapper {
            height: 280px;
          }

        }

      `}</style>

    </div>
  );
}