import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../../globalFunctions/axiosInstance";
import styles from "../../../styles/Table.module.scss";

const DepartmentsList = ({ fetchStatus, setFetchStatus }) => {
  const [departments, setDepartments] = useState([]);
  useEffect(() => {
    const fetchDepartments = async () => {
      setFetchStatus("pending");
      const response = await axiosInstance("departments");
      // console.log({ response });

      if (response?.status === 200) {
        setDepartments(response?.data);
        setFetchStatus("success");
      } else {
        setFetchStatus("failed");
      }
    };

    if (fetchStatus === "idle") fetchDepartments();
  }, [fetchStatus, setFetchStatus]);

  return (
    <div className="w-1/2 rounded bg-white pt-10 pb-4 px-8 shadow-lg">
      <div className="text-2xl font-semibold">All Departments</div>
      <table className={`${styles.table}`}>
        <thead
          className={`${styles.table__head} ${styles.departments__table__head}`}
        >
          <tr
            className={`${styles.table__row} ${styles.departments__table__row}`}
          >
            <th className={`font-extrabold text-base text-slate-700`}>#</th>
            <th className={`font-extrabold text-base text-slate-700`}>Name</th>
            <th className={`font-extrabold text-base text-slate-700`}>Slug</th>
          </tr>
        </thead>
        <tbody>
          {departments?.map((dept, index) => (
            <tr
              key={module?.id}
              className={`${styles.table__row} ${styles.departments__table__row}`}
            >
              <td>{index + 1}</td>
              <td>{dept?.title}</td>
              <td>{dept?.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentsList;
