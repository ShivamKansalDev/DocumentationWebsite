import express from "express";
const router = express.Router();

import {
  signup,
  login,
  getAllUsers,
  getUserById,
} from "../controllers/userController.js";
import {
  checkAccessToken,
  checkRefreshToken,
} from "../controllers/authController.js";

// router.post("/refresh-access-token", checkRefreshToken, refreshAccessToken);

router.post("/signup", signup);

router.post("/login", login);

router.get("/get-all-users", checkAccessToken, getAllUsers);

router.get("/:_id", checkAccessToken, getUserById);

export default router;
