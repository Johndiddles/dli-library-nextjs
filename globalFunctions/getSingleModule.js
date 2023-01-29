import axios from "axios";
import { BASE_URL } from "../constants/variables";

const singleModule = async (id) => {
  let book;
  let status;
  let error;
  let message;

  await fetch(`${BASE_URL}/modules/${id}`)
    .then((res) =>
      res
        .blob()
        .then((blob) => {
          book = blob;
          status = "success";
          message = "Successfully fetched book";
        })
        .catch((error) => {
          // console.log({ error });
          status = "failed";
          message = "Could not find book";
        })
    )

    .catch((error) => {
      // console.log({ error });
      status = "failed";
      message = "Could not find book";
    });

  return { book, error, status, message };
};

export default singleModule;
