import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../constants/variables";

const addFavorites = async (id) => {
  let returnMessage;

  try {
    const response = await axios.post(
      `${BASE_URL}/add-to-favorites`,
      { id },
      {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      }
    );

    if (response?.status === 201 || response?.status === 200) {
      if (response?.data?.message === "added") {
        toast.success("Added to favorites");
        returnMessage = {
          message: "success",
        };
      } else {
        toast.error("Removed from favorites");
        returnMessage = {
          message: "success",
        };
      }
      //   verifyUser();
    } else {
      toast.error("Failed to add to favorites");
      returnMessage = {
        message: "failed",
      };
    }
  } catch (error) {
    if (error?.response?.status === 401) {
      returnMessage = {
        message: "unauthorized",
      };
    } else {
      toast.error("An unexpected error occurred");
      returnMessage = {
        message: "failed",
      };
    }
  }

  return returnMessage;
};

export default addFavorites;
