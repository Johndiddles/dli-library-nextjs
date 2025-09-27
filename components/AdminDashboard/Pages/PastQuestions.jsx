import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../../globalFunctions/axiosInstance";
import { useAdminContext } from "../../../pages/context/adminAuth";
// import ModulesTable from "../Components/ModulesTable";
import PastQuestionsTable from "../Components/PastQuestionsTable";

const PastQuestions = ({ page }) => {
  const { setActivePage } = useAdminContext();

  useEffect(() => {
    setActivePage(() => page);
  }, [page, setActivePage]);
  return (
    <div>
      <PastQuestionsTable />
    </div>
  );
};

export default PastQuestions;
