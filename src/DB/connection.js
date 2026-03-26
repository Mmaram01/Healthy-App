import mongoose from "mongoose";

const connectDB = async ()=>{
  try {
    await mongoose.connect(process.env.DB_URL,{
      serverSelectionTimeoutMS: 5000
});
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Failed to connect to database:", error.message);
    process.exit(1);
  }
};
export default connectDB;