import mongoose from "mongoose";

const connectDB = () => {
  console.log("connecting...");
  mongoose.connect(process.env.DATABASE_ACCESS, () =>
    console.log("db is connected")
  );
};

export default connectDB;
