import Image from "next/image";
import React from "react";
import spinner from "../../assets/spinner.svg";

const FullScreenLoader = ({ message }) => {
  return (
    <div className="fixed z-50 top-0 left-0 bg-white h-screen min-w-screen w-screen flex flex-col justify-center items-center">
      <Image alt="spinner" src={spinner} height={100} width={100} />
      <div className="text-sm text-slate-600 font-montserrat font-semibold uppercase animate-pulse">
        {message && <span>{message}</span>} Please, hang on a bit
      </div>
    </div>
  );
};

export default FullScreenLoader;
