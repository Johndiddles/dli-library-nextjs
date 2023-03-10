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
import { FaHeart, FaLink } from "react-icons/fa";
import Banner from "../../../components/Banner/Banner";
import ButtonSpinner from "../../../components/Loader/ButtonSpinner";
import FullScreenLoader from "../../../components/Loader/FullLoader";
import { BASE_URL } from "../../../constants/variables";
import addFavorites from "../../../globalFunctions/addBookToFavorites";
import copyLink from "../../../globalFunctions/copyModuleLink";
import { useAuthContext } from "../../context/authContext";
import { useLoginModalContext } from "../../context/loginModalContext";

const DocumentViewer = dynamic(
  () => import("../../../components/PDFViewer/DocumentViewer"),
  {
    ssr: false,
  }
);

const SingleModulePage = () => {
  const router = useRouter();
  const { id } = router?.query;

  const { verifyUser, user, isAuth } = useAuthContext();
  const { setIsModalOpen } = useLoginModalContext();
  const { favorite_modules } = user;
  const [fetchStatus, setFetchStatus] = useState("idle");
  const [moduleDetails, setModuleDetails] = useState({});
  const [module, setModule] = useState(null);

  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const fetchModule = async () => {
      setFetchStatus("pending");

      try {
        const moduleDetailsResponse = await axios.get(
          `${BASE_URL}/get-single-module/${id}`
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

    id && fetchModule();
  }, [id]);

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
      const response = await addFavorites(id);

      if (response?.message === "success") {
        verifyUser();
      } else if (response?.message === "unauthorized") {
        setIsModalOpen((prev) => !prev);
      } else {
      }
    };

    return action();
  }, [verifyUser, id, setIsModalOpen]);

  const isBookFavorites = useMemo(
    () => favorite_modules?.includes(id),
    [favorite_modules, id]
  );

  const addToFavorites = (e) => {
    e.preventDefault();
    if (isAuth) {
      addBookToFavorites();
    } else {
      setIsModalOpen(true);
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
            <section className="px-4 md:px-10 py-8">
              <div className="flex gap-4 sm:gap-8 lg:gap-10">
                <div className="py-8 flex flex-col items-center lg:items-start gap-4 w-fit lg:w-[200px] lg:min-w-[200px]">
                  <div className="flex items-center gap-4">
                    <button
                      className="outline-none cursor-pointer text-left duration-300 text-gray-400 hover:text-green-600 flex items-center gap-4"
                      onClick={() => {
                        copyLink(id, moduleDetails?.courseTitle);
                      }}
                    >
                      <FaLink />{" "}
                      <span className="hidden lg:block text-gray-500">
                        Copy to clipboard
                      </span>
                    </button>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      className={`outline-none cursor-pointer text-left duration-300 text-gray-400 ${
                        isBookFavorites
                          ? "hover:text-red-700"
                          : "hover:text-green-600"
                      } flex items-center gap-4`}
                      onClick={addToFavorites}
                    >
                      <FaHeart />{" "}
                      <span
                        className={`hidden lg:block text-gray-500 ${
                          isBookFavorites
                            ? "hover:text-red-700"
                            : "hover:text-green-600"
                        }`}
                      >
                        {isBookFavorites ? "Remove from" : "Add to"} favorites
                      </span>
                    </button>
                  </div>
                  <div className="w-full">
                    <button
                      className="w-full text-center flex items-center gap-4 justify-between py-2 rounded-sm font-semibold text-sm duration-300 border border-gray-600 bg-gray-600 text-white hover:bg-gray-800 hover:border-gray-800"
                      onClick={() => downloadBook(module?.id)}
                      disabled={downloading}
                    >
                      <div className="hidden lg:block flex-grow text-center">
                        {downloading ? (
                          <ButtonSpinner color="white" />
                        ) : (
                          "Download"
                        )}
                      </div>
                      <span className="lg:border-l border-l-gray-100 px-3">
                        <BsCloudDownload />
                      </span>
                    </button>
                  </div>
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
          </>
        )}
      </main>
    </div>
  );
};

export default SingleModulePage;
