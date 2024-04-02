"use client";

import axios from "axios";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { BsCloudDownload } from "react-icons/bs";
import { FaHandPointRight, FaHeart, FaLink } from "react-icons/fa";
import Banner from "../../../components/Banner/Banner";
import ButtonSpinner from "../../../components/Loader/ButtonSpinner";
import FullScreenLoader from "../../../components/Loader/FullLoader";
import { BASE_URL, CLIENT_ORIGIN } from "../../../constants/variables";
import addFavorites from "../../../globalFunctions/addBookToFavorites";
import copyLink from "../../../globalFunctions/copyModuleLink";
import { useAuthContext } from "../../context/authContext";
// import { useLoginModalContext } from "../../context/loginModalContext";
import { useSession } from "next-auth/react";
import Container from "../../../components/Container/Container";
import Link from "next/link";
import InFeedsAd from "../../../components/GoogleAds/InFeedsAd";

const DocumentViewer = dynamic(
  () => import("../../../components/PDFViewer/DocumentViewer"),
  {
    ssr: false,
  }
);

const SingleModulePage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = router?.query;

  const { verifyUser, favorite_modules } = useAuthContext();
  // const { setIsModalOpen } = useLoginModalContext();

  const [fetchStatus, setFetchStatus] = useState("idle");
  const [moduleDetails, setModuleDetails] = useState({});
  const [module, setModule] = useState(null);
  // const [departments, setDepartments] = useState([]);
  const [pastQuestions, setPastQuestions] = useState([]);

  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const fetchModule = async () => {
      setFetchStatus("pending");

      try {
        const moduleDetailsResponse = await axios.get(
          `${BASE_URL}/modules/get-single-module/${id}`
        );
        // const moduleResponse = await axios.get(`${BASE_URL}/modules/${id}`);

        await fetch(`${BASE_URL}/modules/${id}`)
          .then((res) =>
            res
              .blob()
              .then((blob) => {
                setModule(blob);
              })
              .catch((error) => {
                // console.log({ error });
              })
          )
          .catch((error) => {
            // console.log({ error });
          });

        setModuleDetails(moduleDetailsResponse?.data);

        setFetchStatus("success");
      } catch (error) {
        setFetchStatus("failed");
      }

      // const fileURL = window.URL.createObjectURL(moduleResponse?.data);
    };

    const fetchResources = async () => {
      // const departmentResponse = await axios.get(`${BASE_URL}/departments`);
      const pastQuestionsResponse = await axios.get(
        `${BASE_URL}/past-questions/get-past-questions-by-course-id/${id}`
      );

      // setDepartments(departmentResponse?.data);
      setPastQuestions(pastQuestionsResponse?.data);
    };

    id && fetchModule();
    id && fetchResources();
  }, [id]);

  console.log({ pastQuestions });

  const downloadBook = async (id) => {
    setDownloading(true);

    // console.log({ book, error, status, message });

    if (module) {
      setDownloading(false);
      const fileURL = window.URL.createObjectURL(module);

      let alink = document.createElement("a");
      alink.href = fileURL;
      alink.download = `${moduleDetails.courseCode} - ${moduleDetails?.courseTitle}.pdf`;
      alink.click();
    } else {
      setDownloading(false);
    }
  };

  const addBookToFavorites = useCallback(() => {
    const action = async () => {
      const response = await addFavorites(id, session.user.token);

      if (response?.message === "success") {
        verifyUser();
      } else if (response?.message === "unauthorized") {
        router.push(
          `${CLIENT_ORIGIN}/api/auth/signin?callbackUrl=/modules/${id}`
        );
      } else {
      }
    };

    return action();
  }, [verifyUser, id, router, session?.user?.token]);

  const isBookFavorites = useMemo(
    () => favorite_modules?.includes(id),
    [favorite_modules, id]
  );

  const addToFavorites = (e) => {
    e.preventDefault();
    if (session) {
      addBookToFavorites();
    } else {
      router.push(
        `${CLIENT_ORIGIN}/api/auth/signin?callbackUrl=/modules/${id}`
      );
    }
  };
  return (
    <div>
      <Head>
        <title>
          Preview
          {moduleDetails?.courseTitle && ` - ${moduleDetails?.courseTitle}`}
        </title>
      </Head>

      <main>
        {fetchStatus === "pending" ? (
          <FullScreenLoader />
        ) : (
          <>
            <Banner
              title={`Preview ${
                moduleDetails?.courseTitle && `- ${moduleDetails?.courseTitle}`
              }`}
              imgUrl={
                "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1673&q=80"
              }
            />

            <Container>
              <InFeedsAd />
              <section className="px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-4 lg:gap-10">
                  <div className="py-1 lg:py-4 flex flex-col items-center lg:items-start gap-4 w-full lg:w-[200px] lg:min-w-[200px]">
                    <div className="flex lg:flex-col justify-center flex-wrap items-center lg:items-start gap-4 sm:gap-8 lg:gap-4 w-full lg:w-[200px] lg:min-w-[200px]">
                      <div className="flex items-center gap-4">
                        <button
                          className="outline-none cursor-pointer text-left text-sm md:text-base duration-300 text-gray-400 hover:text-green-600 flex items-center gap-1 md:gap-4"
                          onClick={() => {
                            copyLink(id, moduleDetails?.courseTitle, "modules");
                          }}
                        >
                          <FaLink />{" "}
                          <span className=" text-gray-500">Copy Link</span>
                        </button>
                      </div>
                      <div className="flex items-center gap-4">
                        <button
                          className={`outline-none cursor-pointer text-left text-sm md:text-base duration-300 text-gray-400 ${
                            isBookFavorites
                              ? "hover:text-red-700"
                              : "hover:text-green-600"
                          } flex items-center gap-1 md:gap-4`}
                          onClick={addToFavorites}
                        >
                          <FaHeart />{" "}
                          <span
                            className={` text-gray-500 ${
                              isBookFavorites
                                ? "hover:text-red-700"
                                : "hover:text-green-600"
                            }`}
                          >
                            {isBookFavorites ? "Remove from" : "Add to"}{" "}
                            favorites
                          </span>
                        </button>
                      </div>
                      <div className="w-fit lg:w-full">
                        <button
                          className="w-full text-center flex items-center gap-1 md:gap-4 justify-between py-2 pl-4 pr-1 rounded-sm font-semibold text-sm duration-300 border border-gray-600 bg-gray-600 text-white hover:bg-gray-800 hover:border-gray-800"
                          onClick={() => downloadBook(module?.id)}
                          disabled={downloading}
                        >
                          <div className="flex-grow text-center">
                            {downloading ? (
                              <ButtonSpinner color="white" />
                            ) : (
                              "Download"
                            )}
                          </div>
                          <span className="lg:border-l border-l-gray-100 px-2">
                            <BsCloudDownload />
                          </span>
                        </button>
                      </div>
                    </div>

                    {pastQuestions?.length > 0 && (
                      <div className="border-t border-t-gray-300 border-opacity-50 pt-4 lg:mt-4 w-full flex flex-col justify-center lg:justify-start">
                        <div className="font-extrabold uppercase text-gray-500 text-base text-center lg:text-left">
                          Past Questions
                        </div>
                        <div className="flex gap-4 lg:gap-2 py-0 lg:py-4 justify-center lg:justify-start flex-wrap w-full">
                          {pastQuestions?.map((question) => (
                            <div
                              key={question?.id}
                              className="lg:mt-0 py-1 lg:py-0 w-fit"
                            >
                              <Link
                                key={question?.id}
                                href={`/past-questions/${question?.id}`}
                                className="text-sm md:text-base flex gap-2 items-center hover:underline"
                              >
                                {question?.session} <FaHandPointRight />
                              </Link>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* open book preview here */}
                  <div className="flex-grow flex flex-col gap-4 items-center">
                    <div className="text-center text-gray-500 uppercase font-montserrat font-semibold px-2">
                      Viewing Pages 1 - 3 of{" "}
                      {`(${moduleDetails?.courseCode}) ${moduleDetails?.courseTitle}`}
                    </div>
                    <div className="w-full min-h-fit">
                      <DocumentViewer file={module} />
                    </div>
                  </div>
                </div>
              </section>
            </Container>
          </>
        )}
      </main>
    </div>
  );
};

export default SingleModulePage;
