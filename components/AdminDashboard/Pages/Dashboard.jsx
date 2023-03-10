import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../../globalFunctions/axiosInstance";
import { useAdminContext } from "../../../pages/context/adminAuth";
import ModulesTable from "../Components/ModulesTable";

const Dashboard = ({ page }) => {
  const { setActivePage } = useAdminContext();

  useEffect(() => {
    setActivePage(() => page);
  }, [page, setActivePage]);
  return (
    <div>
      <ModulesTable />
    </div>
  );
};

export default Dashboard;
