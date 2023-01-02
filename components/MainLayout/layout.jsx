import React, { Suspense } from "react";
import LoadingScreen from "./loading";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Suspense fallback={<LoadingScreen />}>
        <Header />
        {children}
        <Footer />
      </Suspense>
    </div>
  );
};

export default MainLayout;
