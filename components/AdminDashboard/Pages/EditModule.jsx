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

const EditModule = ({ page }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const { moduleId } = router.query;

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

  const [fetchModuleStatus, setFetchModuleStatus] = useState("idle");
  const [courseCode, setCourseCode] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [department, setDepartment] = useState([]);
  const [level, setLevel] = useState("");
  const urlRef = useRef(null);
  const [rawFile, setRawFile] = useState({});

  const [imageUrl, setImageUrl] = useState("");

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
    setCourseCode("");
    setCourseTitle("");
    setDepartment([]);
    setLevel("");
    setImageUrl("");
    setRawFile({});
  };

  const updateModule = async (e) => {
    e.preventDefault();

    const token = session.user.token;

    setUpdateStatus("pending");
    try {
      const payload = {
        courseCode,
        courseTitle,
        level,
        department: department?.join(","),
        thumbnail: imageUrl,
      };

      try {
        const response = await axios.patch(
          `${BASE_URL}/modules/update/${moduleId}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUpdateStatus("success");
        toast.success(`successfully updated ${courseTitle}`);
        resetForm();
        router.push("/admin/dashboard/index");
      } catch (error) {
        alert("failed to upload book ");
        setUpdateStatus("failed");
      }
    } catch (error) {
      setUpdateStatus("failed");
    }
  };

  useEffect(() => {
    const getModule = async () => {
      setFetchModuleStatus("pending");
      try {
        const response = await axios.get(
          `${BASE_URL}/modules/get-single-module/${moduleId}`
        );

        const fetchedModule = response?.data;
        setCourseCode(fetchedModule.courseCode);
        setCourseTitle(fetchedModule.courseTitle);
        setDepartment(fetchedModule.department?.split(","));
        setLevel(fetchedModule.level);
        setImageUrl(fetchedModule.thumbnail?.split("http").join("https"));

        setFetchModuleStatus("success");
      } catch (error) {
        setFetchModuleStatus("failed");
      }
    };

    if (moduleId && fetchModuleStatus === "idle") getModule();
  }, [moduleId, fetchModuleStatus]);

  if (!moduleId) {
    toast.error("no module selected");
    router.push("/admin/dashboard/index");
    return;
  }

  return (
    <div className="h-fit flex flex-col">
      <Head>
        <title>Edit Modules</title>
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
                Edit Modules
              </p>

              <Link
                href="/admin/dashboard/index"
                className="flex gap-2 items-center hover:scale-105 duration-300"
              >
                <FaArrowLeft /> Back
              </Link>
            </div>
            <form className="w-full rounded-2xl flex flex-col gap-4 backdrop-blur-sm">
              <div className="form-group flex flex-col gap-2 text-sm font-semibold">
                <label className="label font-semibold">Course Code</label>
                <input
                  className="px-3 py-[10px] font-normal border border-gray-200 rounded-lg outline-none"
                  style={{
                    border: "1px solid rgba(125, 125, 125, 0.125)",
                    boxShadow: "0px 0px 2px rgba(125, 125, 125, 0.125)",
                  }}
                  name="courseCode"
                  type="text"
                  id="courseCode"
                  placeholder="Course Code"
                  value={courseCode}
                  onChange={(e) => setCourseCode(e.target.value)}
                />
              </div>
              <div className="form-group flex flex-col gap-2 text-sm font-semibold">
                <label className="label font-semibold">Course Title</label>
                <input
                  className="px-3 py-[10px] font-normal border border-gray-200 rounded-lg outline-none"
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
                />
              </div>

              <div className="form-group flex flex-col gap-2 text-sm font-semibold">
                <label className="label">Department</label>
                <div className="border border-gray-200 rounded-lg px-3 py-[10px] font-normal flex gap-4">
                  {fetchStatus === "pending" ? (
                    <>
                      <Spinner />
                    </>
                  ) : allDepartments?.length === 0 ? (
                    <div className="text-sm">no department found</div>
                  ) : (
                    allDepartments?.map((dept) => (
                      <div
                        key={dept.value}
                        className={`flex gap-2 items-center w-fit py-2 px-4 ${
                          department?.includes(dept.value)
                            ? "bg-gray-700 text-gray-100"
                            : "bg-gray-100"
                        } hover:bg-gray-700 hover:text-gray-100 duration-300 cursor-pointer rounded`}
                        onClick={() => {
                          if (department?.includes(dept.value)) {
                            setDepartment((prev) =>
                              prev.filter((prevData) => prevData !== dept.value)
                            );
                          } else {
                            setDepartment((prev) => [...prev, dept.value]);
                          }
                        }}
                      >
                        {department?.includes(dept?.value) ? (
                          <span>
                            <MdCancel className="" />
                          </span>
                        ) : (
                          <div
                            className={`w-3 h-3 rounded-full border border-gray-300 ${
                              department?.includes(dept?.value)
                                ? "bg-gray-100"
                                : "bg-transparent"
                            }`}
                          ></div>
                        )}
                        {dept.title}
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="form-group flex flex-col gap-2 text-sm font-semibold">
                <label className="label">Level</label>
                <select
                  name="level"
                  type="text"
                  id="level"
                  placeholder="Level"
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="px-3 py-[10px] font-normal border border-gray-200 rounded-lg outline-none"
                >
                  <option value="">Select Level</option>
                  <option value="100">100</option>
                  <option value="200">200</option>
                  <option value="300">300</option>
                  <option value="400">400</option>
                  <option value="500">500</option>
                  <option value="600">600</option>
                  <option value="general">General</option>
                </select>
              </div>

              {/* <div className="form-group flex flex-col gap-2 text-sm font-semibold">
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
              </div> */}

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
                  Update Module
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModule;
