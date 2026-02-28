import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ title, description, children }) {
  const pageTitle = title ? `${title} | Fantabrand Properties` : "Fantabrand Properties | Redefining Luxury Living";
  const metaDescription =
    description ||
    "Fantabrand Properties Ltd is a luxury real estate brand specialising in high-end property sales, developments and investment advisory across Nigeria.";

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <div className="layout">
        <Header />
        <main className="main">{children}</main>
        <Footer />
      </div>
    </>
  );
}
