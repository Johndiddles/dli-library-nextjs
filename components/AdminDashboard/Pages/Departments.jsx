import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../../globalFunctions/axiosInstance";
import { useAdminContext } from "../../../pages/context/adminAuth";
import ModulesTable from "../Components/ModulesTable";
import AddDepartmentForm from "../Components/AddDepartmentForm";
import DepartmentsList from "../Components/Departments";

const Departments = ({ page }) => {
  const { setActivePage } = useAdminContext();

  const [fetchStatus, setFetchStatus] = useState("idle");

  useEffect(() => {
    setActivePage(() => page);
  }, [page, setActivePage]);
  return (
    <div className="flex gap-4">
      <AddDepartmentForm setFetchStatus={setFetchStatus} />
      <DepartmentsList
        fetchStatus={fetchStatus}
        setFetchStatus={setFetchStatus}
      />
    </div>
  );
};

export default Departments;
