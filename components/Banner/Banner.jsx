import React from "react";

const Banner = ({ title, imgUrl }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="min-h-[35vh] relative rounded-b-[30px] lg:rounded-b-[60px] overflow-hidden"
    >
      <div
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.75), rgba(0,0,0,0) 30%, rgba(0,0,0,0.5) 90%)",
        }}
        className="w-full h-full absolute flex flex-col justify-end items-center py-8 text-white "
      >
        <div
          style={{
            textShadow: "0 2px 4px rgba(0,0,0,1)",
          }}
          className="font-montserrat font-bold text-3xl uppercase"
        >
          <span
            style={{
              textShadow: "0 2px 0px rgba(0,0,0,0.7)",
            }}
            className="text-green-600"
          >{`<`}</span>
          {` ${title} `}
          <span
            style={{
              textShadow: "0 2px 0px rgba(0,0,0,0.7)",
            }}
            className="text-green-600"
          >{`/>`}</span>
        </div>
      </div>
    </div>
  );
};

export default Banner;
