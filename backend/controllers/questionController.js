import mongoose from "mongoose";
import QuestionModel from "../models/questionModel.js";

// GET REQUESTS
/* 
  Route: questions/
  Params: 
  Body: 
  Request: GET
  Access: admin
*/
export const getAllQuestions = async (req, res) => {
  try {
    const { typeId, titleId } = req.query;
    const query = {};
    if (typeId) {
      query.typeId = typeId;
    }
    if (titleId) {
      query.titleId = titleId;
    }
    const list = await QuestionModel.find(query);
    return res.status(200).json({ message: "Request Successful", list });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

/* 
  Route: questions/type/:typeId
  Params: 
  Body: 
  Request: GET
  Access: admin
*/
export const getAllQuestionsByTypeId = async (req, res) => {
  try {
    const { typeId } = req.params;
    if (!typeId) {
      return res.status(400).json({ error: "Please provide typeId" });
    }
    if (!mongoose.Types.ObjectId.isValid(typeId)) {
      return res.status(400).json({ error: "Invalid Type id" });
    }
    const list = await QuestionModel.find({ typeId });
    return res.status(200).json({ message: "Request Successful", list });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

/* 
  Route: questions/title/:titleId
  Params: 
  Body: 
  Request: GET
  Access: admin
*/
export const getAllQuestionsByTitleId = async (req, res) => {
  try {
    const { titleId } = req.params;
    if (!titleId) {
      return res.status(400).json({ error: "Please provide Title id" });
    }
    if (!mongoose.Types.ObjectId.isValid(titleId)) {
      return res.status(400).json({ error: "Invalid Title id" });
    }

    const list = await QuestionModel.find({ titleId });
    return res.status(200).json({ message: "Request Successful", list });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// POST REQUESTS
/* 
  Route: questions/create-question
  Params: 
  Body: questionDetails
  Request: POST
  Access: admin


  typeId: "",
  titleId: "",
  question: "",
  answer: "",
  quesLink: "",
  attachments: [],
*/
export const createQuestion = async (req, res) => {
  try {
    const { typeId, titleId, question, answer, quesLink, attachments } =
      req.body;
    if (
      !typeId ||
      !titleId ||
      !question ||
      !answer ||
      !quesLink ||
      !attachments
    ) {
      return res
        .status(400)
        .json({ error: "Please provide all question details" });
    }
    if (
      !mongoose.Types.ObjectId.isValid(typeId) ||
      !mongoose.Types.ObjectId.isValid(titleId)
    ) {
      return res.status(400).json({ error: "Invalid Title Id or Type Id" });
    }
    const questionDetails = {
      typeId,
      titleId,
      question,
      answer,
      quesLink,
      attachments,
    };
    const newQuestion = new QuestionModel(questionDetails);
    await newQuestion.save();
    const list = await QuestionModel.find();
    return res
      .status(201)
      .json({ message: "Request Successful", list, newQuestion });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// PATCH REQUESTS
/* 
  Route: questions/update-question/:_id
  Params: _id
  Body: questionDetails
  Request: PUT
  Access: admin

  typeId: "",
  titleId: "",
  question: "",
  answer: "",
  quesLink: "",
  attachments: [],
*/
export const updateQuestion = async (req, res) => {
  try {
    const { _id } = req.params;
    const questionDetails = req.body;
    if (!_id) {
      return res.status(400).json({ error: "Pleave provide question id" });
    }
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ error: "Invalid question Id" });
    }
    if (
      !mongoose.Types.ObjectId.isValid(questionDetails?.typeId) ||
      !mongoose.Types.ObjectId.isValid(questionDetails?.titleId)
    ) {
      return res.status(400).json({ error: "Invalid Title Id or Type Id" });
    }
    const updatedQuestion = await QuestionModel.findByIdAndUpdate(
      _id,
      questionDetails,
      {
        new: true,
        runValidators: true,
      }
    );
    const list = await QuestionModel.find();
    return res
      .status(200)
      .json({ message: "Request Successful", list, updatedQuestion });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// DELETE REQUESTS
/* 
  Route: questions/delete-question/:_id
  Params: _id
  Body: 
  Request: DELETE
  Access: admin

  typeId: "",
  titleId: "",
  question: "",
  answer: "",
  quesLink: "",
  attachments: [],
*/
export const deleteQuestion = async (req, res) => {
  try {
    const { _id } = req.params;
    if (!_id) {
      return res.status(400).json({ error: "Pleave provide question id" });
    }
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ error: "Invalid question Id" });
    }
    const deletedQuestion = await QuestionModel.findByIdAndDelete(_id);
    if (!deletedQuestion) {
      return res.status(404).json({ error: "Question not found" });
    }
    const list = await QuestionModel.find();
    return res
      .status(200)
      .json({ message: "Request Successful", list, deletedQuestion });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
