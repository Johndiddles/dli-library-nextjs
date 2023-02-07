"use client";

import Head from "next/head";
import Hero from "../components/HomePage/Hero";
import CommonBooks from "../components/HomePage/CommonBooks";
import HowItWorks from "../components/HomePage/HowItWorks";

import moduleTemplateCopy, { update } from "../models/createModule";
import storeModuleTemplateCopy from "../models/storeModule";
import axios from "axios";
import { BASE_URL } from "../constants/variables";

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
        <CommonBooks books={JSON.parse(modules)} />
      </main>
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const response = await axios.get(`${BASE_URL}/get-recent-modules`);

  const modules = JSON.stringify(response?.data);

  return {
    props: {
      modules,
    },
  };
}
