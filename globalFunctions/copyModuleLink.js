import { toast } from "react-toastify";

const copyLink = async (id, title, type) => {
  try {
    navigator.clipboard.writeText(`${window.location.origin}/${type}/${id}`);
    toast.success(`Copied link to ${title}`);
  } catch (error) {
    toast.error("Unable to copy link");
  }
};

export default copyLink;
