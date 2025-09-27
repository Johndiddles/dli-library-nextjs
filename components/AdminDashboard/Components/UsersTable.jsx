import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { axiosInstance } from "../../../globalFunctions/axiosInstance";

import styles from "../../../styles/Table.module.scss";

import spinner from "../../../assets/spinner.svg";
import Spinner from "../../Loader/Spinner";
import { useSession } from "next-auth/react";

const UsersTable = () => {
  const { data: session } = useSession();
  const [fetchStatus, setFetchStatus] = useState("idle");
  const [users, setUsers] = useState([]);

  const token = session.user.token;

  useEffect(() => {
    const fetchUsers = async () => {
      setFetchStatus("pending");
      try {
        const response = await axiosInstance.get("admin/get-all-users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log({ response });
        setUsers(response?.data);
        setFetchStatus("success");
      } catch (error) {
        console.log({ error });
        setFetchStatus("failed");
      }
    };

    if (fetchStatus === "idle") fetchUsers();
  }, [fetchStatus, token]);

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
    if (fetchStatus === "success" && users.length > 0) {
      return users.map((user, index) => (
        <tr
          key={user?.id}
          className={`${styles.table__row} ${styles.users__table__row}`}
        >
          <td>{index + 1}</td>
          <td>{user.name}</td>
          <td className={`${styles.users__table__email}`}>{user?.email}</td>
          <td>{user?.role === "user" ? "User" : "Admin"}</td>
          <td>
            <button className="py-[6px] px-4 bg-gray-700 text-gray-300 rounded text-sm shadow-lg duration-300 hover:bg-gray-900 hover:text-gray-100 font-semibold">
              Edit
            </button>
          </td>
        </tr>
      ));
    }
  }, [fetchStatus, users]);

  return (
    <div className={`w-full`}>
      <div className="bg-white px-4 py-4 rounded-t-2xl">
        <h4 className="font-bold text-lg font-montserrat text-slate-800">
          All Users
        </h4>
      </div>
      <table className={`${styles.table}`}>
        <thead className={`${styles.table__head}`}>
          <tr className={`${styles.table__row} ${styles.users__table__row}`}>
            <th className={`font-extrabold text-base text-slate-700`}>#</th>
            <th className={`font-extrabold text-base text-slate-700`}>Name</th>
            <th className={`font-extrabold text-base text-slate-700`}>Email</th>
            <th className={`font-extrabold text-base text-slate-700`}>Role</th>
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

export default UsersTable;
