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
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Link from "next/link";

const EditPastQuestion = ({ page }) => {
  const { data: userSession } = useSession();
  const router = useRouter();
  const { pastQuestionId } = router.query;

  //   const { uploadImage } = useImageUpload();
  const { setActivePage } = useAdminContext();
  const [fetchStatus, setFetchStatus] = useState("idle");
  const [allDepartments, setAllDepartments] = useState([]);

  useEffect(() => {
    setActivePage(() => page);
  }, [page, setActivePage]);

  useEffect(() => {
    const fetchDepartments = async () => {
      setFetchStatus("pending");
      const response = await axiosInstance("departments");
      if (response?.status === 200) {
        setAllDepartments(response?.data);
        setFetchStatus("success");
      } else {
        setFetchStatus("failed");
      }
    };

    if (fetchStatus === "idle") fetchDepartments();
  }, [fetchStatus, setFetchStatus]);

  const [fetchPastQuestionStatus, setFetchPastQuestionStatus] =
    useState("idle");
  const [fetchModulesStatus, setFetchModulesStatus] = useState("idle");

  const [allModules, setAllModules] = useState([]);

  const [id, setId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [departments, setDepartments] = useState([]);
  const [session, setSession] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [level, setLevel] = useState("");
  const [likes, setLikes] = useState("");

  const [updateStatus, setUpdateStatus] = useState("idle");

  const updateModuleStatusMessage = useMemo(() => {
    if (updateStatus === "idle") {
      return "";
    }
    if (updateStatus === "pending") {
      return (
        <span className="flex items-center whitespace-nowrap gap-2 text-gray-500">
          {" "}
          <ButtonSpinner /> Saving Module
        </span>
      );
    }
    if (updateStatus === "success") {
      return (
        <span className="flex items-center whitespace-nowrap gap-2 text-green-700">
          <FaCheckDouble /> Saved Module Successfully
        </span>
      );
    }
    if (updateStatus === "failed") {
      return (
        <span className="flex items-center gap-2 text-red-500">
          <BiError /> Failed to save Module
        </span>
      );
    }
  }, [updateStatus]);

  const resetForm = () => {
    setCourseId("");
    setCourseCode("");
    setCourseTitle("");
    setDepartments([]);
    setThumbnail("");
    setSession("");
    setLevel("");
  };

  const updateModule = async (e) => {
    e.preventDefault();

    const token = userSession.user.token;

    setUpdateStatus("pending");
    try {
      const payload = {
        id,
        courseId,
        courseCode,
        courseTitle,
        level,
        departments,
        thumbnail,
        session,
        likes,
      };

      try {
        const response = await axios.patch(
          `${BASE_URL}/past-questions/update/${pastQuestionId}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUpdateStatus("success");
        toast.success(`successfully updated past question`);
        resetForm();
        router.push("/admin/dashboard/past-questions");
      } catch (error) {
        alert("failed to update past question");
        setUpdateStatus("failed");
      }
    } catch (error) {
      setUpdateStatus("failed");
    }
  };

  useEffect(() => {
    const getPastQuestion = async () => {
      setFetchPastQuestionStatus("pending");
      try {
        const response = await axios.get(
          `${BASE_URL}/past-questions/get-single-past-question/${pastQuestionId}`
        );

        setFetchModulesStatus("pending");
        const modulesResponse = await axiosInstance("modules");

        if (modulesResponse?.status === 200) {
          setAllModules(modulesResponse?.data);
          setFetchModulesStatus("success");
        } else {
          setFetchModulesStatus("failed");
        }

        const fetchedPastQuestion = response?.data;
        setId(fetchedPastQuestion?.id);
        setCourseCode(fetchedPastQuestion.courseCode);
        setCourseTitle(fetchedPastQuestion.courseTitle);
        setDepartments(fetchedPastQuestion.departments);
        setLevel(fetchedPastQuestion.level);
        setThumbnail(
          fetchedPastQuestion.thumbnail?.split("http").join("https")
        );
        setLikes(fetchedPastQuestion?.likes);
        setSession(fetchedPastQuestion?.session);
        setCourseId(fetchedPastQuestion?.courseId);

        setFetchPastQuestionStatus("success");
      } catch (error) {
        setFetchPastQuestionStatus("failed");
      }
    };

    if (pastQuestionId && fetchPastQuestionStatus === "idle") getPastQuestion();
  }, [pastQuestionId, fetchPastQuestionStatus]);

  if (!pastQuestionId) {
    toast.error("no past question selected selected");
    router.push("/admin/dashboard/index");
    return;
  }

  return (
    <div className="h-fit flex flex-col">
      <Head>
        <title>Edit Past Questions</title>
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
                Edit Past Question
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
                  className="px-3 py-[10px] font-normal border border-gray-200 bg-gray-200 text-gray-500 rounded-lg outline-none"
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
                <label className="label">Session</label>
                <input
                  name="session"
                  type="text"
                  id="session"
                  placeholder="2005/2006"
                  value={session}
                  onChange={(e) => setSession(e.target.value)}
                  className="px-3 py-[10px] font-normal border border-gray-200 rounded-lg outline-none"
                />
              </div>

              <div className="form-group w-full mt-8 flex gap-2 text-sm font-semibold justify-between ">
                <div className="flex items-center gap-4">
                  {/* <div>{thumbnailStatusMessage}</div> */}
                  <div>{updateModuleStatusMessage}</div>
                </div>
                <button
                  className={`${
                    updateStatus === "pending"
                      ? "bg-opacity-50"
                      : "bg-opacity-100"
                  } bg-green-600 w-fit text-white rounded-lg px-6 py-3 font-normal text-sm hover:bg-green-800 duration-300`}
                  onClick={updateModule}
                  disabled={updateStatus === "pending"}
                >
                  Update Past Question
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPastQuestion;
