import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    console.log("db.js: liên kết csdl thành công");
  } catch (error) {
    console.error("Lỗi csdl:", error);
    process.exit(1); // exit database with error
  }
};
