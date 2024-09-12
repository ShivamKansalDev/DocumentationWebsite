import mongoose from "mongoose";
import TitleModel from "../models/titleModel.js";

// functions related to titles

// GET REQUESTS --------------->

/* 
  Route: titles/
  Params: 
  Body: 
  Request: GET
  Access: admin
*/
export const getAllTitles = async (req, res) => {
  try {
    const { typeId } = req.query;
    const query = {};
    if (typeId) {
      if (mongoose.Types.ObjectId.isValid(typeId)) query.typeId = typeId;
    }
    const list = await TitleModel.find(query);
    return res.status(200).json({ message: "Request successful", list });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

/* 
  Route: titles/:typeId
  Params: typeId
  Body: 
  Request: Get
  Access: user
*/
export const getTitlesByTypeId = async (req, res) => {
  try {
    const { typeId } = req.params;
    if (!typeId)
      return res.status(400).json({ error: "Please provide type id" });
    if (!mongoose.Types.ObjectId.isValid(typeId)) {
      return res.status(400).json({ error: "Invalid typeId" });
    }
    const titles = await TitleModel.find({ typeId });
    return res.status(200).json({ message: "Request successful", titles });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/* 
  Route: titles/title/:_id
  Params: _id
  Body: 
  Request: Get
  Access: user
*/
export const getTitleById = async (req, res) => {
  try {
    const { _id } = req.params;
    if (!_id) return res.status(400).json({ error: "Please provide type" });
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ error: "Invalid title id" });
    }
    const title = await TitleModel.findById(_id);
    if (!title)
      return res.status(404).json({ error: "Title not found in database" });
    return res.status(200).json({ message: "Request successfull", title });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// POST REQUESTS --------------->
/* 
  Route: titles/create-title
  Params: 
  Body: 
  Request: POST
  Access: user
*/
export const createTitle = async (req, res) => {
  try {
    const { title, titleLink, typeId } = req.body;
    if (!title || !titleLink || !typeId) {
      return res.status(400).json({ error: "Please provide all details" });
    }
    if (!mongoose.Types.ObjectId.isValid(typeId)) {
      return res.status(400).json({ error: "Invalid Type id" });
    }

    const newTitle = new TitleModel({ title, titleLink, typeId });
    await newTitle.save();
    const list = await TitleModel.find();

    return res
      .status(202)
      .json({ message: "Request Successful", list, newTitle });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// PATCH REQUESTS --------------->
/* 
  Route: titles/update-title/:_id
  Params: _id
  Body: updateDetails
  Request: Get
  Access: user
*/
export const updateTitle = async (req, res) => {
  try {
    const { _id } = req.params;
    const updateDetails = req.body;
    if (!_id || !updateDetails)
      return res
        .status(400)
        .json({ error: "Please provide title id and data" });

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ error: "Invalid title id format" });
    }

    const updatedTitle = await TitleModel.findByIdAndUpdate(
      _id,
      updateDetails,
      {
        new: true,
        runValidators: true,
      }
    );
    const list = await TitleModel.find();
    return res
      .status(200)
      .json({ message: "Request successful", list, updatedTitle });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// DELETE REQUESTS --------------->

/* 
  Route: titles/delete-title/:_id
  Params: _id
  Body: 
  Request: Get
  Access: user
*/
export const deleteTitle = async (req, res) => {
  try {
    const { _id } = req.params;
    if (!_id) {
      return res.status(400).json({ error: "Please provide title id" });
    }

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ error: "Invalid title id format" });
    }

    const title = await TitleModel.findByIdAndDelete(_id);
    if (!title) {
      return res.status(404).json({ error: "Title not found in database" });
    }
    const list = await TitleModel.find();
    return res
      .status(200)
      .json({
        message: "Title deleted successfully",
        list,
        deletedTitle: title,
      });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
