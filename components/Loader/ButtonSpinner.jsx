import Image from "next/image";
import React from "react";
import spinner from "../../assets/spinner.svg";
import spinner2 from "../../assets/spinner2.svg";

const ButtonSpinner = ({ color }) => {
  return (
    <div className="w-full flex justify-center items-center">
      <Image
        alt="spinner"
        src={color === "white" ? spinner2 : spinner}
        height={20}
        width={20}
      />
    </div>
  );
};

export default ButtonSpinner;
