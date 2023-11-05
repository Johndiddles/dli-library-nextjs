import Image from "next/image";
import React, { useCallback, useMemo, useState } from "react";
import styles from "../../styles/SingleModule.module.scss";

import { FaHeart, FaLink } from "react-icons/fa";
import { BsCloudDownload, BsSearch } from "react-icons/bs";
import getSingleModule from "../../globalFunctions/getSingleModule";

import moment from "moment";
import ButtonSpinner from "../Loader/ButtonSpinner";
import { useRouter } from "next/router";
import copyLink from "../../globalFunctions/copyModuleLink";
import { useLoginModalContext } from "../../pages/context/loginModalContext";
import { useAuthContext } from "../../pages/context/authContext";
import addFavorites from "../../globalFunctions/addBookToFavorites";

const SingleModule = ({ module }) => {
  const router = useRouter();
  const { isAuth, verifyUser, user } = useAuthContext();
  const { favorite_modules } = user;
  const { setIsModalOpen } = useLoginModalContext();
  const [downloading, setDownloading] = useState(false);
  const downloadBook = async (id) => {
    setDownloading(true);
    const { book, status } = await getSingleModule(id);

    if (status === "success") {
      setDownloading(false);
      const fileURL = window.URL.createObjectURL(book);

      let alink = document.createElement("a");
      alink.href = fileURL;
      alink.download = `${module.courseCode} - ${module?.courseTitle}.pdf`;
      alink.click();
    } else {
      setDownloading(false);
    }
  };

  const isModuleFavorite = useMemo(
    () => favorite_modules?.includes(module?.id),
    [favorite_modules, module?.id]
  );

  const addBookToFavorites = useCallback(() => {
    const action = async () => {
      const response = await addFavorites(module?.id);

      if (response?.message === "success") {
        verifyUser();
      } else if (response?.message === "unauthorized") {
        setIsModalOpen((prev) => !prev);
      } else {
      }
    };

    return action();
  }, [verifyUser, module?.id, setIsModalOpen]);

  const addToFavorites = (e) => {
    e.preventDefault();
    if (isAuth) {
      addBookToFavorites();
    } else {
      setIsModalOpen(true);
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
            src={module?.thumbnail}
            alt="module"
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
              <div>{module?.courseCode}</div> <div>{module?.courseTitle}</div>
            </div>
            <div className="text-xs font-semibold font-montserrat text-gray-400">
              {module?.department?.split(",")?.join(", ")},{" "}
              {`${module?.level} level`}
            </div>
          </div>

          <div
            className={`w-[200px] border-l border-l-gray-200 pl-4 flex flex-col justify-between ${styles.singleModule__actions}`}
          >
            <div
              className={`flex flex-col ${styles.singleModule__actions__fav}`}
            >
              <div className="flex gap-4 justify-end text-xl mb-2 ">
                <button
                  className="outline-none cursor-pointer duration-300 text-base text-gray-400 hover:text-green-600"
                  onClick={() => {
                    copyLink(module?.id, module?.courseTitle);
                  }}
                >
                  <FaLink />
                </button>
                {!router.pathname?.includes("favourite-modules") && (
                  <>
                    <span className="border-l border-l-gray-200"></span>
                    <button
                      className={`outline-none cursor-pointer duration-300 ${
                        isModuleFavorite
                          ? "text-green-600 hover:text-red-700"
                          : "text-gray-400 hover:text-green-600"
                      } `}
                      onClick={addToFavorites}
                    >
                      <FaHeart />
                    </button>
                  </>
                )}
              </div>
              <div className="text-xs text-gray-400 text-center mb-2">
                Date Added: {moment(module?.date).format("DD MMM YYYY")}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <button
                className="w-full text-center flex items-center gap-4 justify-between py-2 rounded-sm font-semibold text-sm duration-300 border border-gray-600 bg-gray-600 text-white hover:bg-gray-800 hover:border-gray-800"
                onClick={() => downloadBook(module?.id)}
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
                onClick={() => router.push(`/modules/${module?.id}`)}
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

export default SingleModule;
