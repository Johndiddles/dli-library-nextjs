import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import Logo from "../Logo/Logo";
import Navigation from "./Navigation";
import NavProfile from "./NavProfile";

const MobileNavigation = ({ toggleNavbar, openNav }) => {
  return (
    <div className="block lg:hidden">
      <div
        className={`fixed top-0 left-0 w-full bg-slate-800 bg-opacity-100 backdrop-blur overflow-hidden duration-300 px-4 flex flex-col justify-center items-center ${
          openNav ? "min-h-[100vh] h-fit py-5" : "h-0 py-0"
        }`}
      >
        {openNav && (
          <div className="fixed top-0 left-0 py-2 px-8 bg-slate-900 bg-opacity-50 flex justify-between w-full shadow-lg">
            <Logo />
            <button
              onClick={toggleNavbar}
              className=" top-6 right-8 text-xl text-gray-100 hover:text-gray-200 duration-300 hover:scale-110"
            >
              <AiOutlineClose />
            </button>
          </div>
        )}

        <Navigation mobile toggleNavbar={toggleNavbar} />
        <NavProfile mobile toggleNavbar={toggleNavbar} />
      </div>
    </div>
  );
};

export default MobileNavigation;
