export default function WhatsAppButton() {

  const phoneNumber = "2349063504797"; // your number
  const message = "Hello Fantabrand Properties, I am interested in your property listings.";

  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-button"
      >
        <img src="/whatsapp.png" alt="WhatsApp" />
      </a>

      <style jsx>{`
        .whatsapp-button {
          position: fixed;
          bottom: 25px;
          right: 25px;
          width: 60px;
          height: 60px;
          background: #25D366;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 25px rgba(0,0,0,0.3);
          z-index: 999;
          animation: pulse 2s infinite;
          transition: transform 0.3s ease;
        }

        .whatsapp-button:hover {
          transform: scale(1.1);
        }

        .whatsapp-button img {
          width: 32px;
          height: 32px;
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7);
          }
          70% {
            box-shadow: 0 0 0 15px rgba(37, 211, 102, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
          }
        }

        @media (max-width: 768px) {
          .whatsapp-button {
            width: 55px;
            height: 55px;
            bottom: 20px;
            right: 20px;
          }

          .whatsapp-button img {
            width: 28px;
            height: 28px;
          }
        }

      `}</style>
    </>
  );
}