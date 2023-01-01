const moduleTemplateCopy = require("../../models/createModule");

export default function handler(req, res) {
  const { method } = req;

  if (method === "GET") {
    moduleTemplateCopy
      .find()
      .then((response) => {
        console.log({ response });

        res.status(201).json({
          message: "success",
          data: response,
        });
      })
      .catch((error) => console.log(error));
  }
}
