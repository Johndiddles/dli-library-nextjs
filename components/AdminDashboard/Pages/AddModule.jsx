import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";
import DashboardHeader from "../Components/DashboardHeader";
import Banner from "../../Banner/Banner";
import { BASE_URL } from "../../../constants/variables";
import { useAdminContext } from "../../../pages/context/adminAuth";
import { BiError } from "react-icons/bi";
import { BsCheck2All, BsCheckAll, BsCheckLg } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import ButtonSpinner from "../../Loader/ButtonSpinner";
import { toast } from "react-toastify";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { FaCheckDouble } from "react-icons/fa";
import useImageUpload from "../../../hooks/useImageUpload";
import { MdCancel } from "react-icons/md";
// import "./dashboard.styles.scss";

const AddModule = ({ page }) => {
  const { uploadImage } = useImageUpload();
  const { setActivePage } = useAdminContext();

  useEffect(() => {
    setActivePage(() => page);
  }, [page, setActivePage]);

  const allDepartments = useRef([
    {
      title: "Accounting",
      value: "accounting",
    },
    {
      title: "Business Admin",
      value: "business administration",
    },
    {
      title: "Public Admin",
      value: "public administration",
    },
    {
      title: "Economics",
      value: "economics",
    },
    {
      title: "General",
      value: "general",
    },
  ]);

  const [courseCode, setCourseCode] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [department, setDepartment] = useState([]);
  const [level, setLevel] = useState("");
  const urlRef = useRef(null);
  const [rawFile, setRawFile] = useState({});

  const [imageUrl, setImageUrl] = useState("");

  const [thumbnailStatus, setThumbnailStatus] = useState("idle");
  const [addStatus, setAddStatus] = useState("idle");

  const resetForm = () => {
    setCourseCode("");
    setCourseTitle("");
    setDepartment([]);
    setLevel("");
    setImageUrl("");
    setRawFile({});
  };

  const addModule = async (e) => {
    e.preventDefault();

    const token = localStorage.token;

    setAddStatus("idle");
    setThumbnailStatus(() => "pending");
    try {
      const formData = new FormData();

      formData.set("module", rawFile);
      const response = await axios.post(
        `${BASE_URL}/modules/createThumbnail`,
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
        console.log({ imageUrl });

        setImageUrl(`data:image/png;base64,${base64Image}`);

        const formData = new FormData();

        formData.set("courseCode", courseCode);
        formData.set("courseTitle", courseTitle);
        formData.set("level", level);
        formData.set("department", department);
        formData.set("thumbnail", imageUrl);
        formData.set("url", rawFile);

        try {
          const response = await axios.post(
            `${BASE_URL}/modules/add`,
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
          alert("failed to upload book ");
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

  const addModuleStatusMessage = useMemo(() => {
    if (addStatus === "idle") {
      return "";
    }
    if (addStatus === "pending") {
      return (
        <span className="flex items-center whitespace-nowrap gap-2 text-gray-500">
          {" "}
          <ButtonSpinner /> Saving Module
        </span>
      );
    }
    if (addStatus === "success") {
      return (
        <span className="flex items-center whitespace-nowrap gap-2 text-green-700">
          <FaCheckDouble /> Saved Module Successfully
        </span>
      );
    }
    if (addStatus === "failed") {
      return (
        <span className="flex items-center gap-2 text-red-500">
          <BiError /> Failed to save Module
        </span>
      );
    }
  }, [addStatus]);

  return (
    <div className="h-fit flex flex-col">
      <Head>
        <title>Add Modules</title>
      </Head>

      <div className="dashboard py-2 flex flex-col items-center justify-center gap-8 w-full text-slate-800">
        <div
          className="flex items-center justify-center gap-8 bg-white px-6 py-4 rounded-lg w-full"
          style={{
            boxShadow: "0px 0px 50px rgba(125,125,125, 0.125)",
          }}
        >
          <div className="dashboard-form flex flex-col gap-4 w-full">
            <p className="dashboard-form__header font-montserrat font-semibold text-lg text-slate-800  pb-4 border-b border-b-slate-900 border-opacity-5">
              Add Modules
            </p>
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
                  {allDepartments?.current?.map((dept) => (
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
                  ))}
                </div>
                {/* <select
                  name="department"
                  type="text"
                  id="department"
                  placeholder="Department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="px-3 py-[10px] font-normal border border-gray-200 rounded-lg outline-none"
                >
                  <option value="">Select Department</option>
                  <option value="accounting">Accounting</option>
                  <option value="business administration">
                    Business Admin
                  </option>
                  <option value="public administration">Public Admin</option>
                  <option value="economics">Economics</option>
                  <option value="general">General</option>
                </select> */}
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
                  <div>{addModuleStatusMessage}</div>
                </div>
                <button
                  className={`${
                    thumbnailStatus === "pending" || addStatus === "pending"
                      ? "bg-opacity-50"
                      : "bg-opacity-100"
                  } bg-green-600 w-fit text-white rounded-lg px-6 py-3 font-normal text-sm hover:bg-green-800 duration-300`}
                  onClick={addModule}
                  disabled={
                    thumbnailStatus === "pending" || addStatus === "pending"
                  }
                >
                  Add Module
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddModule;
