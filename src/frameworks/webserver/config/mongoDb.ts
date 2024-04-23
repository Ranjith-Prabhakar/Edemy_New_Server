import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const DB_String: string = process.env.DB || "";

const connectDB = async () => {
  try {
    await mongoose
      .connect(DB_String)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((data: any) =>
        console.log(`db connected on ${data.connection.host}`)
      );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error.message);
    setTimeout(connectDB, 5000);
  }
};
export default connectDB;
