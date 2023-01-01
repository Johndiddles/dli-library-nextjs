import "../styles/globals.css";

import { Montserrat, Raleway } from "@next/font/google";
import Header from "../components/Header/Header";
import MainLayout from "../components/MainLayout/MainLayout";
import { useEffect } from "react";
import connectDB from "../db/connect";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
});

// connectDB();
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
