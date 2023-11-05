import Head from "next/head";
import React, { useEffect } from "react";
import Banner from "../components/Banner/Banner";
import LoginForm from "../components/Login/LoginForm";
import { useAuthContext } from "./context/authContext";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const { isAuth } = useAuthContext();

  useEffect(() => {
    if (isAuth) {
      router.push("/modules");
    }
  }, [isAuth, router]);

  return (
    <div>
      <Head>
        <title>Login</title>
      </Head>
      <main
        style={{
          background:
            "url(https://images.unsplash.com/photo-1513617855986-6ad7b0dfb9f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80)",
        }}
      >
        <div className="w-full bg-gray-100 bg-opacity-95">
          <Banner
            title="Sign In"
            imgUrl="https://images.unsplash.com/photo-1596670945993-7854448e5f38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
          />

          <section>
            <div className="w-full flex justify-center items-center px-8 py-14">
              <div className="w-full max-w-[600px] flex justify-center items-center">
                <LoginForm />
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Login;
