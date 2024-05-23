import Head from "next/head";
import React, { useEffect } from "react";
import Banner from "../../components/Banner/Banner";
import LoginForm from "../../components/Login/LoginForm";
// import { useAuthContext } from "./context/authContext";
import { useRouter } from "next/router";
import { getProviders, useSession } from "next-auth/react";
import { options } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

const Login = ({ providers }) => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/modules");
    }
  }, [router, session]);

  // console.log({ providers });

  return (
    <div className="min-h-[100%] flex-grow flex flex-col">
      <Head>
        <title>Login</title>
      </Head>
      <section
        style={{
          background:
            "url(https://images.unsplash.com/photo-1513617855986-6ad7b0dfb9f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80)",
        }}
        className="flex-grow flex flex-col"
      >
        <div className="flex-grow flex flex-col bg-gray-100 bg-opacity-95">
          <Banner
            title="Sign In"
            imgUrl="https://images.unsplash.com/photo-1596670945993-7854448e5f38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
          />

          <section className="flex-grow">
            <div className="w-full flex justify-center items-center px-8 py-14">
              <div className="w-full max-w-[600px] flex justify-center items-center">
                <LoginForm providers={providers} />
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default Login;

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, options);

  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();

  console.log({ providers });

  return {
    props: { providers: providers ?? [] },
  };
}
