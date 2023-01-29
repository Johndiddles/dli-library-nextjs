import { createContext, useContext, useState } from "react";
import LoginModal from "../../components/LoginModal/LoginModal";

const LoginModalContext = createContext();

const LoginModalContextProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nextAction, setNextAction] = useState(null);
  return (
    <LoginModalContext.Provider
      value={{ isModalOpen, setIsModalOpen, nextAction, setNextAction }}
    >
      {isModalOpen && <LoginModal />}
      {children}
    </LoginModalContext.Provider>
  );
};

export const useLoginModalContext = () => useContext(LoginModalContext);

export default LoginModalContextProvider;
