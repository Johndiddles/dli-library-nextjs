import React, { useEffect, useState } from "react";
import { useAdminContext } from "../../../pages/context/adminAuth";
import SupportTable from "../Components/SupportTable";

const SupportPanel = ({ page }) => {
  const { setActivePage } = useAdminContext();

  useEffect(() => {
    setActivePage(() => page);
  }, [page, setActivePage]);

  return (
    <div>
      <SupportTable />
    </div>
  );
};

export default SupportPanel;
