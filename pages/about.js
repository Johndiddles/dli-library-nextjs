"use client";

import Head from "next/head";
import React from "react";
import AboutUs from "../components/AboutUsPage/AboutUs";
import Banner from "../components/Banner/Banner";

const About = () => {
  return (
    <div>
      <Head>
        <title>About DLI Library</title>
      </Head>

      <main className="flex flex-col">
        <Banner
          title="About"
          imgUrl="https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
        />

        <AboutUs />
      </main>
    </div>
  );
};

export default About;
