import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { axiosInstance } from "../../../globalFunctions/axiosInstance";

import styles from "../../../styles/Table.module.scss";

import spinner from "../../../assets/spinner.svg";
import { BsSearch } from "react-icons/bs";
import Spinner from "../../Loader/Spinner";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import moment from "moment/moment";

const PastQuestionsTable = () => {
  const [fetchStatus, setFetchStatus] = useState("idle");
  const [pastQuestions, setPastQuestions] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchPastQuestions = async () => {
      setFetchStatus("pending");
      try {
        const response = await axiosInstance.get("past-questions");
        // console.log({ response });
        setPastQuestions(response?.data);
        setFetchStatus("success");
      } catch (error) {
        console.log({ error });
        setFetchStatus("failed");
      }
    };

    if (fetchStatus === "idle") fetchPastQuestions();
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
    if (fetchStatus === "success" && pastQuestions.length > 0) {
      return pastQuestions
        ?.sort((a, b) => {
          if (a?.courseCode?.toLowerCase() < b.courseCode?.toLowerCase()) {
            return -1;
          }
          if (a?.courseCode?.toLowerCase() > b.courseCode?.toLowerCase()) {
            return 1;
          }
        })
        ?.filter(
          (pastQuestion) =>
            pastQuestion?.courseCode
              ?.toLowerCase()
              ?.includes(search?.toLowerCase()) ||
            pastQuestion?.courseTitle
              ?.toLowerCase()
              ?.includes(search?.toLowerCase()) ||
            pastQuestion?.department
              ?.toLowerCase()
              ?.includes(search?.toLowerCase())
        )
        .map((pastQuestion, index) => (
          <tr
            key={pastQuestion?.id}
            className={`${styles.table__row} ${styles.pastQuestions__table__row}`}
          >
            <td>{index + 1}</td>
            <td>{pastQuestion?.courseCode}</td>
            <td>{pastQuestion?.courseTitle}</td>
            <td>{pastQuestion?.departments?.join(", ")}</td>
            <td>{pastQuestion?.level}</td>
            <td>{pastQuestion?.session}</td>
            <td>
              {moment(pastQuestion?.updatedAt).format("Do-MMM-YYYY | hh:mmA")}
            </td>
            <td>
              <Link
                href={`/admin/dashboard/edit-past-question?pastQuestionId=${pastQuestion?.id}`}
                className="my-2 py-[6px] px-4 bg-gray-700 text-gray-300 rounded text-sm shadow-lg duration-300 hover:bg-gray-900 hover:text-gray-100 font-semibold"
              >
                Edit
              </Link>
            </td>
          </tr>
        ));
    }
  }, [fetchStatus, pastQuestions, search]);

  return (
    <div className={`w-full`}>
      <div className="bg-white px-4 py-4 rounded-t-2xl flex justify-between items-center">
        <h4 className="font-bold text-lg font-montserrat text-slate-800">
          All Past Questions
        </h4>

        <div className="flex gap-4 items-center ">
          <div className="border border-gray-200 py-1 px-2 flex gap-2 rounded-lg items-center text-gray-500">
            <BsSearch />
            <input
              type="text"
              placeholder="search past questions..."
              className=" outline-none "
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <Link
            href="/admin/dashboard/add-past-question"
            className="flex items-center gap-2 bg-gray-700 text-gray-300 hover:bg-gray-900 hover:text-gray-100 duration-300 font-semibold text-sm py-2 px-4 rounded"
          >
            <FaPlus />
            Add Past Questions
          </Link>
        </div>
      </div>
      <table className={`${styles.table}`}>
        <thead className={`${styles.table__head}`}>
          <tr
            className={`${styles.table__row} ${styles.pastQuestions__table__row}`}
          >
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
              Session
            </th>
            <th className={`font-extrabold text-base text-slate-700`}>
              Last Updated
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

export default PastQuestionsTable;
