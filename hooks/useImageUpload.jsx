import { useState } from "react";
import axios from "axios";

const useImageUpload = () => {
  const [uploadStatus, setUploadStatus] = useState("idle");
  const [imgUrl, setImgUrl] = useState("");

  const uploadImage = async (file) => {
    setUploadStatus("pending");
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", "dli_library");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dwayjinxq/image/upload",
        formData
      );
      // console.log({ response })
      setImgUrl(response?.data?.url);
      if (response?.status === 200) {
        const url = response?.data?.url;
        setUploadStatus("success");
        return url;
      } else {
        setUploadStatus("failed");
      }
    } catch (error) {
      setUploadStatus("failed");
    }
  };

  return { uploadImage, uploadStatus, imgUrl };
};

export default useImageUpload;
