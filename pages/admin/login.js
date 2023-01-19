import React, { useState, useEffect } from "react";
// import { Navigate } from "react-router";
import { useRouter } from "next/router";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   userLogin,
//   getLoginStatus,
//   setStatus,
//   getIsAuth,
// } from "../../../redux-toolkit/userSlice/userSlice";
import axios from "axios";
import { BASE_URL } from "../../constants/variables";
import Head from "next/head";
import Banner from "../../components/Banner/Banner";
// import "./login.styles.scss";

const AdminLogin = () => {
  //   const dispatch = useDispatch();
  const router = useRouter();

  //   const loginStatus = useSelector(getLoginStatus);
  //   const isAuth = useSelector(getIsAuth);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitButtonContent, setSubmitButtonContent] = useState("Login");

  const clearInputs = () => {
    setUsername("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // dispatch(setStatus("idle"));
    const data = {
      username,
      password,
    };
    // dispatch(userLogin(data));

    try {
      const response = await axios.post(`${BASE_URL}/user/login`, data);

      if (response?.status === 201) {
        console.log({ response: response?.data });
        localStorage.setItem("token", response?.data?.data?.token);
        clearInputs();
        router.push("/admin/dashboard");
      }
    } catch (error) {
      console.log({ error });
    }
  };

  //   useEffect(() => {
  //     if (loginStatus === "idle") {
  //       setSubmitButtonContent("Login");
  //     } else if (loginStatus === "pending") {
  //       setSubmitButtonContent("Please wait");
  //     } else if (loginStatus === "failed") {
  //       setSubmitButtonContent("Login");
  //     } else if (loginStatus === "succeeded") {
  //       console.log("successful");
  //       setSubmitButtonContent("Login");
  //     }
  //   }, [loginStatus]);

  return (
    <div className="h-fit flex flex-col">
      <Head>
        <title>Download Modules</title>
      </Head>
      <Banner
        title="Admin Dashboard"
        imgUrl="https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1673&q=80"
      />
      <div className="adminLoginPage py-10 flex items-center justify-center gap-8">
        <div className="adminLoginPage__left"></div>
        <div className="adminLoginPage__right">
          <form className="p-8 min-w-[320px] rounded-2xl flex flex-col gap-4 bg-slate-900 bg-opacity-10 backdrop-blur-sm">
            <div className="formGroup flex flex-col text-sm font-semibold">
              <label htmlFor="username">Username</label>
              <input
                className="rounded px-2 py-1 outline-none"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username..."
              />
            </div>
            <div className="formGroup flex flex-col text-sm font-semibold">
              <label htmlFor="password">Password</label>
              <input
                className="rounded px-2 py-1 outline-none"
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
              />
            </div>
            <button
              className="bg-green-600 text-white rounded-lg px-4 py-2 font-semibold hover:bg-green-800 duration-300"
              onClick={handleSubmit}
            >
              {submitButtonContent}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
