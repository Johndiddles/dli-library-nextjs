import "../styles/globals.css";

import { Montserrat, Raleway } from "@next/font/google";
import MainLayout from "../components/MainLayout/layout";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
});

export default function App({ Component, pageProps }) {
  return (
    <MainLayout>
      <main
        className={`${raleway.variable} ${montserrat.variable} font-serif font-sans`}
      >
        <Component {...pageProps} />
      </main>
    </MainLayout>
  );
}
