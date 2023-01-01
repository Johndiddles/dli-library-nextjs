import React from "react";
import FullScreenLoader from "../components/Loader/FullLoader";

const loading = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <FullScreenLoader />
    </div>
  );
};

export default loading;
