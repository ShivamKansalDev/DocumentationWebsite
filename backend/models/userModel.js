import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  accessToken: { type: String, required: true },
  refreshToken: { type: String, required: true },
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
