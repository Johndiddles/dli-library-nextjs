const storeModuleTemplateCopy = require("../../../models/storeModule");

export default function handler(req, res) {
  const { method } = req;

  if (method === "GET") {
    storeModuleTemplateCopy
      .find({ id: req.query.id })
      .then((response) => {
        res.status(200).json(response[0]);
      })
      .catch((error) => {
        console.log(error);
        res.status(404).json({ message: "Module not found" });
      });
  }
}
