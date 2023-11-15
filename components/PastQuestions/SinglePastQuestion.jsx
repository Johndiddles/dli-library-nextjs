import Image from "next/image";
import React, { useCallback, useMemo, useState } from "react";
import styles from "../../styles/SingleModule.module.scss";

import { FaHeart, FaLink, FaRegHandPointRight } from "react-icons/fa";
import { BsCloudDownload, BsSearch } from "react-icons/bs";

import moment from "moment";
import ButtonSpinner from "../Loader/ButtonSpinner";
import { useRouter } from "next/router";
import copyLink from "../../globalFunctions/copyModuleLink";
import { useAuthContext } from "../../pages/context/authContext";
import addFavorites from "../../globalFunctions/addBookToFavorites";
import { useSession } from "next-auth/react";
import { CLIENT_ORIGIN } from "../../constants/variables";
import Tooltip from "../Tooltip/Tooltip";
import getSinglePastQuestion from "../../globalFunctions/getSinglePastQuestion";
import Link from "next/link";

const SinglePastQuestion = ({ pastQuestion }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const { verifyUser, favorite_modules } = useAuthContext();
  const [downloading, setDownloading] = useState(false);

  const downloadBook = async (id) => {
    setDownloading(true);
    const { pastQuestion: file, status } = await getSinglePastQuestion(id);

    if (status === "success") {
      setDownloading(false);
      const fileURL = window.URL.createObjectURL(file);

      let alink = document.createElement("a");
      alink.href = fileURL;
      alink.download = `PQ - ${pastQuestion.courseCode} - ${pastQuestion?.courseTitle}.pdf`;
      alink.click();
    } else {
      setDownloading(false);
    }
  };

  const isPastQuestionFavourite = useMemo(
    () => favorite_modules?.includes(pastQuestion?.id),
    [favorite_modules, pastQuestion?.id]
  );

  const addBookToFavorites = useCallback(() => {
    const action = async () => {
      const response = await addFavorites(pastQuestion?.id, session.user.token);

      if (response?.message === "success") {
        verifyUser();
      } else if (response?.message === "unauthorized") {
        router.push(
          `${CLIENT_ORIGIN}/api/auth/signin?callbackUrl=/past-questions`
        );
      } else {
      }
    };

    return action();
  }, [verifyUser, pastQuestion?.id, router, session?.user?.token]);

  const addToFavorites = (e) => {
    e.preventDefault();
    if (session) {
      addBookToFavorites();
    } else {
      router.push(
        `${CLIENT_ORIGIN}/api/auth/signin?callbackUrl=/past-questions`
      );
    }
  };

  return (
    <div
      className={`w-full bg-white rounded-md duration-300 cursor-pointer hover:-translate-y-1 ${styles.singleModuleWrapper}`}
      style={{
        boxShadow: "0px 1px 6px rgba(0,0,0,0.05)",
      }}
    >
      <div
        className={`w-full h-full bg-white flex gap-8 p-4 ${styles.singleModule}`}
      >
        <div
          style={{
            boxShadow: "4px 4px 8px rgba(0,0,0,0.05)",
          }}
          className={`overflow-hidden rounded-t-lg ${styles.singleModule__image}`}
        >
          <Image
            src={pastQuestion?.thumbnail}
            alt={`${pastQuestion?.courseCode} past question`}
            style={{
              objectFit: "cover",
              objectPosition: "top",
            }}
            fill
          />
        </div>
        <div className={`flex-grow flex ${styles.singleModule__details}`}>
          <div className="flex-grow flex flex-col gap-2 capitalize">
            <div className="text-base font-montserrat font-extrabold text-gray-700">
              <div>{pastQuestion?.courseCode}</div>{" "}
              <div>{pastQuestion?.courseTitle}</div>
            </div>
            <div className="text-xs font-semibold font-montserrat text-gray-400">
              {pastQuestion?.departments?.join(", ")},{" "}
              {`${pastQuestion?.level} level`}
            </div>
            <div className="text-xs font-semibold font-montserrat text-gray-400">
              {`${pastQuestion?.session} session`}
            </div>
            <Link
              href={`/modules/${pastQuestion?.courseId}`}
              className="flex gap-2 items-center text-xs font-semibold font-montserrat text-gray-400 mt-2 pb-1 w-fit hover:text-green-600 duration-300"
            >
              <span className="text-base text-green-600">
                <FaRegHandPointRight />
              </span>
              <div className="">View course module</div>
            </Link>
          </div>

          <div
            className={`w-[200px] border-l border-l-gray-200 pl-4 flex flex-col justify-between ${styles.singleModule__actions}`}
          >
            <div
              className={`flex flex-col ${styles.singleModule__actions__fav}`}
            >
              <div className="flex gap-4 justify-end text-xl mb-2 ">
                <Tooltip
                  button={
                    <button
                      className="outline-none cursor-pointer duration-300 text-base text-gray-400 hover:text-green-600"
                      onClick={() => {
                        copyLink(
                          pastQuestion?.id,
                          pastQuestion?.courseTitle,
                          "past-questions"
                        );
                      }}
                    >
                      <FaLink />
                    </button>
                  }
                  tooltiptext="copy link"
                />

                {/* {!router.pathname?.includes("favourite-past-questions") && (
                  <>
                    <span className="border-l border-l-gray-200"></span>
                    <Tooltip
                      button={
                        <button
                          className={`outline-none cursor-pointer duration-300 ${
                            isPastQuestionFavourite
                              ? "text-green-600 hover:text-red-700"
                              : "text-gray-400 hover:text-green-600"
                          } `}
                          onClick={addToFavorites}
                        >
                          <FaHeart />
                        </button>
                      }
                      tooltiptext="Like"
                    />
                  </>
                )} */}
              </div>
              <div className="text-xs text-gray-400 text-center mb-2">
                Last Updated:{" "}
                {moment(pastQuestion?.updatedAt).format("DD MMM YYYY")}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <button
                className="w-full text-center flex items-center gap-4 justify-between py-2 rounded-sm font-semibold text-sm duration-300 border border-gray-600 bg-gray-600 text-white hover:bg-gray-800 hover:border-gray-800"
                onClick={() => downloadBook(pastQuestion?.id)}
                disabled={downloading}
              >
                <div className="flex-grow text-center">
                  {downloading ? <ButtonSpinner color="white" /> : "Download"}
                </div>
                <span className="border-l border-l-gray-100 px-3">
                  <BsCloudDownload />
                </span>
              </button>
              <button
                className="w-full text-center flex items-center gap-4 justify-between py-2 rounded-sm font-semibold text-sm duration-300 border border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                onClick={() =>
                  router.push(`/past-questions/${pastQuestion?.id}`)
                }
              >
                <div className="flex-grow text-center">Preview</div>
                <span className="border-l border-l-green-600 px-3">
                  <BsSearch />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePastQuestion;
