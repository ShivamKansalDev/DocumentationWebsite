import express from "express";
const router = express.Router();

import { checkAccessToken } from "../controllers/authController.js";
import {
  createQuestion,
  deleteQuestion,
  getAllQuestions,
  getAllQuestionsByTitleId,
  getAllQuestionsByTypeId,
  updateQuestion,
} from "../controllers/questionController.js";

// GET
router.get("/", getAllQuestions);
// router.get("/", checkAccessToken, getAllQuestions);
router.get("/type/:typeId", checkAccessToken, getAllQuestionsByTypeId);
router.get("/title/:titleId", checkAccessToken, getAllQuestionsByTitleId);

// POST
router.post("/create-question", createQuestion);

// PATCH
router.put("/update-question/:_id", checkAccessToken, updateQuestion);

// DELETE
router.delete("/delete-question/:_id", checkAccessToken, deleteQuestion);

export default router;
