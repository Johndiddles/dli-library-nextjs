import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="bg-transparent absolute top-0 left-0 w-screen py-6 px-8 shadow-sm z-20 text-gray-300 flex justify-center items-center gap-12">
      <NavbarLink name="Home" href="/" />
      <NavbarLink name="About" href="/about" />
      <NavbarLink name="Modules" href="/modules" />
    </div>
  );
};

export default Header;

const NavbarLink = ({ name, href }) => (
  <Link
    className="hover:text-green-600 font-montserrat font-extrabold hover:scale-110 py-1 duration-300 border-b-2 border-b-transparent uppercase hover:border-green-600"
    style={{
      textShadow: "0 2px 4px rgba(0,0,0,1)",
    }}
    href={href}
  >
    {name}
  </Link>
);
