import Image from "next/image";
import React from "react";
import logo from "../../assets/logo/png/logo-white.png";
import { AiOutlineMinus } from "react-icons/ai";
import Link from "next/link";
import Logo from "../Logo/Logo";

const BrandAndLogo = () => {
  return (
    <Link href="/" className="hover:scale-105 duration-300">
      <Logo />
    </Link>
  );
};

export default BrandAndLogo;
