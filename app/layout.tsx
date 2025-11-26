import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Fantabrand Properties – Redefining Luxury Living",
  description:
    "Fantabrand Properties offers premium real estate solutions in Nigeria. Buy, sell, and invest in luxury homes.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
