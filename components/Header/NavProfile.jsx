import React, { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { BiLogOutCircle } from "react-icons/bi";
// import { useAuthContext } from "../../pages/context/authContext";
// import { useLoginModalContext } from "../../pages/context/loginModalContext";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const NavProfile = ({ mobile, toggleNavbar }) => {
  const router = useRouter();
  const { data: session } = useSession();
  // const { setIsModalOpen } = useLoginModalContext();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const logout = () => router.push("/api/auth/signout?callbackUrl=/");
  return (
    <div className="relative">
      {session ? (
        <>
          {mobile ? (
            <div className="w-full flex justify-between py-5">
              <button
                className="rounded-[50px] px-8 py-3 text-2xl text-gray-100 bg-red-800 duration-300 flex items-center gap-1"
                style={{
                  fontFamily: "var(--font-cinzel)",
                }}
                onClick={() => {
                  logout();
                  toggleMenu();
                  toggleNavbar();
                }}
              >
                <BiLogOutCircle />
                Logout
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={toggleMenu}
                className={`bg-transparent h-10 w-10 flex items-center justify-center border border-gray-500 cursor-pointer rounded-full overflow-hidden`}
              >
                <AiOutlineUser />
              </button>
              <div className="relative">
                <div
                  className={`bg-white bg-opacity-80 rounded-lg absolute mt-2 right-0 overflow-hidden ${
                    isMenuOpen ? "flex flex-col" : "hidden"
                  }`}
                >
                  <button
                    className="py-2 px-4 text-gray-600 hover:bg-white duration-300"
                    onClick={() => {
                      logout();
                      toggleMenu();
                    }}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <button
          onClick={() => {
            router.push("/api/auth/signin?callbackUrl=/");
            // setIsModalOpen((prev) => !prev);
            // mobile && toggleNavbar();
          }}
          className={`flex items-center gap-1 duration-300 shadow-md ${
            mobile
              ? "text-gray-100 text-2xl mt-10 bg-green-700 rounded-[50px] px-8 py-3"
              : "text-gray-100 bg-green-600 hover:bg-green-700 rounded-3xl px-4 py-1"
          }`}
          style={{
            fontFamily: mobile ? "var(--font-cinzel)" : "",
          }}
        >
          <AiOutlineUser /> Login
        </button>
      )}
    </div>
  );
};

export default NavProfile;
