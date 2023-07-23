"use client";

import axios from "axios";
import Head from "next/head";
import React, { useEffect, useMemo, useReducer, useState } from "react";
import Banner from "../../components/Banner/Banner";
import SingleModule from "../../components/Modules/SingleModule";
import { BASE_URL } from "../../constants/variables";
import { BsCaretLeftFill, BsCaretRightFill, BsSearch } from "react-icons/bs";
import { BiChevronDown } from "react-icons/bi";
import { ImEqualizer } from "react-icons/im";
import { MdClear } from "react-icons/md";
import ClientSidePagination from "../../components/Pagination/ClientSidePagination";
import FullScreenLoader from "../../components/Loader/FullLoader";

export async function getServerSideProps() {
  const response = await fetch(`${BASE_URL}/modules`);

  const allModules = await response?.json();

  return {
    props: {
      allModules,
    },
  };
}

const Modules = ({ allModules }) => {
  // const allModules = JSON.parse(modules);
  const [search, setSearch] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useReducer(
    (prev, next) => ({
      ...prev,
      ...next,
    }),
    { department: "", level: "", search: "" }
  );

  const [activeMenu, setActiveMenu] = useState("");

  const toggleMenu = (menu) => {
    if (activeMenu === menu) {
      setActiveMenu(() => "");
    } else {
      setActiveMenu(() => menu);
    }
  };

  const clearFilters = () => {
    setFilters({ department: "", level: "", search: "" });
    setSearch(() => "");
  };

  //** PAGINATION AND LIST FILTER **//
  //** PAGINATION AND LIST FILTER **//
  const [pagination, setPagination] = useState({
    listLength: 0,
    page: 1,
    pages: 1,
    pageLength: 10,
  });

  const pageStart = useMemo(() => {
    if (pagination?.page === 1) {
      return 1;
    } else if (pagination?.page > 1) {
      return (
        pagination?.page * pagination?.pageLength - (pagination?.pageLength - 1)
      );
    }
  }, [pagination]);

  const pageEnd = useMemo(() => {
    if (pagination?.page * pagination?.pageLength > pagination?.listLength) {
      return pagination?.listLength;
    } else {
      return pagination?.page * pagination?.pageLength;
    }
  }, [pagination]);

  const filteredList = useMemo(() => {
    const list = allModules?.filter(
      (module) =>
        (filters?.department === ""
          ? module?.department?.includes("")
          : module?.department
              ?.toLowerCase()
              ?.split(",")
              ?.includes(filters?.department)) &&
        (filters?.level === ""
          ? module?.level?.includes("")
          : module?.level?.toLowerCase() === filters?.level?.toLowerCase()) &&
        (module?.courseTitle
          ?.toLowerCase()
          ?.includes(filters?.search?.toLowerCase()) ||
          module?.courseCode
            ?.toLowerCase()
            ?.includes(filters?.search?.toLowerCase()) ||
          module?.department
            ?.toLowerCase()
            ?.includes(filters?.search?.toLowerCase()))
    );

    setPagination((prev) => ({
      ...prev,
      listLength: list?.length,
      pages: Math.ceil(list?.length / prev?.pageLength),
    }));
    return list;
  }, [allModules, filters]);

  //** END PAGINATION AND LIST FILTER */

  return (
    <div className="h-fit flex flex-col">
      <Head>
        <title>Download Modules</title>
      </Head>

      <Banner
        title="Modules"
        imgUrl="https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1673&q=80"
      />

      <main className="w-full flex flex-col gap-8 px-4 sm:px-8 md:px-16 py-8 items-center">
        <section className="max-w-[750px] w-full">
          <form action="" className="w-full flex items-center">
            <input
              className="flex-grow h-full px-4 sm:px-8 py-3 text-gray-500 rounded-l-lg outline-none border-none shadow-lg duration-200 scale-y-110"
              type="text"
              placeholder="Search Module..."
              value={search}
              onChange={(e) => setSearch(() => e.target.value)}
            />
            <button
              className="h-full bg-green-600 text-white rounded-r-lg py-3 px-4 sm:px-8 hover:bg-green-800 duration-300 flex gap-4 items-center"
              onClick={(e) => {
                e.preventDefault();
                setFilters({ search: search });
              }}
            >
              <span className="hidden sm:block">Search</span> <BsSearch />{" "}
            </button>
          </form>
        </section>

        <section className="w-full flex flex-col lg:flex-row gap-4 md:gap-8 lg:gap-12 ">
          <div className="flex flex-col lg:hidden">
            <button
              className="w-fit px-4 py-2 rounded-sm border border-gray-200 flex bg-gray-50 items-center gap-2 lg:hidden"
              onClick={() => setFiltersOpen((prev) => !prev)}
            >
              <span>{`(${filteredList?.length})`}</span> Filters <ImEqualizer />
            </button>
            <div
              className={`overflow-hidden ${filtersOpen ? "h-full" : "h-0"}`}
            >
              <div className="flex flex-col py-5 px-2 border-b border-b-gray-300">
                <div
                  className="flex font-semibold text-gray-700 items-center justify-between cursor-pointer hover:font-semibold duration-300"
                  onClick={() => toggleMenu("department")}
                >
                  Department{" "}
                  <span className="text-sm text-gray-400 capitalize">
                    {filters?.department !== ""
                      ? `(${filters?.department})`
                      : ""}
                  </span>
                  <span
                    className={`duration-300 text-2xl ${
                      activeMenu === "department"
                        ? "rotate-180 text-gray-700"
                        : "text-gray-400"
                    }`}
                  >
                    <BiChevronDown />
                  </span>
                </div>
                <div
                  className={`duration-300 overflow-hidden px-4 flex flex-col gap-2 font-normal text-gray-400 ${
                    activeMenu === "department" ? "h-fit pt-3" : "h-0 pt-0"
                  }`}
                >
                  <div
                    className={`hover:text-gray-700 duration-300 cursor-pointer ${
                      filters?.department === ""
                        ? "text-gray-700 font-semibold"
                        : ""
                    }`}
                    onClick={(e) => {
                      toggleMenu("department");
                      setFilters({
                        department: "",
                      });
                    }}
                  >
                    All Departments
                  </div>
                  <div
                    className={`hover:text-gray-700 duration-300 cursor-pointer ${
                      filters?.department === "accounting"
                        ? "text-gray-700 font-semibold"
                        : ""
                    }`}
                    onClick={(e) => {
                      toggleMenu("department");
                      setFilters({
                        department: e.target?.innerText?.toLowerCase(),
                      });
                    }}
                  >
                    Accounting
                  </div>
                  <div
                    className={`hover:text-gray-700 duration-300 cursor-pointer ${
                      filters?.department === "business administration"
                        ? "text-gray-700 font-semibold"
                        : ""
                    }`}
                    onClick={(e) => {
                      toggleMenu("department");
                      setFilters({
                        department: e.target?.innerText?.toLowerCase(),
                      });
                    }}
                  >
                    Business Administration
                  </div>
                  <div
                    className={`hover:text-gray-700 duration-300 cursor-pointer ${
                      filters?.department === "economics"
                        ? "text-gray-700 font-semibold"
                        : ""
                    }`}
                    onClick={(e) => {
                      toggleMenu("department");
                      setFilters({
                        department: e.target?.innerText?.toLowerCase(),
                      });
                    }}
                  >
                    Economics
                  </div>
                  <div
                    className={`hover:text-gray-700 duration-300 cursor-pointer ${
                      filters?.department === "public administration"
                        ? "text-gray-700 font-semibold"
                        : ""
                    }`}
                    onClick={(e) => {
                      toggleMenu("department");
                      setFilters({
                        department: e.target?.innerText?.toLowerCase(),
                      });
                    }}
                  >
                    Public Administration
                  </div>
                  <div
                    className={`hover:text-gray-700 duration-300 cursor-pointer ${
                      filters?.department === "general"
                        ? "text-gray-700 font-semibold"
                        : ""
                    }`}
                    onClick={(e) => {
                      toggleMenu("department");
                      setFilters({
                        department: e.target?.innerText?.toLowerCase(),
                      });
                    }}
                  >
                    General
                  </div>
                </div>
              </div>

              <div className="flex flex-col py-5 px-2 border-b border-b-gray-300">
                <div
                  className="flex font-semibold text-gray-700 items-center justify-between cursor-pointer hover:font-semibold duration-300"
                  onClick={() => toggleMenu("level")}
                >
                  Level{" "}
                  <span className="text-sm text-gray-400 capitalize">
                    {filters?.level !== "" ? `(${filters?.level})` : ""}
                  </span>
                  <span
                    className={`duration-300 text-2xl ${
                      activeMenu === "level"
                        ? "rotate-180 text-gray-700"
                        : "text-gray-400"
                    }`}
                  >
                    <BiChevronDown />
                  </span>
                </div>
                <div
                  className={`duration-300 overflow-hidden px-4 flex flex-col gap-2 font-normal text-gray-400 ${
                    activeMenu === "level" ? "h-fit pt-3" : "h-0 pt-0"
                  }`}
                >
                  <div
                    className={`hover:text-gray-700 duration-300 cursor-pointer ${
                      filters?.level === "" ? "text-gray-700 font-semibold" : ""
                    }`}
                    onClick={(e) => {
                      toggleMenu("level");
                      setFilters({
                        level: "",
                      });
                    }}
                  >
                    All Levels
                  </div>
                  <div
                    className={`hover:text-gray-700 duration-300 cursor-pointer ${
                      filters?.level === "100"
                        ? "text-gray-700 font-semibold"
                        : ""
                    }`}
                    onClick={(e) => {
                      toggleMenu("level");
                      setFilters({
                        level: "100",
                      });
                    }}
                  >
                    100 Level
                  </div>
                  <div
                    className={`hover:text-gray-700 duration-300 cursor-pointer ${
                      filters?.level === "200"
                        ? "text-gray-700 font-semibold"
                        : ""
                    }`}
                    onClick={(e) => {
                      toggleMenu("level");
                      setFilters({
                        level: "200",
                      });
                    }}
                  >
                    200 Level
                  </div>
                  <div
                    className={`hover:text-gray-700 duration-300 cursor-pointer ${
                      filters?.level === "300"
                        ? "text-gray-700 font-semibold"
                        : ""
                    }`}
                    onClick={(e) => {
                      toggleMenu("level");
                      setFilters({
                        level: "300",
                      });
                    }}
                  >
                    300 Level
                  </div>
                  <div
                    className={`hover:text-gray-700 duration-300 cursor-pointer ${
                      filters?.level === "400"
                        ? "text-gray-700 font-semibold"
                        : ""
                    }`}
                    onClick={(e) => {
                      toggleMenu("level");
                      setFilters({
                        level: "400",
                      });
                    }}
                  >
                    400 Level
                  </div>
                  <div
                    className={`hover:text-gray-700 duration-300 cursor-pointer ${
                      filters?.level === "500"
                        ? "text-gray-700 font-semibold"
                        : ""
                    }`}
                    onClick={(e) => {
                      toggleMenu("level");
                      setFilters({
                        level: "500",
                      });
                    }}
                  >
                    500 Level
                  </div>
                  <div
                    className={`hover:text-gray-700 duration-300 cursor-pointer ${
                      filters?.level === "general"
                        ? "text-gray-700 font-semibold"
                        : ""
                    }`}
                    onClick={(e) => {
                      toggleMenu("level");
                      setFilters({
                        level: "general",
                      });
                    }}
                  >
                    General
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`w-[280px] hidden duration-300 lg:flex flex-col gap-4 -translate-x-[1000px] lg:translate-x-0`}
          >
            <div className="hidden lg:flex items-center font-semibold gap-3 font-montserrat">
              Filters <ImEqualizer />
            </div>

            <div>
              <div className="flex flex-col py-5 px-2 border-b border-b-gray-300">
                <div
                  className="flex font-semibold text-gray-700 items-center justify-between cursor-pointer hover:font-semibold duration-300"
                  onClick={() => toggleMenu("department")}
                >
                  Department{" "}
                  <span
                    className={`duration-300 text-2xl ${
                      activeMenu === "department"
                        ? "rotate-180 text-gray-700"
                        : "text-gray-400"
                    }`}
                  >
                    <BiChevronDown />
                  </span>
                </div>
                <div
                  className={`duration-300 overflow-hidden px-4 flex flex-col gap-2 font-normal text-gray-400 ${
                    activeMenu === "department" ? "h-fit pt-3" : "h-0 pt-0"
                  }`}
                >
                  <div
                    className={`hover:text-gray-700 duration-300 cursor-pointer ${
                      filters?.department === ""
                        ? "text-gray-700 font-semibold"
                        : ""
                    }`}
                    onClick={(e) =>
                      setFilters({
                        department: "",
                      })
                    }
                  >
                    All Departments
                  </div>
                  <div
                    className={`hover:text-gray-700 duration-300 cursor-pointer ${
                      filters?.department === "accounting"
                        ? "text-gray-700 font-semibold"
                        : ""
                    }`}
                    onClick={(e) =>
                      setFilters({
                        department: e.target?.innerText?.toLowerCase(),
                      })
                    }
                  >
                    Accounting
                  </div>
                  <div
                    className={`hover:text-gray-700 duration-300 cursor-pointer ${
                      filters?.department === "business administration"
                        ? "text-gray-700 font-semibold"
                        : ""
                    }`}
                    onClick={(e) =>
                      setFilters({
                        department: e.target?.innerText?.toLowerCase(),
                      })
                    }
                  >
                    Business Administration
                  </div>
                  <div
                    className={`hover:text-gray-700 duration-300 cursor-pointer ${
                      filters?.department === "economics"
                        ? "text-gray-700 font-semibold"
                        : ""
                    }`}
                    onClick={(e) =>
                      setFilters({
                        department: e.target?.innerText?.toLowerCase(),
                      })
                    }
                  >
                    Economics
                  </div>
                  <div
                    className={`hover:text-gray-700 duration-300 cursor-pointer ${
                      filters?.department === "public administration"
                        ? "text-gray-700 font-semibold"
                        : ""
                    }`}
                    onClick={(e) =>
                      setFilters({
                        department: e.target?.innerText?.toLowerCase(),
                      })
                    }
                  >
                    Public Administration
                  </div>
                  <div
                    className={`hover:text-gray-700 duration-300 cursor-pointer ${
                      filters?.department === "general"
                        ? "text-gray-700 font-semibold"
                        : ""
                    }`}
                    onClick={(e) =>
                      setFilters({
                        department: e.target?.innerText?.toLowerCase(),
                      })
                    }
                  >
                    General
                  </div>
                </div>
              </div>

              <div className="flex flex-col py-5 px-2 border-b border-b-gray-300">
                <div
                  className="flex font-semibold text-gray-700 items-center justify-between cursor-pointer hover:font-semibold duration-300"
                  onClick={() => toggleMenu("level")}
                >
                  Level{" "}
                  <span
                    className={`duration-300 text-2xl ${
                      activeMenu === "level"
                        ? "rotate-180 text-gray-700"
                        : "text-gray-400"
                    }`}
                  >
                    <BiChevronDown />
                  </span>
                </div>
                <div
                  className={`duration-300 overflow-hidden px-4 flex flex-col gap-2 font-normal text-gray-400 ${
                    activeMenu === "level" ? "h-fit pt-3" : "h-0 pt-0"
                  }`}
                >
                  <div
                    className={`hover:text-gray-700 duration-300 cursor-pointer ${
                      filters?.level === "" ? "text-gray-700 font-semibold" : ""
                    }`}
                    onClick={(e) =>
                      setFilters({
                        level: "",
                      })
                    }
                  >
                    All Levels
                  </div>
                  <div
                    className={`hover:text-gray-700 duration-300 cursor-pointer ${
                      filters?.level === "100"
                        ? "text-gray-700 font-semibold"
                        : ""
                    }`}
                    onClick={(e) =>
                      setFilters({
                        level: "100",
                      })
                    }
                  >
                    100 Level
                  </div>
                  <div
                    className={`hover:text-gray-700 duration-300 cursor-pointer ${
                      filters?.level === "200"
                        ? "text-gray-700 font-semibold"
                        : ""
                    }`}
                    onClick={(e) =>
                      setFilters({
                        level: "200",
                      })
                    }
                  >
                    200 Level
                  </div>
                  <div
                    className={`hover:text-gray-700 duration-300 cursor-pointer ${
                      filters?.level === "300"
                        ? "text-gray-700 font-semibold"
                        : ""
                    }`}
                    onClick={(e) =>
                      setFilters({
                        level: "300",
                      })
                    }
                  >
                    300 Level
                  </div>
                  <div
                    className={`hover:text-gray-700 duration-300 cursor-pointer ${
                      filters?.level === "400"
                        ? "text-gray-700 font-semibold"
                        : ""
                    }`}
                    onClick={(e) =>
                      setFilters({
                        level: "400",
                      })
                    }
                  >
                    400 Level
                  </div>
                  <div
                    className={`hover:text-gray-700 duration-300 cursor-pointer ${
                      filters?.level === "500"
                        ? "text-gray-700 font-semibold"
                        : ""
                    }`}
                    onClick={(e) =>
                      setFilters({
                        level: "500",
                      })
                    }
                  >
                    500 Level
                  </div>
                  <div
                    className={`hover:text-gray-700 duration-300 cursor-pointer ${
                      filters?.level === "general"
                        ? "text-gray-700 font-semibold"
                        : ""
                    }`}
                    onClick={(e) =>
                      setFilters({
                        level: "general",
                      })
                    }
                  >
                    General
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-grow flex flex-col">
            <>
              {(filters?.department !== "" ||
                filters?.level !== "" ||
                filters?.search !== "") && (
                <div className="mb-2 flex text-sm text-gray-700 text-opacity-80 items-center">
                  Showing results for{" "}
                  {filters?.department && `${filters?.department} department, `}
                  {filters?.level && `${filters?.level} level, `}
                  {filters?.search && `keyword: ${filters?.search}.`}
                  <span>
                    <button
                      className="border border-gray-100 sm:ml-4 px-2 py-1 text-gray-600 flex gap-1 text-sm font-semibold items-center duration-500 hover:text-gray-100 hover:bg-gray-800 rounded"
                      onClick={() => clearFilters()}
                    >
                      <span>
                        <MdClear />
                      </span>
                      Clear<span className="hidden sm:block"> filters</span>
                    </button>
                  </span>
                </div>
              )}
            </>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex flex-col gap-6 w-full">
              {filteredList?.length > 0 ? (
                filteredList
                  ?.slice(pageStart - 1, pageEnd)
                  ?.map((module) => (
                    <SingleModule key={module?.id} module={module} />
                  ))
              ) : (
                <div>No result found</div>
              )}
            </div>

            <ClientSidePagination
              pagination={pagination}
              setPagination={setPagination}
              pageStart={pageStart}
              pageEnd={pageEnd}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Modules;
