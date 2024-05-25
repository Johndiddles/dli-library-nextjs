import React, { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { ImEqualizer } from "react-icons/im";
import { IoClose } from "react-icons/io5";
import { allLevels } from "../../constants/levels";

const MobileFilters = ({
  filteredList,
  filters,
  setFilters,
  allDepartments,
  onSubmit,
  allSessions = [],
  isPastQuestions = false,
}) => {
  const [filtersOpen, setFiltersOpen] = useState(false);

  const [activeMenu, setActiveMenu] = useState("");

  const toggleMenu = (menu) => {
    if (activeMenu === menu) {
      setActiveMenu(() => "");
    } else {
      setActiveMenu(() => menu);
    }
  };

  return (
    <div className="flex flex-col lg:hidden">
      <button
        className="w-fit px-4 py-2 rounded-sm border border-gray-200 flex bg-gray-50 items-center gap-2 lg:hidden"
        onClick={() => setFiltersOpen((prev) => !prev)}
      >
        <span>{`(${filteredList?.length})`}</span> Filters <ImEqualizer />
      </button>
      {filtersOpen && (
        <div className="fixed z-50 top-0 left-0 px-4 w-screen h-screen overflow-scroll bg-black bg-opacity-80 backdrop-blur-sm flex justify-center items-center">
          <div className="relative w-full max-w-[360px] bg-[rgba(230,230,230,1)] px-4 py-4">
            <div className="flex justify-between items-center py-4">
              <p className="text-lg font-bold flex items-center gap-2">
                Filters
              </p>
              <button
                className="text-gray-400 hover:text-gray-600 duration-300 bg-transparent text-xl"
                onClick={() => setFiltersOpen((prev) => !prev)}
              >
                <span>
                  <IoClose />
                </span>
              </button>
            </div>
            <div
              className={`overflow-hidden ${filtersOpen ? "h-full" : "h-0"}`}
            >
              {allDepartments?.length > 0 && (
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
                    {allDepartments?.map((dept) => (
                      <div
                        key={dept?._id}
                        className={`hover:text-gray-700 duration-300 cursor-pointer ${
                          filters?.department === dept?.value
                            ? "text-gray-700 font-semibold"
                            : ""
                        }`}
                        onClick={(e) => {
                          toggleMenu("department");
                          setFilters({
                            department: dept?.value?.toLowerCase(),
                          });
                        }}
                      >
                        {dept?.title}
                      </div>
                    ))}
                  </div>
                </div>
              )}

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
                  {allLevels?.map((level, index) => (
                    <div
                      key={index}
                      className={`hover:text-gray-700 duration-300 cursor-pointer ${
                        filters?.level === level.value
                          ? "text-gray-700 font-semibold"
                          : ""
                      }`}
                      onClick={(e) => {
                        toggleMenu("level");
                        setFilters({
                          level: level.value,
                        });
                      }}
                    >
                      {level.label}
                    </div>
                  ))}
                </div>
              </div>

              {isPastQuestions && allSessions?.length > 0 && (
                <div className="flex flex-col py-5 px-2 border-b border-b-gray-300">
                  <div
                    className="flex font-semibold text-gray-700 items-center justify-between cursor-pointer hover:font-semibold duration-300"
                    onClick={() => toggleMenu("session")}
                  >
                    Session{" "}
                    <span className="text-sm text-gray-400 capitalize">
                      {filters?.session !== "" ? `(${filters?.session})` : ""}
                    </span>
                    <span
                      className={`duration-300 text-2xl ${
                        activeMenu === "session"
                          ? "rotate-180 text-gray-700"
                          : "text-gray-400"
                      }`}
                    >
                      <BiChevronDown />
                    </span>
                  </div>
                  <div
                    className={`duration-300 overflow-hidden px-4 flex flex-col gap-2 font-normal text-gray-400 ${
                      activeMenu === "session" ? "h-fit pt-3" : "h-0 pt-0"
                    }`}
                  >
                    <div
                      className={`hover:text-gray-700 duration-300 cursor-pointer ${
                        filters?.session === ""
                          ? "text-gray-700 font-semibold"
                          : ""
                      }`}
                      onClick={(e) => {
                        toggleMenu("session");
                        setFilters({
                          session: "",
                        });
                      }}
                    >
                      All Sessions
                    </div>
                    {allSessions?.map((sess) => (
                      <div
                        key={sess}
                        className={`hover:text-gray-700 duration-300 cursor-pointer ${
                          filters?.session === sess
                            ? "text-gray-700 font-semibold"
                            : ""
                        }`}
                        onClick={(e) => {
                          toggleMenu("session");
                          setFilters({
                            session: sess,
                          });
                        }}
                      >
                        {sess}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              className="w-full mt-4 text-center py-4 rounded-sm font-semibold text-sm bg-gray-900 text-white"
              onClick={() => {
                setActiveMenu("");
                setFiltersOpen((prev) => !prev);
                onSubmit(filters);
              }}
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileFilters;
