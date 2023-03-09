import { useRouter } from "next/router";
import React, { useReducer, useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import { HiMail, HiPhone } from "react-icons/hi";
import { useAuthContext } from "../../pages/context/authContext";
import { useLoginModalContext } from "../../pages/context/loginModalContext";

import styles from "../../styles/Forms.module.scss";

const SignupForm = () => {
  const router = useRouter();
  const { nextAction } = useLoginModalContext();
  const { signup } = useAuthContext();
  const [details, setDetails] = useState({
    first_name: "",
    // last_name: "",
    password: "",
    email: "",
    // phone: "",
    confirm_password: "",
  });

  const submitSignup = (e) => {
    e.preventDefault();
    const data = details;

    const next = async () => {
      if (nextAction) {
        await nextAction.action();
      } else {
        await router.push("/modules");
      }
    };

    signup(data, next);
  };

  return (
    <form
      className={`w-full  flex flex-col gap-4 rounded-sm bg-white bg-opacity-90 backdrop-blur-sm text-gray-500 relative ${styles.form_wrapper}`}
    >
      <p className="text-center font-semibold mb-0 sm:mb-2 mt-5 sm:mt-10 text-3xl text-gray-600 font-raleway">
        Sign Up
      </p>
      <div className="flex flex-col gap-3 px-5 lg:px-10">
        <div className={`${styles.form_row}`}>
          <div className="flex gap-4 items-center py-2 px-4 border-b border-b-gray-300 ">
            <label>
              <FaUser />
            </label>
            <input
              className="outline-none flex-grow capitalize"
              value={details?.first_name}
              onChange={(e) =>
                setDetails((prev) => ({ ...prev, first_name: e.target.value }))
              }
              type="text"
              placeholder="First Name"
            />
          </div>
          <div className="flex gap-4 items-center py-2 px-4 border-b border-b-gray-300 ">
            <label>
              <HiMail />
            </label>
            <input
              className="outline-none flex-grow"
              value={details?.email}
              onChange={(e) =>
                setDetails((prev) => ({ ...prev, email: e.target.value }))
              }
              type="email"
              placeholder="Email"
              required
            />
          </div>
        </div>

        {/* <div className={`${styles.form_row}`}>
          <div className="flex gap-4 items-center py-2 px-4 border-b border-b-gray-300 ">
            <label>
              <HiPhone />
            </label>
            <input
              className="outline-none flex-grow"
              value={details?.phone}
              onChange={(e) =>
                setDetails((prev) => ({ ...prev, phone: e.target.value }))
              }
              type="tel"
              placeholder="Phone"
            />
          </div>
          <div className="flex gap-4 items-center py-2 px-4 border-b border-b-gray-300 ">
            <label>
              <FaUser />
            </label>
            <input
              className="outline-none flex-grow capitalize"
              value={details?.last_name}
              onChange={(e) =>
                setDetails((prev) => ({ ...prev, last_name: e.target.value }))
              }
              type="text"
              placeholder="Last Name"
            />
          </div>
        </div> */}

        <div className={`${styles.form_row}`}>
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
          <div className="flex gap-4 items-center py-2 px-4 border-b border-b-gray-300 ">
            <label>
              <FaLock />
            </label>
            <input
              className="outline-none flex-grow"
              value={details?.confirm_password}
              onChange={(e) =>
                setDetails((prev) => ({
                  ...prev,
                  confirm_password: e.target.value,
                }))
              }
              type="password"
              placeholder="Confirm Password"
            />
          </div>
        </div>

        <div className="w-full mt-2">
          <button
            className="w-full p-2 font-semibold rounded-sm bg-green-600 hover:bg-green-800 text-white duration-300 "
            onClick={submitSignup}
          >
            Sign Up
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center text-center text-sm font-semibold p-4 border-t border-t-gray-200">
        Already have an account?{" "}
        <button
          onClick={() => {
            router.push("/login");
          }}
          className="text-green-600 px-2"
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default SignupForm;
