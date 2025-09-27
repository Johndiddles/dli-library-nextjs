import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="flex flex-col gap-6 justify-center items-center bg-slate-800 text-gray-400 pt-16 pb-6">
      <div className="flex gap-8 sm:gap-16 lg:gap-24 flex-wrap justify-center">
        <div className="flex flex-col items-end gap-4 text-right">
          <div
            style={{
              fontFamily: "Oswald",
            }}
            className="font-semibold border-b-2 border-b-green-600  font-montserrat text-gray-200 uppercase"
          >
            DLI Library
          </div>
          <FooterLink name="Home" href="/" />
          <FooterLink name="Modules" href="/modules" />
          <FooterLink name="Past Questions" href="/past-questions" />
        </div>
        <div className="flex flex-col gap-4 text-left">
          <div
            style={{
              fontFamily: "Oswald",
            }}
            className="font-semibold border-b-2 border-b-green-600  font-montserrat text-gray-200 uppercase"
          >
            What you need to know
          </div>
          <FooterLink name="Contact Us" href="/contact" />
          <FooterLink name="About Dli Library" href="/about" />
          {/* <FooterLink name="Terms of Use" href="/" />
          <FooterLink name="Privacy Policy" href="/" /> */}
        </div>
      </div>

      <div className="flex w-screen justify-center text-gray-600 text-sm border-t border-t-slate-700 border-opacity-20 pt-4">
        &copy; 2022 Diddles Inc
      </div>
    </div>
  );
};

export default Footer;

const FooterLink = ({ name, href }) => (
  <Link
    className="hover:text-white border-b-2 border-transparent w-fit hover:border-b-green-600 text-sm py-1 duration-300"
    href={href}
  >
    {name}
  </Link>
);
