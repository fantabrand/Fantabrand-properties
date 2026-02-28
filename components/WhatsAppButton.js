"use client";

export default function WhatsAppButton() {

  const phoneNumber = "2349063504797"; // replace with your real number

  const message = encodeURIComponent(
    "Hello Fantabrand Properties, I am interested in your property listings."
  );

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (

    <div className="fixed bottom-6 right-6 z-50 group">

      {/* Tooltip */}
      <div className="absolute right-16 bottom-1/2 translate-y-1/2 bg-black text-white text-sm px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition duration-300 whitespace-nowrap shadow-lg">

        Chat with Fantabrand

      </div>

      {/* Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
      >

        <div className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition transform hover:scale-110">

          {/* WhatsApp Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            width="28"
            height="28"
            fill="white"
          >
            <path d="M16 .396C7.163.396 0 7.559 0 16.396c0 2.885.756 5.699 2.192 8.175L0 32l7.65-2.159a15.938 15.938 0 0 0 8.35 2.297c8.837 0 16-7.163 16-16S24.837.396 16 .396zm0 29.364c-2.553 0-5.054-.67-7.248-1.937l-.518-.303-4.54 1.281 1.214-4.421-.337-.54A13.353 13.353 0 0 1 2.646 16.4c0-7.374 5.98-13.354 13.354-13.354S29.354 9.026 29.354 16.4 23.374 29.76 16 29.76zm7.421-10.106c-.405-.202-2.397-1.183-2.769-1.319-.371-.135-.642-.202-.913.203-.27.405-1.048 1.319-1.285 1.59-.236.27-.473.304-.878.101-.405-.202-1.711-.631-3.26-2.013-1.205-1.076-2.019-2.405-2.256-2.81-.236-.405-.025-.624.177-.826.182-.181.405-.473.608-.709.202-.236.27-.405.405-.675.135-.27.067-.506-.034-.709-.101-.202-.913-2.196-1.251-3.008-.329-.792-.664-.684-.913-.696l-.777-.014c-.27 0-.709.101-1.081.506-.371.405-1.419 1.386-1.419 3.379 0 1.994 1.453 3.921 1.656 4.191.202.27 2.863 4.37 6.938 6.126.97.419 1.726.67 2.315.857.973.309 1.86.265 2.561.161.781-.116 2.397-.98 2.737-1.926.338-.945.338-1.756.236-1.926-.101-.169-.371-.27-.777-.472z"/>
          </svg>

        </div>

      </a>

    </div>

  );

}
