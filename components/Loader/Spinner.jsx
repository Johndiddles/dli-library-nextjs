import Image from "next/image";
import React from "react";
import spinner from "../../assets/spinner.svg";
import spinner2 from "../../assets/spinner2.svg";

const Spinner = ({ color }) => {
  return (
    <div className="w-full flex justify-center items-center">
      <Image
        alt="spinner"
        src={color === "white" ? spinner2 : spinner}
        height={100}
        width={100}
      />
    </div>
  );
};

export default Spinner;
