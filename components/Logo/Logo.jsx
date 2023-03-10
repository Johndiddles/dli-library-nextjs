import React from "react";
import { AiOutlineMinus } from "react-icons/ai";

const Logo = ({ dark }) => {
  return (
    <div className="flex flex-col items-center ">
      <div className="flex gap-1 text-green-600 text-3xl uppercase font-extrabold font-montserrat">
        D<span className={`${dark ? "text-slate-800" : "text-white"}`}>L</span>I
      </div>
      <div className="flex items-center font-raleway font-normal uppercase text-xs ">
        <span>
          <AiOutlineMinus />
        </span>
        Library
        <span>
          <AiOutlineMinus />
        </span>
      </div>
    </div>
  );
};

export default Logo;
