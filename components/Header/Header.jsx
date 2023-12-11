import Link from "next/link";
import React, { useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaBars } from "react-icons/fa";
import BrandAndLogo from "./BrandAndLogo";
import MobileNavigation from "./MobileNavigation";
import Navigation from "./Navigation";
import NavProfile from "./NavProfile";

const Header = () => {
  const [openNav, setOpenNav] = useState(false);
  const mobileNavRef = useRef(null);
  const toggleNavbar = () => setOpenNav((prev) => !prev);
  return (
    <div className="bg-transparent absolute top-0 left-0 w-screen py-2 px-8 shadow-sm z-20 text-gray-300 flex justify-between items-center gap-12">
      <div>
        <BrandAndLogo />
      </div>

      <div className="flex-grow hidden lg:flex justify-end items-center gap-10">
        <Navigation />
        <NavProfile />
      </div>

      <MobileNavigation toggleNavbar={toggleNavbar} openNav={openNav} />

      <div className="lg:hidden">
        <button onClick={toggleNavbar}>
          <FaBars />
        </button>
      </div>
    </div>
  );
};

export default Header;
