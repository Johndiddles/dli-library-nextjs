import mongoose from "mongoose";
const Grid = require("gridfs-stream");

let gfs;

const connectDB = () => {
  const conn = mongoose.createConnection(process.env.DATABASE_ACCESS);

  conn.once("open", () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("modules");
    console.log("db is connected...");
  });
  //   mongoose.connect(process.env.DATABASE_ACCESS, () =>{
  //     gfs = Grid(conn)
  //     console.log("db is connected")
  //  } );
};

export default connectDB;
