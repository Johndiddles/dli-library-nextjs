"use client";
import { useSession } from "next-auth/react";

import axios from "axios";
import Head from "next/head";
import React, { useEffect, useMemo, useReducer, useState } from "react";
import Banner from "../../components/Banner/Banner";
import SingleModule from "../../components/Modules/SingleModule";
import { BASE_URL, CLIENT_ORIGIN } from "../../constants/variables";
import { BsSearch } from "react-icons/bs";
import { MdClear } from "react-icons/md";
import ClientSidePagination from "../../components/Pagination/ClientSidePagination";
import FullScreenLoader from "../../components/Loader/FullLoader";
import Container from "../../components/Container/Container";
import { useRouter } from "next/router";
import DesktopFilters from "../../components/Filters/DesktopFilters";
import MobileFilters from "../../components/Filters/MobileFilters";
import SearchBox from "../../components/Filters/SearchBox";

export async function getServerSideProps() {
  const departmentResponse = await fetch(`${BASE_URL}/departments`);

  const allDepartments = await departmentResponse?.json();

  return {
    props: {
      allDepartments,
    },
  };
}

const FavouriteModules = ({ allDepartments }) => {
  const router = useRouter();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push(
        `${CLIENT_ORIGIN}/api/auth/signin?callbackUrl=/modules/favourite-modules`
      );
    },
  });

  if (session)
    return <FavouriteModulesPageContent allDepartments={allDepartments} />;
  else return <></>;
};
const FavouriteModulesPageContent = ({ allDepartments }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [allModules, setAllModules] = useState([]);
  const [fetchModulesStatus, setFetchModulesStatus] = useState("idle");
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useReducer(
    (prev, next) => ({
      ...prev,
      ...next,
    }),
    { department: "", level: "", search: "" }
  );
  const [queryParameters, setQueryParameters] = useReducer(
    (prev, next) => ({
      ...prev,
      ...next,
    }),
    { department: "", level: "", search: "" }
  );

  const clearFilters = () => {
    setSearch(() => "");
    router.push("/modules/favourite-modules");
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
        (queryParameters?.department === ""
          ? module?.department?.includes("")
          : module?.department
              ?.toLowerCase()
              ?.split(",")
              ?.includes(queryParameters?.department)) &&
        (queryParameters?.level === ""
          ? module?.level?.includes("")
          : module?.level?.toLowerCase() ===
            queryParameters?.level?.toLowerCase()) &&
        (module?.courseTitle
          ?.toLowerCase()
          ?.includes(queryParameters?.search?.toLowerCase()) ||
          module?.courseCode
            ?.toLowerCase()
            ?.includes(queryParameters?.search?.toLowerCase()) ||
          module?.department
            ?.toLowerCase()
            ?.includes(queryParameters?.search?.toLowerCase()))
    );

    setPagination((prev) => ({
      ...prev,
      listLength: list?.length,
      pages: Math.ceil(list?.length / prev?.pageLength),
    }));
    return list;
  }, [allModules, queryParameters]);
  //** END PAGINATION AND LIST FILTER */

  useEffect(() => {
    const fetchModules = async () => {
      setFetchModulesStatus("pending");
      const response = await axios.get(`${BASE_URL}/modules/favourites`, {
        headers: {
          Authorization: `Bearer ${session?.user?.token}`,
        },
      });

      if (response?.status === 200) {
        setAllModules(response?.data?.modules);
        setFetchModulesStatus("success");
      } else {
        if (response?.status === 401) {
          router.push("/login");
          setFetchModulesStatus("failed");
        }
      }
    };

    fetchModules();
    setQueryParameters({
      department: router.query.department ?? "",
      level: router.query.level ?? "",
      search: router.query.search ?? "",
    });
    setFilters({
      department: router.query.department ?? "",
      level: router.query.level ?? "",
      search: router.query.search ?? "",
    });
  }, [router, session?.user?.token]);

  const onFilter = (params) => {
    const query = `?${params.department && `department=${params.department}&`}${
      params.level && `level=${params.level}&`
    }${params.search && `search=${params.search}&`}`;

    router.push(`/modules/favourite-modules${query}`);
  };

  return (
    <div className="h-fit flex flex-col">
      <Head>
        <title>Liked Modules</title>
      </Head>

      <Banner
        title="Liked Modules"
        imgUrl="https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1673&q=80"
      />

      {fetchModulesStatus === "pending" ? (
        <FullScreenLoader />
      ) : (
        <main className="w-full flex flex-col gap-8 px-4 sm:px-8 md:px-16 py-8 items-center">
          <section className="max-w-[750px] w-full">
            <SearchBox
              search={search}
              setSearch={setSearch}
              filters={filters}
              setFilters={setFilters}
              onSubmit={onFilter}
            />

            {/* <InfeedsAd /> */}
          </section>
          <Container>
            <section className="w-full flex flex-col lg:flex-row gap-4 md:gap-8 lg:gap-12 ">
              <MobileFilters
                allDepartments={allDepartments}
                filteredList={filteredList}
                filters={filters}
                setFilters={setFilters}
                onSubmit={onFilter}
              />

              <DesktopFilters
                allDepartments={allDepartments}
                filters={filters}
                setFilters={setFilters}
                onSubmit={onFilter}
              />

              <div className="flex-grow flex flex-col">
                <>
                  {(queryParameters?.department !== "" ||
                    queryParameters?.level !== "" ||
                    queryParameters?.search !== "") && (
                    <div className="mb-2 flex text-sm text-gray-700 text-opacity-80 items-center">
                      Showing results for{" "}
                      {queryParameters?.department &&
                        `${queryParameters?.department} department, `}
                      {queryParameters?.level &&
                        `${queryParameters?.level} level, `}
                      {queryParameters?.search &&
                        `keyword: ${queryParameters?.search}.`}
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
                    <div>You have not liked any module.</div>
                  )}
                </div>
                {filteredList?.length > 0 && (
                  <ClientSidePagination
                    pagination={pagination}
                    setPagination={setPagination}
                    pageStart={pageStart}
                    pageEnd={pageEnd}
                  />
                )}
              </div>
            </section>
          </Container>
        </main>
      )}
    </div>
  );
};

export default FavouriteModules;
