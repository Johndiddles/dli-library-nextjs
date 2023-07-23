import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { axiosInstance } from "../../../globalFunctions/axiosInstance";

import styles from "../../../styles/Table.module.scss";

import spinner from "../../../assets/spinner.svg";
import Spinner from "../../Loader/Spinner";

const ModulesTable = () => {
  const [fetchStatus, setFetchStatus] = useState("idle");
  const [modules, setModules] = useState([]);

  useEffect(() => {
    const fetchModules = async () => {
      setFetchStatus("pending");
      try {
        const response = await axiosInstance.get("modules");
        // console.log({ response });
        setModules(response?.data);
        setFetchStatus("success");
      } catch (error) {
        console.log({ error });
        setFetchStatus("failed");
      }
    };

    if (fetchStatus === "idle") fetchModules();
  }, [fetchStatus]);

  const tableData = useMemo(() => {
    if (fetchStatus === "pending") {
      return (
        <tr
          style={{
            display: "table-cell",
          }}
        >
          <td colSpan={6} className="flex justify-center py-4 text-center">
            <Spinner />
          </td>
        </tr>
      );
    }
    if (fetchStatus === "success" && modules.length > 0) {
      return modules.map((module, index) => (
        <tr
          key={module?.id}
          className={`${styles.table__row} ${styles.modules__table__row}`}
        >
          <td>{index + 1}</td>
          <td>{module?.courseCode}</td>
          <td>{module?.courseTitle}</td>
          <td>{module?.department?.split(",")?.join(", ")}</td>
          <td>{module?.level}</td>
          <td>
            <button className="py-[6px] px-4 bg-gray-700 text-gray-300 rounded text-sm shadow-lg duration-300 hover:bg-gray-900 hover:text-gray-100 font-semibold">
              Edit
            </button>
          </td>
        </tr>
      ));
    }
  }, [fetchStatus, modules]);

  return (
    <div className={`w-full`}>
      <div className="bg-white px-4 py-4 rounded-t-2xl">
        <h4 className="font-bold text-lg font-montserrat text-slate-800">
          All Modules
        </h4>
      </div>
      <table className={`${styles.table}`}>
        <thead className={`${styles.table__head}`}>
          <tr className={`${styles.table__row} ${styles.modules__table__row}`}>
            <th className={`font-extrabold text-base text-slate-700`}>#</th>
            <th className={`font-extrabold text-base text-slate-700`}>
              Course Code
            </th>
            <th className={`font-extrabold text-base text-slate-700`}>
              Course Tile
            </th>
            <th className={`font-extrabold text-base text-slate-700`}>
              Department
            </th>
            <th className={`font-extrabold text-base text-slate-700`}>Level</th>
            <th className={`font-extrabold text-base text-slate-700`}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>{tableData}</tbody>
      </table>
    </div>
  );
};

export default ModulesTable;
