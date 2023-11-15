import { BASE_URL } from "../constants/variables";

const getSinglePastQuestion = async (id) => {
  let pastQuestion;
  let status;
  let error;
  let message;

  await fetch(`${BASE_URL}/past-questions/${id}`)
    .then((res) =>
      res
        .blob()
        .then((blob) => {
          pastQuestion = blob;
          status = "success";
          message = "Successfully fetched past question";
        })
        .catch((error) => {
          // console.log({ error });
          status = "failed";
          message = "Could not find past question";
        })
    )

    .catch((error) => {
      // console.log({ error });
      status = "failed";
      message = "Could not find past question";
    });

  return { pastQuestion, error, status, message };
};

export default getSinglePastQuestion;
