import Image from "next/image";
import React from "react";
import spinner from "../../assets/spinner.svg";

const Spinner = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <Image alt="spinner" src={spinner} height={100} width={100} />
    </div>
  );
};

export default Spinner;
