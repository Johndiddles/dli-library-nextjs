import React from "react";
import FullScreenLoader from "../Loader/FullLoader";

const LoadingScreen = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <FullScreenLoader />
    </div>
  );
};

export default LoadingScreen;
