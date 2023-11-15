import axios from "axios";
import Head from "next/head";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { BASE_URL } from "../../../constants/variables";
import { useAdminContext } from "../../../pages/context/adminAuth";
import { BiError } from "react-icons/bi";
import { BsCheckLg } from "react-icons/bs";
import ButtonSpinner from "../../Loader/ButtonSpinner";
import { toast } from "react-toastify";
import { FaArrowLeft, FaCheckDouble } from "react-icons/fa";
import useImageUpload from "../../../hooks/useImageUpload";
import { MdCancel } from "react-icons/md";
import { axiosInstance } from "../../../globalFunctions/axiosInstance";
import Spinner from "../../Loader/Spinner";
import { useSession } from "next-auth/react";
import Link from "next/link";

const AddPastQuestion = ({ page }) => {
  const { data: userSession } = useSession();
  const { uploadImage } = useImageUpload();
  const { setActivePage } = useAdminContext();
  const [fetchModulesStatus, setFetchModulesStatus] = useState("idle");
  const [allModules, setAllModules] = useState([]);

  useEffect(() => {
    setActivePage(() => page);
  }, [page, setActivePage]);

  useEffect(() => {
    const fetchResources = async () => {
      setFetchModulesStatus("pending");
      const modulesResponse = await axiosInstance("modules");

      if (modulesResponse?.status === 200) {
        setAllModules(modulesResponse?.data);
        setFetchModulesStatus("success");
      } else {
        setFetchModulesStatus("failed");
      }
    };

    if (fetchModulesStatus === "idle") fetchResources();
  }, [fetchModulesStatus]);

  const [courseId, setCourseId] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [departments, setDepartments] = useState([]);
  const [session, setSession] = useState("");
  const [level, setLevel] = useState("");
  const urlRef = useRef(null);
  const [rawFile, setRawFile] = useState({});

  const [thumbnailStatus, setThumbnailStatus] = useState("idle");
  const [addStatus, setAddStatus] = useState("idle");

  const resetForm = () => {
    setCourseId("");
    setCourseCode("");
    setCourseTitle("");
    setDepartments([]);
    setSession("");
    setLevel("");
    setRawFile({});
  };

  const addPastQuestion = async (e) => {
    e.preventDefault();

    const token = userSession.user.token;

    setAddStatus("idle");
    setThumbnailStatus(() => "pending");
    try {
      const formData = new FormData();

      formData.set("pastQuestion", rawFile);
      const response = await axios.post(
        `${BASE_URL}/past-questions/createThumbnail`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.status === 201) {
        setThumbnailStatus("success");
        setAddStatus("pending");

        const base64Image = new Buffer.from(
          response?.data?.data?.data
        ).toString("base64");

        const imageUrl = await uploadImage(
          `data:image/png;base64,${base64Image}`
        );

        const formData = new FormData();

        formData.set("courseId", courseId);
        formData.set("courseCode", courseCode);
        formData.set("courseTitle", courseTitle);
        formData.set("level", level);
        formData.set("departments", departments);
        formData.set("session", session);
        formData.set("thumbnail", imageUrl);
        formData.set("url", rawFile);

        try {
          const response = await axios.post(
            `${BASE_URL}/past-questions/add`,
            formData,

            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response?.status === 201) {
            setAddStatus("success");
            toast.success(`successfully uploaded ${courseTitle}`);
            resetForm();
          }
        } catch (error) {
          // console.log({ error });
          toast.error("failed to upload book...");
          setAddStatus("failed");
        }
      }
    } catch (error) {
      // console.log({ error });
      setThumbnailStatus("failed");
      setAddStatus("failed");
    }
  };

  const thumbnailStatusMessage = useMemo(() => {
    if (thumbnailStatus === "idle") {
      return "";
    }
    if (thumbnailStatus === "pending") {
      return (
        <span className="flex items-center gap-2 whitespace-nowrap text-gray-500">
          {" "}
          <ButtonSpinner /> Generating Thumbnail
        </span>
      );
    }
    if (thumbnailStatus === "success") {
      return (
        <span className="flex items-center gap-2 whitespace-nowrap text-green-700">
          <BsCheckLg /> Generated Thumbnail
        </span>
      );
    }
    if (thumbnailStatus === "failed") {
      return (
        <span className="flex items-center gap-2 whitespace-nowrap text-red-500">
          <BiError /> Failed to generate thumbail
        </span>
      );
    }
  }, [thumbnailStatus]);

  const addPastQuestionStatusMessage = useMemo(() => {
    if (addStatus === "idle") {
      return "";
    }
    if (addStatus === "pending") {
      return (
        <span className="flex items-center whitespace-nowrap gap-2 text-gray-500">
          <ButtonSpinner /> Saving Past Question
        </span>
      );
    }
    if (addStatus === "success") {
      return (
        <span className="flex items-center whitespace-nowrap gap-2 text-green-700">
          <FaCheckDouble /> Saved Past Question Successfully
        </span>
      );
    }
    if (addStatus === "failed") {
      return (
        <span className="flex items-center gap-2 text-red-500">
          <BiError /> Failed to save Past Question
        </span>
      );
    }
  }, [addStatus]);

  return (
    <div className="h-fit flex flex-col">
      <Head>
        <title>Add Past Question</title>
      </Head>

      <div className="dashboard py-2 flex flex-col items-center justify-center gap-8 w-full text-slate-800">
        <div
          className="flex items-center justify-center gap-8 bg-white px-6 py-4 rounded-lg w-full"
          style={{
            boxShadow: "0px 0px 50px rgba(125,125,125, 0.125)",
          }}
        >
          <div className="dashboard-form flex flex-col gap-4 w-full">
            <div className="w-full flex justify-between items-center gap-10 pb-4 border-b border-b-slate-900 border-opacity-5">
              <p className="dashboard-form__header font-montserrat font-semibold text-lg text-slate-800 ">
                Add Past Question
              </p>

              <Link
                href="/admin/dashboard/past-questions"
                className="flex gap-2 items-center hover:scale-105 duration-300"
              >
                <FaArrowLeft /> Back
              </Link>
            </div>
            <form className="w-full rounded-2xl flex flex-col gap-4 backdrop-blur-sm">
              <div className="form-group flex flex-col gap-2 text-sm font-semibold">
                <label className="label font-semibold">Course Code</label>
                <select
                  className="px-3 py-[10px] font-normal border border-gray-200 rounded-lg outline-none"
                  style={{
                    border: "1px solid rgba(125, 125, 125, 0.125)",
                    boxShadow: "0px 0px 2px rgba(125, 125, 125, 0.125)",
                  }}
                  name="courseCode"
                  type="text"
                  id="courseCode"
                  placeholder="Course Code"
                  value={courseId}
                  onChange={(e) => {
                    const selectedModule = allModules?.find(
                      (module) => module?.id === e.target.value
                    );

                    setCourseCode(selectedModule?.courseCode);
                    setCourseTitle(selectedModule?.courseTitle);
                    setLevel(selectedModule?.level);
                    setDepartments(selectedModule?.department?.split(","));

                    setCourseId(e.target.value);
                  }}
                >
                  <option value="">Select Course Code</option>
                  {allModules
                    ?.sort((a, b) => {
                      if (
                        a?.courseCode?.toLowerCase() <
                        b.courseCode?.toLowerCase()
                      ) {
                        return -1;
                      }
                      if (
                        a?.courseCode?.toLowerCase() >
                        b.courseCode?.toLowerCase()
                      ) {
                        return 1;
                      }
                    })
                    ?.map((module) => (
                      <option key={module?.id} value={module?.id}>
                        {module?.courseCode}
                      </option>
                    ))}
                </select>
              </div>
              <div className="form-group flex flex-col gap-2 text-sm font-semibold">
                <label className="label font-semibold">Course Title</label>
                <input
                  className="px-3 py-[10px] font-normal border border-gray-200 rounded-lg outline-none bg-gray-100"
                  style={{
                    border: "1px solid rgba(125, 125, 125, 0.125)",
                    boxShadow: "0px 0px 2px rgba(125, 125, 125, 0.125)",
                  }}
                  name="courseTitle"
                  type="text"
                  id="courseTitle"
                  placeholder="Course Title"
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                  disabled
                />
              </div>

              <div className="form-group flex flex-col gap-2 text-sm font-semibold">
                <label className="label font-semibold">Session</label>
                <input
                  className="px-3 py-[10px] font-normal border border-gray-200 rounded-lg outline-none"
                  style={{
                    border: "1px solid rgba(125, 125, 125, 0.125)",
                    boxShadow: "0px 0px 2px rgba(125, 125, 125, 0.125)",
                  }}
                  name="session"
                  type="text"
                  id="session"
                  placeholder="2005/2006"
                  value={session}
                  onChange={(e) => setSession(e.target.value)}
                />
              </div>

              <div className="form-group flex flex-col gap-2 text-sm font-semibold">
                <div className="label font-semibold">File Url</div>
                <label htmlFor="url">
                  <div className="w-full font-normal cursor-pointer border border-gray-200 rounded-lg overflow-hidden flex gap-8 items-center ">
                    <span className="flex w-fit text-white py-3 px-4 cursor-pointer font-semibold bg-gray-600 hover:bg-gray-800 duration-300">
                      Select a Document
                    </span>
                    <span>{rawFile?.name ?? ""}</span>
                    <input
                      className="hidden"
                      style={{
                        border: "1px solid rgba(125, 125, 125, 0.125)",
                        boxShadow: "0px 0px 2px rgba(125, 125, 125, 0.125)",
                      }}
                      name="url"
                      type="file"
                      id="url"
                      placeholder="File Url"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        setRawFile(e.target.files[0]);
                        function getBase64(file) {
                          return new Promise((resolve, reject) => {
                            const reader = new FileReader();
                            reader.readAsDataURL(file);
                            reader.onload = () => resolve(reader.result);
                            reader.onerror = (error) => reject(error);
                          });
                        }

                        getBase64(file).then((data) => {
                          urlRef.current = data;
                        });
                      }}
                    />
                  </div>
                </label>
              </div>
              <div className="form-group w-full mt-8 flex gap-2 text-sm font-semibold justify-between ">
                <div className="flex items-center gap-4">
                  <div>{thumbnailStatusMessage}</div>
                  <div>{addPastQuestionStatusMessage}</div>
                </div>
                <button
                  className={`${
                    thumbnailStatus === "pending" || addStatus === "pending"
                      ? "bg-opacity-50"
                      : "bg-opacity-100"
                  } bg-green-600 w-fit text-white rounded-lg px-6 py-3 font-normal text-sm hover:bg-green-800 duration-300`}
                  onClick={addPastQuestion}
                  disabled={
                    thumbnailStatus === "pending" || addStatus === "pending"
                  }
                >
                  Add Past Question
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPastQuestion;
