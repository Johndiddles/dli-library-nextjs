import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
