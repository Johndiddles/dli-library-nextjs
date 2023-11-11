import React, { useState } from "react";
import { axiosInstance } from "../../../globalFunctions/axiosInstance";
import { BASE_URL } from "../../../constants/variables";
import axios from "axios";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

const AddDepartmentForm = ({ setFetchStatus }) => {
  const { data: session } = useSession();
  const token = session.user.token;

  const [details, setDetails] = useState({
    title: "",
    value: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const clearInputs = () => setDetails({ title: "", value: "" });

  const createDepartment = async (e) => {
    e.preventDefault();

    console.log({ details });
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/admin/add-department`,
        details,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.status === 201) {
        toast.success(response?.data?.data?.message);
        setFetchStatus("idle");
        clearInputs();
      } else {
        toast.error(response?.data?.data?.message);
      }

      setIsSubmitting(false);
    } catch (error) {
      console.log({ error });
      setIsSubmitting(false);
      toast.error(error?.response?.data?.data?.message);
    }
  };
  return (
    <div className="w-1/2 rounded bg-white pt-10 pb-4 px-8 shadow-lg">
      <div className="text-2xl font-semibold">Add Department</div>
      <form action="" className="py-8 flex flex-col gap-4 w-full">
        <div className="form-group flex flex-col gap-2 text-sm font-semibold">
          <label htmlFor="title" className="label font-semibold">
            Department Title:
          </label>
          <input
            type="text"
            placeholder="Enter department title..."
            value={details?.title}
            onChange={(e) =>
              setDetails((prev) => ({
                ...prev,
                title: e.target.value,
              }))
            }
            className="px-3 py-[10px] font-normal border border-gray-200 rounded-lg outline-none"
          />
        </div>
        <div className="form-group flex flex-col gap-2 text-sm font-semibold">
          <label htmlFor="title" className="label font-semibold">
            Department Value/Slug:
          </label>
          <input
            type="text"
            placeholder="Enter department slug..."
            value={details?.value}
            onChange={(e) =>
              setDetails((prev) => ({
                ...prev,
                value: e.target.value,
              }))
            }
            className="px-3 py-[10px] font-normal border border-gray-200 rounded-lg outline-none"
          />
        </div>

        <div className="form-group flex justify-end gap-2 text-sm font-semibold">
          <button
            className={`bg-green-600 w-fit text-white rounded-lg px-6 py-3 font-normal text-sm hover:bg-green-800 duration-300`}
            onClick={createDepartment}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating Department..." : "Create Department"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDepartmentForm;
