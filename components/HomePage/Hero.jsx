import { useRouter } from "next/router";
import React from "react";
import Container from "../Container/Container";

const Hero = () => {
  const router = useRouter();
  return (
    <section className="w-full min-h-[520px] sm:min-h-[70vh] h-fit relative text-white justify-center items-start bg-[rgba(0,0,0,0.7)] bg-[url('/dli-bg.avif')] bg-cover rounded-b-[40px] lg:rounded-b-[100px] overflow-hidden">
      <div className="bg-slate-800 bg-opacity-70 backdrop-blur-[2px] absolute  w-full min-h-full flex justify-center md:justify-start items-center  flex-col md:flex-row  gap-10 px-8 lg:px-24 py-24">
        <Container>
          <div className="flex flex-col gap-8 justify-center items-center sm:items-start w-full md:w-1/2">
            <h1 className="text-3xl lg:text-5xl capitalize font-montserrat font-extrabold">
              <span className="text-green-600">DLI</span>{" "}
              <span className="text-gray-100">Library</span>
            </h1>
            <p className="text-base lg:text-lg text-center sm:text-left font-normal lg:font-medium font-poppins text-gray-100 w-full lg:w-2/3 max-w-[560px]">
              Welcome to the future of learning! Access your study modules soft
              copies anytime, anywhere with ease at{" "}
              <span className="text-green-600 font-semibold">DLI</span> Library.
            </p>
            <button
              className="w-[150px] font-raleway whitespace-nowrap mt-8 bg-gradient-to-br from-green-600 to-blue-800 bg-opacity-0  text-white font-semibold px-6 py-3 rounded-full outline-none button
        "
              onClick={() => router.push("/modules")}
            >
              Find Modules
            </button>
          </div>
        </Container>
      </div>
    </section>
  );
};

export default Hero;
