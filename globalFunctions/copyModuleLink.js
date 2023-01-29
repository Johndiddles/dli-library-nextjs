import { toast } from "react-toastify";

const copyLink = async (id, bookName) => {
  try {
    navigator.clipboard.writeText(`${window.location.origin}/modules/${id}`);
    toast.success(`Copied link to ${bookName}`);
  } catch (error) {
    toast.error("Unable to copy link");
  }
};

export default copyLink;
