import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";

const SearchBox = ({ search, setSearch, filters, setFilters, onSubmit }) => {
  return (
    <form action="" className="w-full flex items-center">
      <input
        className="flex-grow h-full px-4 sm:px-8 py-3 text-gray-500 rounded-l-lg outline-none border-none shadow-lg duration-200 scale-y-110"
        type="text"
        placeholder="Search Module..."
        value={search}
        onChange={(e) => setSearch(() => e.target.value)}
      />
      <button
        aria-label="search"
        className="h-full bg-green-600 text-white rounded-r-lg py-3 px-4 sm:px-8 hover:bg-green-800 duration-300 flex gap-4 items-center"
        onClick={(e) => {
          e.preventDefault();
          setFilters({ search: search });
          onSubmit({ ...filters, search });
        }}
      >
        <span className="hidden sm:block">Search</span> <BsSearch />{" "}
      </button>
    </form>
  );
};

export default SearchBox;
