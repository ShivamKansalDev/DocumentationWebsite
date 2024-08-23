const mongoose = require("mongoose")
const config = require("../config/config");

const URI = config.default.db.mongo_url;

async function connectDB() {
  try {
    await mongoose.connect(URI);
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error){
    console.log("Error Connecting to mongoDB:", error)  ;
  }
}

connectDB().catch(console.dir);

module.exports = connectDB;
