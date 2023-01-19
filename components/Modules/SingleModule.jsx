import Image from "next/image";
import React from "react";

import { FaHeart } from "react-icons/fa";
import { BsCloudDownload, BsSearch } from "react-icons/bs";

import reader from "../../assets/woman-reading.png";
import moment from "moment";
import Link from "next/link";

const SingleModule = ({ module }) => {
  return (
    <Link
      href={`/modules/${module?.id}`}
      className="w-full bg-white flex flex-col md:flex-row gap-8 p-4 rounded-md duration-300 cursor-pointer hover:-translate-y-1"
      style={{
        boxShadow: "0px 1px 6px rgba(0,0,0,0.05)",
      }}
    >
      <div
        style={{
          boxShadow: "4px 4px 8px rgba(0,0,0,0.05)",
        }}
        className=" overflow-hidden rounded-t-lg"
      >
        <Image
          src={module?.thumbnail}
          alt="module"
          style={{
            objectFit: "cover",
            objectPosition: "top",
            height: "180px",
          }}
          height={180}
          width={320}
        />
      </div>
      <div className="flex-grow flex">
        <div className="flex-grow flex flex-col gap-2 capitalize">
          <div className="text-base font-montserrat font-extrabold text-gray-700">
            <div>{module?.courseCode}</div> <div>{module?.courseTitle}</div>
          </div>
          <div className="text-xs font-semibold font-montserrat text-gray-400">
            {module?.department}, {`${module?.level} level`}
          </div>
        </div>

        <div className="w-[200px] border-l border-l-gray-200 pl-4 flex flex-col justify-between">
          <div className="flex justify-end text-xl ">
            <button className="outline-none cursor-pointer duration-300 text-gray-400 hover:text-green-600">
              <FaHeart />
            </button>
          </div>
          <div className="text-xs text-gray-400 text-center">
            Date Added: {moment(module?.date).format("DD MMM YYYY")}
          </div>
          <div className="flex flex-col gap-4">
            <button className="w-full text-center flex items-center gap-4 justify-between py-2 rounded-sm font-semibold text-sm duration-300 border border-gray-600 bg-gray-600 text-white hover:bg-gray-800 hover:border-gray-800">
              <div className="flex-grow text-center">Download</div>
              <span className="border-l border-l-gray-100 px-3">
                <BsCloudDownload />
              </span>
            </button>
            <button className="w-full text-center flex items-center gap-4 justify-between py-2 rounded-sm font-semibold text-sm duration-300 border border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
              <div className="flex-grow text-center">Preview</div>
              <span className="border-l border-l-green-600 px-3">
                <BsSearch />
              </span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SingleModule;
