import dynamic from "next/dynamic";

const DocumentViewer = dynamic(() => import("../PDFViewer/DocumentViewer"), {
  ssr: false,
});

const SingleBook = ({ book, file }) => {
  return (
    <div className="flex flex-col items-center gap-4 shadow pb-8 rounded-3xl text-gray-500 lg:hover:scale-105 hover:shadow-green-600 hover:text-gray-800 duration-500 cursor-pointer w-full overflow-hidden ">
      <div className="w-full h-[360px] flex justify-center items-center overflow-hidden">
        <DocumentViewer file={file} />
      </div>
      <div className="font-bold text-base md:text-lg lg:text-xl font-montserrat w-full px-4 md:px-8">
        <span>{book?.courseCode}</span>
        <div>{book?.courseTitle}</div>
      </div>
    </div>
  );
};

export default SingleBook;
