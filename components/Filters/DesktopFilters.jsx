import React, { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { ImEqualizer } from "react-icons/im";
import { allLevels } from "../../constants/levels";

const DesktopFilters = ({
  allDepartments,
  filters,
  setFilters,
  onSubmit,
  allSessions = [],
  isPastQuestions = false,
}) => {
  const [activeMenu, setActiveMenu] = useState("");
  const toggleMenu = (menu) => {
    if (activeMenu === menu) {
      setActiveMenu(() => "");
    } else {
      setActiveMenu(() => menu);
    }
  };
  return (
    <div
      className={`w-[280px] hidden duration-300 lg:flex flex-col gap-4 -translate-x-[1000px] lg:translate-x-0`}
    >
      <div className="hidden lg:flex items-center font-semibold gap-3 font-montserrat">
        Filters <ImEqualizer />
      </div>

      <div>
        {allDepartments?.length > 0 && (
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
                  filters?.session === "" ? "text-gray-700 font-semibold" : ""
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
        className="w-full mt-4 text-center py-4 rounded-sm font-semibold text-sm bg-green-600 hover:bg-green-800 duration-300 text-white"
        onClick={() => {
          setActiveMenu("");
          onSubmit(filters);
        }}
      >
        Apply Filters
      </button>
    </div>
  );
};

export default DesktopFilters;
