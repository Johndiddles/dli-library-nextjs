"use client";

import Head from "next/head";
import React, { useEffect, useMemo, useReducer, useState } from "react";
import Banner from "../../components/Banner/Banner";
import { BASE_URL, CLIENT_ORIGIN } from "../../constants/variables";
import { MdClear } from "react-icons/md";
import ClientSidePagination from "../../components/Pagination/ClientSidePagination";
import Container from "../../components/Container/Container";
import SinglePastQuestion from "../../components/PastQuestions/SinglePastQuestion";
import SearchBox from "../../components/Filters/SearchBox";
import { useRouter } from "next/router";
import MobileFilters from "../../components/Filters/MobileFilters";
import DesktopFilters from "../../components/Filters/DesktopFilters";
// import InFeedsAd from "../../components/GoogleAds/InFeedsAd";

export async function getServerSideProps() {
  const response = await fetch(`${BASE_URL}/past-questions`);
  const departmentResponse = await fetch(`${BASE_URL}/departments`);

  const allPastQuestions = await response?.json();
  const allDepartments = await departmentResponse?.json();

  return {
    props: {
      allPastQuestions,
      allDepartments,
    },
  };
}

const PastQuestions = ({ allPastQuestions, allDepartments }) => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [allSessions, setAllSessions] = useState([]);
  const [filters, setFilters] = useReducer(
    (prev, next) => ({
      ...prev,
      ...next,
    }),
    { department: "", level: "", search: "", session: "" }
  );
  const [queryParameters, setQueryParameters] = useReducer(
    (prev, next) => ({
      ...prev,
      ...next,
    }),
    { department: "", level: "", search: "", session: "" }
  );

  const clearFilters = () => {
    setSearch(() => "");
    router.push("/past-questions");
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
    const list = allPastQuestions?.filter(
      (pastQuestion) =>
        (queryParameters?.department === ""
          ? pastQuestion?.departments?.join(",")?.includes("")
          : pastQuestion?.departments
              ?.join(",")
              ?.toLowerCase()
              ?.split(",")
              ?.includes(queryParameters?.department)) &&
        (queryParameters?.level === ""
          ? pastQuestion?.level?.includes("")
          : pastQuestion?.level?.toLowerCase() ===
            queryParameters?.level?.toLowerCase()) &&
        (queryParameters?.session === ""
          ? pastQuestion?.session?.includes("")
          : pastQuestion?.session === queryParameters?.session) &&
        (pastQuestion?.courseTitle
          ?.toLowerCase()
          ?.includes(queryParameters?.search?.toLowerCase()) ||
          pastQuestion?.courseCode
            ?.toLowerCase()
            ?.includes(queryParameters?.search?.toLowerCase()) ||
          pastQuestion?.departments
            ?.join(",")
            ?.toLowerCase()
            ?.includes(queryParameters?.search?.toLowerCase()) ||
          pastQuestion?.session?.includes(queryParameters?.search))
    );

    setPagination((prev) => ({
      ...prev,
      listLength: list?.length,
      pages: Math.ceil(list?.length / prev?.pageLength),
    }));
    return list;
  }, [allPastQuestions, queryParameters]);

  //** END PAGINATION AND LIST FILTER */

  useEffect(() => {
    let sessions = allPastQuestions?.map((pq) => pq?.session);
    setAllSessions(Array.from(new Set(sessions)));
  }, [allPastQuestions]);

  useEffect(() => {
    setQueryParameters({
      department: router.query.department ?? "",
      level: router.query.level ?? "",
      search: router.query.search ?? "",
      session: router.query.session ?? "",
    });
    setFilters({
      department: router.query.department ?? "",
      level: router.query.level ?? "",
      search: router.query.search ?? "",
      session: router.query.session ?? "",
    });
  }, [router.query]);

  const onFilter = (params) => {
    const query = `?${params.department && `department=${params.department}&`}${
      params.level && `level=${params.level}&`
    }${params.search && `search=${params.search}&`}${
      params.session && `session=${params.session}&`
    }`;

    router.push(`/past-questions${query}`);
  };

  return (
    <div className="h-fit flex flex-col">
      <Head>
        <title>Download Past Questions</title>
        <meta property="og:title" content="Dli Library" key="title" />
        <meta property="og:image:width" content="300" />
        <meta property="og:image:height" content="300" />
        <meta
          property="og:image"
          content={`${CLIENT_ORIGIN}/opengraph-image.png`}
        />
        <meta property="og:image:alt" content="Dli library past questions" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="/favicon/dli-library-website-favicon-white.png"
          sizes="16x16 32x32 64x64"
          type="image/png"
        />
      </Head>

      <Banner
        title="Past Questions"
        imgUrl="https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1673&q=80"
      />

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
              allSessions={allSessions}
              isPastQuestions
            />

            <DesktopFilters
              allDepartments={allDepartments}
              filters={filters}
              setFilters={setFilters}
              onSubmit={onFilter}
              allSessions={allSessions}
              isPastQuestions
            />

            <div className="flex-grow flex flex-col">
              <>
                {(queryParameters?.department !== "" ||
                  queryParameters?.level !== "" ||
                  queryParameters?.search !== "" ||
                  queryParameters?.session !== "") && (
                  <div className="mb-2 flex text-sm text-gray-700 text-opacity-80 items-center">
                    Showing results for{" "}
                    {queryParameters?.department &&
                      `${queryParameters?.department} department, `}
                    {queryParameters?.level &&
                      `${queryParameters?.level} level, `}
                    {queryParameters?.session &&
                      `${queryParameters?.session} session, `}
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
                    ?.map((pastQuestion) => (
                      <SinglePastQuestion
                        key={pastQuestion?.id}
                        pastQuestion={pastQuestion}
                      />
                    ))
                ) : (
                  <div>No result found</div>
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
    </div>
  );
};

export default PastQuestions;
