import Head from "next/head";
import Hero from "../components/HomePage/Hero";
import CommonBooks from "../components/HomePage/CommonBooks";
import HowItWorks from "../components/HomePage/HowItWorks";
import { useEffect, useState } from "react";
import FullScreenLoader from "../components/Loader/FullLoader";

import moduleTemplateCopy from "../models/createModule";

const Home = ({ modules }) => {
  return (
    <>
      <Head>
        <title>DLI Library</title>
        <meta name="description" content="Find all UNILAG dli modules" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
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
  const modules = await moduleTemplateCopy.find();

  return {
    props: {
      modules: JSON.stringify(modules),
    },
  };
}
