import Head from "next/head";
import React, { useEffect } from "react";
import Banner from "../../components/Banner/Banner";
import { signOut } from "next-auth/react";
import { BiLogOut } from "react-icons/bi";

const Login = () => {
  // const { data: session } = useSession();
  // const router = useRouter();

  // useEffect(() => {
  //   if (!session) {
  //     router.push("/");
  //   }
  // }, [router, session]);

  return (
    <div className="min-h-[100%] flex-grow flex flex-col">
      <Head>
        <title>Sign Out</title>
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
            title="Sign Out"
            imgUrl="https://images.unsplash.com/photo-1596670945993-7854448e5f38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
          />

          <section className="flex-grow">
            <div className="w-full flex justify-center items-center px-8 py-14">
              <div className="w-full max-w-[600px] flex justify-center items-center">
                <form className="w-full py-5 px-5 flex flex-col gap-4 rounded-sm bg-white backdrop-blur-sm text-gray-400 relative">
                  <p className="text-center mt-5 text-2xl font-semibold text-gray-600 font-raleway">
                    Sign Out
                  </p>

                  <div className="text-center my-4 text-lg text-gray-800 font-semibold">
                    Are you sure you want to sign out?
                  </div>

                  <div className="flex justify-center mb-6">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        signOut({ callbackUrl: "/" });
                      }}
                      className="flex gap-4 justify-center items-center shadow-lg border py-3 px-6 rounded-lg text-lg bg-red-600 text-gray-50 hover:bg-red-700 duration-300"
                    >
                      <BiLogOut />
                      Sign Out
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default Login;
