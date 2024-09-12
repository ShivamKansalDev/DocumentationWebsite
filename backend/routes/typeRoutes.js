import express from "express";
const router = express.Router();

import {
  getAllTypes,
  createType,
  getTypeById,
  updateType,
  deleteType,
} from "../controllers/typeController.js";
import { checkAccessToken } from "../controllers/authController.js";

// <-------------------- types -------------------->

// GET REQUESTS
// router.get("/", checkAccessToken, getAllTypes);
router.get("/", getAllTypes);

router.get("/:_id", getTypeById);

// POST REQUESTS
router.post("/create-type", createType);

// PUT REQUESTS
router.put("/update-type/:_id", checkAccessToken, updateType);

// DELETE REQUESTS
router.delete("/delete-type/:_id", checkAccessToken, deleteType);

export default router;
