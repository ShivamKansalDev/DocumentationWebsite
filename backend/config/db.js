import mongoose from "mongoose";
import config from "../config/config.js";

const URI = config.db.mongo_url;

async function connectDB() {
  try {
    await mongoose.connect(URI);
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.log("Error Connecting to mongoDB:", error);
  }
}

connectDB().catch(console.dir);

export default connectDB;
