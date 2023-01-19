import connectDB from "../../../db/connect";

const bodyParser = require("body-parser");
const path = require("path");
const multer = require("multer");
const crypto = require("crypto");
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const methodOverride = require("method-override");
const nc = require("next-connect");
const moduleTemplateCopy = require("../../../models/createModule");

export const config = {
  api: {
    bodyParser: false,
  },
};

connectDB();

const handler = nc();

const express = require("express");

const app = express();

handler.use(bodyParser.json());
handler.use(methodOverride("_method"));

const storage = new GridFsStorage({
  url: process.env.DATABASE_ACCESS,
  file: (req, file) => {
    console.log({ file });
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const id = buf.toString("hex");
        const filename = `module-${id}${path.extname(file.originalname)}`;
        const fileInfo = {
          id,
          filename: filename,
          bucketName: "modules",
        };

        console.log({ fileInfo });
        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({ storage });

const uploadFile = upload.single("module");

handler.use(uploadFile);

handler.post((req, res) => {
  console.log({ file: req.file, body: JSON.stringify(req.body) });

  const uploadModule = new moduleTemplateCopy({
    id: req.file.id,
    filename: req.file.filename,
    courseCode: req.body.courseCode,
    courseTitle: req.body.courseTitle,
    level: req.body.level,
    department: req.body.department,
  });

  console.log({ uploadModule });

  uploadModule
    .save()
    .then((data) => {
      console.log("fileUpload: ", data);
      uploadModule
        .save()
        .then((data) => {
          res.status(201).json({
            data: {
              status: "success",
              message: "module uploaded successfully",
              data: data,
            },
          });
        })
        .catch((error) => {
          res.json(error);
        });
    })
    .catch((error) => console.log(error));

  res.status(201).json({ message: "hit the server" });
});

// const addModule = async (req, res) => {
//   res.status(200).json({ message: "success" });
// };

export default handler;
