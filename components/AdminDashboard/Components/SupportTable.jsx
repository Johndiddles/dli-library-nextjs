// import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { FaEye } from "react-icons/fa";
import { axiosInstance } from "../../../globalFunctions/axiosInstance";

import styles from "../../../styles/Table.module.scss";

// import spinner from "../../../assets/spinner.svg";
import Spinner from "../../Loader/Spinner";
import { useSession } from "next-auth/react";

const SupportTable = () => {
  const { data: session } = useSession();
  const [fetchStatus, setFetchStatus] = useState("idle");
  const [messages, setMessages] = useState([]);

  const token = session.user.token;

  useEffect(() => {
    const fetchMessages = async () => {
      setFetchStatus("pending");
      try {
        const response = await axiosInstance.get("admin/get-contact-messages", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log({ response });
        setMessages(response?.data);
        setFetchStatus("success");
      } catch (error) {
        console.log({ error });
        setFetchStatus("failed");
      }
    };

    if (fetchStatus === "idle") fetchMessages();
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
    if (fetchStatus === "success" && messages.length > 0) {
      return messages.map((message, index) => (
        <tr
          key={message?.id}
          className={`${styles.table__row} ${styles.support__table__row}`}
        >
          <td>{index + 1}</td>
          <td>{message?.full_name}</td>
          <td className={`${styles.support__table__contact_info}`}>
            {message?.contact_info}
          </td>
          <td className={`${styles.support__table__contact_message}`}>
            {message?.message}
          </td>
          <td>
            <button className="py-[6px] px-4 bg-gray-700 text-gray-300 rounded text-sm shadow-lg duration-300 hover:bg-gray-900 hover:text-gray-100 font-semibold flex justify-center gap-2 items-center">
              <FaEye /> View
            </button>
          </td>
        </tr>
      ));
    }
  }, [fetchStatus, messages]);

  return (
    <div className={`w-full`}>
      <div className="bg-white px-4 py-4 rounded-t-2xl">
        <h4 className="font-bold text-lg font-montserrat text-slate-800">
          All Users
        </h4>
      </div>
      <table className={`${styles.table}`}>
        <thead className={`${styles.table__head}`}>
          <tr className={`${styles.table__row} ${styles.support__table__row}`}>
            <th className={`font-extrabold text-base text-slate-700`}>#</th>
            <th className={`font-extrabold text-base text-slate-700`}>Name</th>
            <th className={`font-extrabold text-base text-slate-700`}>
              Contact Info
            </th>
            <th className={`font-extrabold text-base text-slate-700`}>
              Message
            </th>
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

export default SupportTable;
