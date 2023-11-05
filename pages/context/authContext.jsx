import axios from "axios";
import { useRouter } from "next/router";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../../constants/variables";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState({});
  const [token, setToken] = useState(null);
  const [isAuth, setIsAuth] = useState(false);

  const [loginStatus, setLoginStatus] = useState("idle");
  const [signupStatus, setSignupStatus] = useState("idle");

  const signup = async (data, next) => {
    console.log(next);
    try {
      setSignupStatus("pending");
      const response = await axios.post(`${BASE_URL}/user/create`, data);

      if (response?.status === 201 || response?.status === 200) {
        localStorage.setItem("token", response?.data?.data?.token);

        setToken(() => response?.data?.data?.token);
        setUser(() => response?.data?.data?.user);
        setIsAuth(() => true);

        setTimeout(() => next(response?.data?.data?.token), 100);
        toast.success(`Your account was successfully created`);
        setSignupStatus("success");
      }
    } catch (error) {
      // console.log({ error });
      setSignupStatus("failed");
      if (error?.response?.status === 400) {
        toast.error(error?.response?.data?.message);
      } else toast.error("Unable to complete your request at the moment.");
    }
  };

  const login = async (data, next) => {
    try {
      setLoginStatus("pending");
      const response = await axios.post(`${BASE_URL}/user/login`, data);

      if (response?.status === 201 || response?.status === 200) {
        const { data } = response?.data;
        localStorage.setItem("token", data?.token);

        console.log({ data });

        setToken(() => data?.token);
        setUser(() => data?.user);
        setIsAuth(() => true);

        if (data?.user?.role === "admin") {
          router.push("/admin/dashboard/index");
        } else if (next) {
          setTimeout(() => next(data?.token), 100);
        }

        toast.success("Welcome Back!");
        setLoginStatus("success");
      }
    } catch (error) {
      setLoginStatus("failed");
      toast.error(
        error?.data?.message ?? "Unable to complete your request at the moment."
      );
    }
  };

  const logout = () => {
    setIsAuth(false);
    setUser({});
    setToken("");
    localStorage.clear();
    toast.success("Logged out successfully");
  };

  const verifyUser = useCallback(() => {
    const verifyUserFunc = async () => {
      try {
        const response = await axios.post(
          `${BASE_URL}/user/verify`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token ?? localStorage?.token}`,
            },
          }
        );

        if (response?.status === 200 || response?.status === 201) {
          setIsAuth(true);
          setUser(response?.data?.user);
        }
      } catch (error) {
        // console.log({ error });
        if (error?.response?.status === 401) {
          localStorage.clear();
          setIsAuth(false);
          setUser({});
          setToken("");
        }
      }
    };

    return verifyUserFunc();
  }, [token]);

  useEffect(() => {
    if (localStorage.token) {
      setToken(localStorage?.token);
    }

    if (!isAuth && localStorage.token) {
      verifyUser();
    }
  }, [isAuth, verifyUser]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        isAuth,
        setIsAuth,
        login,
        logout,
        loginStatus,
        setLoginStatus,
        verifyUser,
        signup,
        signupStatus,
        setSignupStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthContextProvider;
