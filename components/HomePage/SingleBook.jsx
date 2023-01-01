import axios from "axios";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import Spinner from "../Loader/Spinner";

const DocumentViewer = dynamic(() => import("../PDFViewer/DocumentViewer"), {
  ssr: false,
});

const SingleBook = ({ book }) => {
  const [isLoading, setIsLoading] = useState("idle");
  const [module, setModule] = useState({});

  useEffect(() => {
    const getSingleBook = async () => {
      setIsLoading("pending");
      const response = await axios.get(`api/modules/${book.id}`);
      setModule(response.data);
      if (response?.status === 200 || response?.status === 201) {
        setIsLoading("success");
      } else {
        setIsLoading("failed");
      }
    };

    getSingleBook();
  }, [book]);

  console.log({ module });

  return (
    <div className="flex flex-col items-center gap-4 shadow pb-8 rounded-3xl text-gray-500 hover:scale-110 hover:shadow-green-600 hover:text-gray-800 duration-500 cursor-pointer w-full overflow-hidden ">
      <div className="w-full h-[360px] flex justify-center items-center overflow-hidden">
        {isLoading === "idle" || isLoading === "pending" ? (
          <div className="w-full h-[360px] flex flex-col gap-4 items-center justify-center">
            <Spinner />
            <div className="text-sm text-slate-600">Loading Preview...</div>
          </div>
        ) : isLoading === "success" ? (
          <DocumentViewer file={module} />
        ) : (
          "failed to load preview"
        )}
      </div>
      <div className="font-bold text-base md:text-lg lg:text-xl font-montserrat w-full px-4 md:px-8">
        <span>{book?.courseCode}</span>
        <div>{book?.courseTitle}</div>
      </div>
    </div>
  );
};

export default SingleBook;
