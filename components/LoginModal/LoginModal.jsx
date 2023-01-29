import React from "react";
import { IoClose } from "react-icons/io5";
import { useLoginModalContext } from "../../pages/context/loginModalContext";
import LoginForm from "../Login/LoginForm";

const LoginModal = () => {
  const { setIsModalOpen } = useLoginModalContext();
  return (
    <div className="fixed z-50 top-0 left-0 px-4 w-screen h-screen overflow-scroll bg-black bg-opacity-80 backdrop-blur-sm flex justify-center items-center">
      <div className="relative w-full max-w-[360px]">
        <button
          className="absolute top-3 right-3 z-20 text-gray-400 hover:text-gray-600 duration-300 bg-transparent text-xl"
          onClick={() => setIsModalOpen((prev) => !prev)}
        >
          <span>
            <IoClose />
          </span>
        </button>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginModal;
