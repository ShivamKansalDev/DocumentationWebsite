import express from "express";
const router = express.Router();

import {
  createTitle,
  deleteTitle,
  getAllTitles,
  getTitleById,
  getTitlesByTypeId,
  updateTitle,
} from "../controllers/titleController.js";
import { checkAccessToken } from "../controllers/authController.js";

// GET
// router.get("/", checkAccessToken, getAllTitles);
router.get("/", getAllTitles);
router.get("/:typeId", checkAccessToken, getTitlesByTypeId);
router.get("/title/:_id", checkAccessToken, getTitleById);

// POST
router.post("/create-title", createTitle);

// PUT
router.put("/update-title/:_id", checkAccessToken, updateTitle);

// DELETE
router.delete("/delete-title/:_id", checkAccessToken, deleteTitle);

export default router;
