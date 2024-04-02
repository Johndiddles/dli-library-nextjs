"use client";

import Head from "next/head";
import Hero from "../components/HomePage/Hero";
import CommonBooks from "../components/HomePage/CommonBooks";
import HowItWorks from "../components/HomePage/HowItWorks";
import { BASE_URL } from "../constants/variables";
import InFeedsAd from "../components/GoogleAds/InFeedsAd";

const Home = ({ modules }) => {
  return (
    <>
      <Head>
        <title>DLI Library</title>
        <meta name="description" content="Find all UNILAG dli modules" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="/favicon/dli-library-website-favicon-white.png"
          sizes="16x16 32x32 64x64"
          type="image/png"
        />
      </Head>
      <main className="flex flex-col min-h-screen w-screen">
        <Hero />
        <HowItWorks />
        <InFeedsAd />
        <CommonBooks books={modules} />
      </main>
    </>
  );
};

export default Home;

export async function getServerSideProps() {
  const response = await fetch(`${BASE_URL}/modules/recent`);
  const modules = await response?.json();

  return {
    props: {
      modules,
    },
  };
}
