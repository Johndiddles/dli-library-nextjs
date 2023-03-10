import Link from "next/link";
import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import MobileNavigation from "../../Header/MobileNavigation";
import NavProfile from "./NavProfile";
import Logo from "../../Logo/Logo";

const DashboardHeader = () => {
  const [openNav, setOpenNav] = useState(false);
  const toggleNavbar = () => setOpenNav((prev) => !prev);
  return (
    <div className="min-h-[60px] md:min-h-[60px] relative overflow-hidden bg-white">
      <div className="h-full flex items-center justify-between px-8">
        <Link href="/" className="hover:scale-105 duration-300">
          <Logo dark />
        </Link>

        <div>
          <div className="flex-grow hidden sm:flex justify-end items-center gap-10">
            <NavProfile />
          </div>

          {/* <MobileNavigation toggleNavbar={toggleNavbar} openNav={openNav} />

          <div className="sm:hidden">
            <button onClick={toggleNavbar}>
              <FaBars />
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
