import './globals.css';

export const metadata = {
  title: 'Fantabrand Properties',
  description: 'Redefining luxury living',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
