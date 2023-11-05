import { useRouter } from "next/router";
import React, { useReducer, useState } from "react";
import { FaLock } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { useAuthContext } from "../../pages/context/authContext";
import { useLoginModalContext } from "../../pages/context/loginModalContext";

const LoginForm = () => {
  const router = useRouter();
  const { setIsModalOpen, nextAction } = useLoginModalContext();
  const { login } = useAuthContext();
  const [details, setDetails] = useState({
    username: "",
    password: "",
  });

  const submitLogin = async (e) => {
    e.preventDefault();
    const data = details;

    const next = async () => {
      if (nextAction) await nextAction.action();
      await setIsModalOpen(false);

      if (!nextAction) router.push("/modules");
    };

    await login(data, next);
    setIsModalOpen(false);
  };

  return (
    <form className="w-full  flex flex-col gap-4 rounded-sm bg-white backdrop-blur-sm text-gray-400 relative">
      <p className="text-center mt-5 text-3xl font-semibold text-gray-600 font-raleway">
        Sign In
      </p>
      <div className="flex flex-col gap-3 px-5 lg:px-10">
        <div className="flex gap-4 items-center py-2 px-4 border-b border-b-gray-300 ">
          <label>
            <HiMail />
          </label>
          <input
            className="outline-none flex-grow"
            value={details?.username}
            onChange={(e) =>
              setDetails((prev) => ({
                ...prev,
                username: e.target.value?.toLowerCase(),
              }))
            }
            type="text"
            placeholder="Email or Phone"
          />
        </div>
        <div className="flex gap-4 items-center py-2 px-4 border-b border-b-gray-300 ">
          <label>
            <FaLock />
          </label>
          <input
            className="outline-none flex-grow"
            value={details?.password}
            onChange={(e) =>
              setDetails((prev) => ({ ...prev, password: e.target.value }))
            }
            type="password"
            placeholder="Password"
          />
        </div>

        <div className="w-full mt-2">
          <button
            className="w-full p-2 font-semibold bg-green-600 hover:bg-green-800 text-white duration-300 "
            onClick={submitLogin}
          >
            Sign In
          </button>
        </div>
        <div className="w-full">
          <button className="w-full p-1 text-sm rounded-sm bg-transparent text-green-600 hover:text-green-700 duration-300 ">
            Forget Password?
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center text-center text-sm font-semibold p-4 border-t border-t-gray-200">
        Don&apos;t have an account?{" "}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsModalOpen(false);
            router.push("/signup");
          }}
          className="text-green-600 px-2"
        >
          Sign up
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
