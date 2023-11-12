import React, { Suspense } from "react";
import LoadingScreen from "./loading";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import AuthContextProvider from "../../pages/context/authContext";
import LoginModalContextProvider, {
  useLoginModalContext,
} from "../../pages/context/loginModalContext";
import { SessionProvider } from "next-auth/react";

const MainLayout = ({ children }) => {
  // const { isModalOpen } = useLoginModalContext();
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <SessionProvider>
        <AuthContextProvider>
          <LoginModalContextProvider>
            <Suspense fallback={<LoadingScreen />}>
              <Header />
              {children}
              <Footer />
            </Suspense>
          </LoginModalContextProvider>
        </AuthContextProvider>
      </SessionProvider>
    </div>
  );
};

export default MainLayout;
