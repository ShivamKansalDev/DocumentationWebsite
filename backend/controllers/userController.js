import UserModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import bcrypt from "bcrypt";

const userAuthKey = config.authKey;

// GET REQUESTS
/* 
  Route: users/get-all-users
  Params: 
  Body: 
  Request: GET
  Access: admin
*/
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/* 
  Route: users/:_id
  Params: _id
  Body: id
  Request: GET
  Access: user
*/
export const getUserById = async (req, res) => {
  try {
    const { _id } = req.params;
    const user = await UserModel.findOne({ _id });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// POST REQUESTS
/* 
  Route: users/signup
  Params: 
  Body: {name, email, password}
  Request: POST
  Access: anyone 
*/
export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide name, email and password" });
  }
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const accessToken = jwt.sign({ result: email }, userAuthKey, {
      expiresIn: "1d",
    });
    const refreshToken = jwt.sign({ result: email }, userAuthKey, {
      expiresIn: "7d",
    });
    const user_details = {
      name,
      email,
      password: hashedPassword,
      role: "user",
      accessToken,
      refreshToken,
    };
    try {
      const user = new UserModel(user_details);
      console.log("user: ", user);
      const result = await user.save();
      if (user) {
        res
          .status(200)
          .json({ message: "User registered successfully", data: user });
      }
    } catch (error) {
      return res.status(500).json({ message: "Database Error", error: error });
    }
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err });
  }
};

/* 
  Route: users/login
  Params: 
  Body: {email, password}
  Request: POST
  Access: anyone
*/
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide both email and password" });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email" });
    }
    bcrypt.compare(password, user.password, async (error, same) => {
      if (error) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
      if (!same) {
        return res.status(400).json({ message: "Incorrect password" });
      }
      const accessToken = jwt.sign({ result: email }, userAuthKey, {
        expiresIn: "1d",
      });
      const refreshToken = jwt.sign({ result: email }, userAuthKey, {
        expiresIn: "7d",
      });

      try {
        const updatedUser = await UserModel.findOneAndUpdate(
          { email: email },
          { accessToken: accessToken, refreshToken: refreshToken },
          { new: true }
        );
        if (!updatedUser) {
          return res.status(400).json({ message: "Database error" });
        }
        return res
          .status(200)
          .json({ message: "Logged in user successfully", user: updatedUser });
      } catch (dbError) {
        return res
          .status(500)
          .json({ message: "Database error", error: dbError });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error });
  }
};

export const refreshAccessToken = async (req, res) => {
  try {
    const accessToken = req.user;
    const { email } = req.body;
    if (accessToken) {
      const updatedUser = await UserModel.findOneAndUpdate(
        { email },
        { accessToken },
        { new: true }
      );
      return res
        .status(200)
        .json({
          message: "Access token regenerated! ",
          updatedUser,
          token: accessToken,
        });
    } else {
      return res.status(403).end("!!!! Unable to regenerate access token");
    }
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};
