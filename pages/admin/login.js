import React, { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Banner from "../../components/Banner/Banner";
import { useAuthContext } from "../context/authContext";
import LoginForm from "../../components/Login/LoginForm";

const AdminLogin = () => {
  return (
    <div className="h-fit flex flex-col">
      <Head>
        <title>DLI - Admin Login</title>
      </Head>
      <Banner
        title="Admin - Login"
        imgUrl="https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1673&q=80"
      />
      <div className="adminLoginPage py-10 flex items-center justify-center gap-8">
        <div className="adminLoginPage__left"></div>
        <div className="adminLoginPage__right">
          <div className="max-w-[360px]">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
