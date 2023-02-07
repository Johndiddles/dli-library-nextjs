import Link from "next/link";
import React from "react";

const Navigation = ({ mobile, toggleNavbar }) => {
  return (
    <div
      className={`bg-transparent  top-0 left-0 ${
        mobile
          ? "text-gray-300 flex-col gap-0 w-full"
          : "text-gray-300 flex-row gap-12"
      } flex justify-center items-center `}
    >
      <NavbarLink
        toggleNavbar={toggleNavbar}
        mobile={mobile}
        name="Home"
        href="/"
      />
      <NavbarLink
        toggleNavbar={toggleNavbar}
        mobile={mobile}
        name="About"
        href="/about"
      />
      <NavbarLink
        toggleNavbar={toggleNavbar}
        mobile={mobile}
        name="Modules"
        href="/modules"
      />
    </div>
  );
};

export default Navigation;

const NavbarLink = ({ name, href, mobile, toggleNavbar }) => (
  <Link
    className={`hover:text-green-600  font-extrabold  duration-300  uppercase hover:border-green-600 ${
      mobile
        ? " border-b-gray-50 border-opacity-5 w-full flex items-center justify-center py-5 text-3xl"
        : "border-b-2 border-b-transparent py-1 hover:scale-110 font-montserrat"
    }`}
    style={{
      textShadow: mobile ? "" : "0 2px 4px rgba(0,0,0,1)",
      fontFamily: mobile ? "var(--font-cinzel)" : "",
    }}
    href={href}
    onClick={mobile && toggleNavbar}
  >
    {name}
  </Link>
);
