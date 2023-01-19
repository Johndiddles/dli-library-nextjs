import axios from "axios";
import Head from "next/head";
import React, { useMemo, useReducer, useState } from "react";
import Banner from "../../components/Banner/Banner";
import SingleModule from "../../components/Modules/SingleModule";
import { BASE_URL } from "../../constants/variables";
import { AiFillFilter } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { BiChevronDown } from "react-icons/bi";

const Modules = (props) => {
  const { modules } = props;
  const [allModules, setAllModules] = useState(JSON.parse(modules));

  const [search, setSearch] = useState("");

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

  const filteredList = useMemo(() => {
    const list = allModules?.filter(
      (module) =>
        (filters?.department === ""
          ? module?.department?.includes("")
          : module?.department?.toLowerCase() === filters?.department) &&
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

    return list;
  }, [allModules, filters]);

  return (
    <div className="h-fit flex flex-col">
      <Head>
        <title>Download Modules</title>
      </Head>
      <Banner
        title="Modules"
        imgUrl="https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1673&q=80"
      />

      <main className="w-full flex flex-col gap-8 px-16 py-8 items-center">
        <section className="max-w-[750px] w-full">
          <form action="" className="w-full flex items-center">
            <input
              className="flex-grow h-full px-8 py-3 text-gray-500 rounded-l-lg outline-none border-none shadow-lg duration-200 scale-y-110"
              type="text"
              placeholder="Search Module..."
              value={search}
              onChange={(e) => setSearch(() => e.target.value)}
            />
            <button
              className="h-full bg-green-600 text-white rounded-r-lg py-3 px-8 hover:bg-green-800 duration-300 flex gap-4 items-center"
              onClick={(e) => {
                e.preventDefault();
                setFilters({ search: search });
              }}
            >
              Search <BsSearch />{" "}
            </button>
          </form>
        </section>
        <section className="w-full flex gap-12 ">
          <div className="w-[280px] flex flex-col gap-4">
            <div className="flex items-center font-semibold gap-3 font-montserrat">
              Filters <AiFillFilter />
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
            {/* <div>Maybe some filters here too</div> */}
            <div className="flex flex-col gap-6 w-full">
              {filteredList?.length > 0 &&
                filteredList.map((module) => (
                  <SingleModule key={module?.id} module={module} />
                ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Modules;

export async function getStaticProps() {
  const response = await axios.get(`${BASE_URL}/modules`);
  const modules = JSON.stringify(response?.data);

  return {
    props: {
      modules,
    },
  };
}
