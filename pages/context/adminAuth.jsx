import { createContext, useContext, useState } from "react";

const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [activePage, setActivePage] = useState("");

  return (
    <AdminContext.Provider value={{ activePage, setActivePage }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => useContext(AdminContext);

export default AdminContextProvider;
