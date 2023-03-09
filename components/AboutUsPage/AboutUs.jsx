import React from "react";

const AboutUs = () => {
  return (
    <section className="w-full flex flex-col justify-center items-center text-gray-600 py-8 lg:py-10">
      <div className="w-full max-w-[640px] flex flex-col items-center gap-5 px-8">
        <h2 className="font-montserrat font-bold text-xl sm:text-3xl uppercase text-gray-900">
          <span
            className="text-green-600"
            style={{
              textShadow: "2px 2px 2px rgba(0,125,0,0.125)",
            }}
          >
            About DLI Library
          </span>
        </h2>
        <div
          className="text-justify leading-7 sm:leading-7 font-normal text-base sm:text-lg"
          style={{
            fontFamily: "var(--font-lato)",
            // textShadow: "1px 1px 1px rgba(0,0,0,0.0625)",
          }}
        >
          We are an online platform dedicated to providing access to a vast
          collection of educational resources. Our e-library offers a convenient
          and eco-friendly solution for students and educators to access the
          latest textbooks and learning materials. With our user-friendly
          interface, finding the information you need has never been easier.
          From any device, at any time, you can access a wealth of knowledge and
          unlock your full potential. Join us on a journey of lifelong learning
          and discovery.
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
