import mongoose from "mongoose";
let isConnected = false;
async function DbCon() {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI);
    isConnected = true;
    console.log("Mongodb connnected");
  } catch (error) {
    console.error("Database Connection Problem!", error);
    process.exit(1); // Exit process if DB connection fails
  }
}
export default DbCon;
