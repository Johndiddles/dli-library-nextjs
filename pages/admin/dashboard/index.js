import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import React, { useRef, useState } from "react";
import Banner from "../../../components/Banner/Banner";
import { BASE_URL } from "../../../constants/variables";
// import "./dashboard.styles.scss";

const Dashboard = () => {
  const [courseCode, setCourseCode] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [level, setLevel] = useState("");
  const urlRef = useRef(null);
  const [rawFile, setRawFile] = useState({});

  const [imageUrl, setImageUrl] = useState("");

  const addModule = async (e) => {
    e.preventDefault();
    const token = localStorage.token;
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

      // console.log({ response });

      if (response?.status === 201) {
        const base64Image = new Buffer.from(
          response?.data?.data?.data
        ).toString("base64");

        setImageUrl(`data:image/png;base64,${base64Image}`);

        const formData = new FormData();

        formData.set("courseCode", courseCode);
        formData.set("courseTitle", courseTitle);
        formData.set("level", level);
        formData.set("department", department);
        formData.set("thumbnail", `data:image/png;base64,${base64Image}`);
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

          // console.log({ response });

          if (response?.status === 201) {
            alert(`successfully uploaded ${courseTitle}`);
          }
        } catch (error) {
          // console.log({ error });
          alert("failed to upload book ");
        }
      }
    } catch (error) {
      // console.log({ error });
    }
  };

  return (
    <div className="h-fit flex flex-col">
      <Head>
        <title>Download Modules</title>
      </Head>
      <Banner
        title="Admin Dashboard"
        imgUrl="https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1673&q=80"
      />
      <div className="dashboard py-10 flex flex-col items-center justify-center gap-8">
        <h1>Dashboard</h1>

        <div className="flex items-center justify-center gap-8">
          <div className="dashboard-form flex flex-col gap-4">
            <p className="dashboard-form__header text-center font-semibold text-2xl">
              Add Modules
            </p>
            <form className="p-8 min-w-[320px] rounded-2xl flex flex-col gap-4 bg-green-900 bg-opacity-10 backdrop-blur-sm">
              <div className="form-group flex flex-col text-sm font-semibold">
                <label className="label" htmlFor="courseCode">
                  Course Code
                </label>
                <input
                  className="rounded px-2 py-1 outline-none"
                  name="courseCode"
                  type="text"
                  id="courseCode"
                  placeholder="Course Code"
                  value={courseCode}
                  onChange={(e) => setCourseCode(e.target.value)}
                />
              </div>
              <div className="form-group flex flex-col text-sm font-semibold">
                <label className="label" htmlFor="courseTitle">
                  Course Title
                </label>
                <input
                  className="rounded px-2 py-1 outline-none"
                  name="courseTitle"
                  type="text"
                  id="courseTitle"
                  placeholder="Course Title"
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                />
              </div>

              <div className="form-group flex flex-col text-sm font-semibold">
                <label className="label" htmlFor="department">
                  Department
                </label>
                <select
                  name="department"
                  type="text"
                  id="department"
                  placeholder="Department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  <option value="">Select Department</option>
                  <option value="accounting">Accounting</option>
                  <option value="business administration">
                    Business Admin
                  </option>
                  <option value="public administration">Public Admin</option>
                  <option value="economics">Economics</option>
                  <option value="general">General</option>
                </select>
              </div>

              <div className="form-group flex flex-col text-sm font-semibold">
                <label className="label" htmlFor="level">
                  Level
                </label>
                <select
                  name="level"
                  type="text"
                  id="level"
                  placeholder="Level"
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
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

              <div className="form-group flex flex-col text-sm font-semibold">
                <label className="label" htmlFor="url">
                  File Url
                </label>
                <input
                  className="rounded px-2 py-1 outline-none"
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
              <div className="form-group flex flex-col text-sm font-semibold">
                <button
                  className="bg-green-600 text-white rounded-lg px-4 py-2 font-semibold hover:bg-green-800 duration-300"
                  onClick={addModule}
                >
                  Add Module
                </button>
              </div>
            </form>
          </div>

          <div className="min-w-[360px] min-h-[360px] border">
            {imageUrl && (
              <Image height={360} width={360} src={imageUrl} alt="" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
