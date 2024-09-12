const express = require("express");
const router = express.Router();

const TypeController = require("../controllers/typeController");
const TitleController = require("../controllers/titleController");
const QuestionController = require("../controllers/questionController");

// ***** admin only *****
// ***** user routes *****

// <-------------------- types -------------------->

// GET REQUESTS
router.get("/get-all-types", TypeController.getAllTypes);

// POST REQUESTS
router.post("/create-type", TypeController.createType);

// PATCH REQUESTS

// DELETE REQUESTS

// <-------------------- titles ------------------->

// GET REQUESTS
router.get("/:link/all-titles", TitleController.getAllTitlesByType);

// POST REQUESTS
router.post("/:link/create-title", TitleController.createTitle);

// PATCH REQUESTS

// DELETE REQUESTS

// <-------------------- questions -------------------->

// GET REQUESTS
router.get("/:type/:titles", QuestionController.getAllQuestionsByTitle);

// POST REQUESTS

// PATCH REQUESTS

// DELETE REQUESTS

module.exports = router;
