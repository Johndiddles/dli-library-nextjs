import React from "react";
import SingleBook from "./SingleBook";

const CommonBooks = ({ books }) => {
  // console.log({ books });
  return (
    <div className="w-screen">
      <div className="w-full flex flex-col gap-10 items-center py-8 px-8 lg:px-24 bg-gray-100">
        <h2 className="uppercase font-semibold text-center text-lg sm:text-xl py-2 px-2 border-b-4 border-b-green-600 rounded-2xl">
          Frequently Downloaded Books
        </h2>

        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-between items-center w-full py-5">
          {books?.slice(0, 3)?.map((book) => (
            <SingleBook key={book?.id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommonBooks;
