import React from "react";
import { BsSearch, BsCloudDownload } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";

const HowItWorks = () => {
  return (
    <div className="w-screen">
      <div className="w-full flex flex-col items-center pt-8 pb-16 px-8 lg:px-24 gap-16 shadow-sm">
        <h2 className="uppercase font-semibold text-lg text-center sm:text-xl py-2 px-2 border-b-4 border-b-green-600 rounded-2xl">
          How it Works
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <Cards
            icon={<BsSearch />}
            title="Find Module"
            desc="Find the module you need from our vast collection of modules"
          />
          <Cards
            icon={<AiOutlineEye />}
            title="Preview Module"
            desc="Click on a module of your choice to open a preview of the module"
          />
          <Cards
            icon={<BsCloudDownload />}
            title="Download Module"
            desc="Click on the download button to download any module of your choice"
          />
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;

const Cards = ({ title, desc, icon }) => {
  return (
    <div className="flex flex-col items-center gap-4 text-center px-8">
      <div className="text-[30px] lg:text-[40px] text-green-800 bg-gray-100 w-[60px] h-[60px] lg:w-[80px] lg:h-[80px] rounded-full rounded-tl-none flex items-center justify-center">
        {icon}
      </div>
      <div className="font-bold text-lg text-gray-800 flex flex-col items-center justify-center">
        {title}

        <div className="w-[25px] h-[4px] rounded-full bg-green-600"></div>
      </div>
      <div className="text-sm px-4 sm:px-10 py-3 text-slate-400">{desc}</div>
    </div>
  );
};
