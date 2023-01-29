import React, { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Banner from "../../components/Banner/Banner";
import { useAuthContext } from "../context/authContext";

const AdminLogin = () => {
  const { login } = useAuthContext();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitButtonContent, setSubmitButtonContent] = useState("Login");

  const clearInputs = () => {
    setUsername("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username,
      password,
    };

    const next = async () => {
      clearInputs();
      await router.push("/admin/dashboard");
    };

    login(data, next);
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
