import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../../globalFunctions/axiosInstance";
import { useAdminContext } from "../../../pages/context/adminAuth";
import UsersTable from "../Components/UsersTable";

const UsersPanel = ({ page }) => {
  const { setActivePage } = useAdminContext();

  useEffect(() => {
    setActivePage(() => page);
  }, [page, setActivePage]);
  return (
    <div>
      <UsersTable />
    </div>
  );
};

export default UsersPanel;
