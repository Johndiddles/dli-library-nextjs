import Image from "next/image";

// const DocumentViewer = dynamic(() => import("../PDFViewer/DocumentViewer"), {
//   ssr: false,
// });

const SingleBook = ({ book }) => {
  return (
    <div className="flex flex-col text-[100%] items-center gap-4 shadow pb-8 rounded-3xl text-gray-500 lg:hover:scale-105 hover:shadow-green-600 hover:text-gray-800 duration-500 cursor-pointer w-full overflow-hidden ">
      <div className="w-full h-[360px] flex justify-center items-center overflow-hidden">
        <div className="w-full h-full relative">
          <Image fill src={book?.thumbnail} alt={book?.courseTitle} />
        </div>
      </div>
      <div
        className="font-bold font-montserrat w-full px-4 md:px-8"
        style={{
          fontSize: "clamp(0.7rem, 1cqw, 1.5rem)",
        }}
      >
        <span>{book?.courseCode}</span>
        <div>{book?.courseTitle}</div>
      </div>
    </div>
  );
};

export default SingleBook;
