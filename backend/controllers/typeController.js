import mongoose from "mongoose";
import TypeModel from "../models/typeModel.js";

// GET REQUESTS
/* 
  Route: types/
  Params: 
  Body: 
  Request: GET
  Access: user
*/
export const getAllTypes = async (req, res) => {
  try {
    const list = await TypeModel.find(); // to find all the entries
    return res.status(200).json({ message: "Request successfull", list });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/* 
  Route: types/:_id
  Params: _id
  Body: 
  Request: GET
  Access: user
*/
export const getTypeById = async (req, res) => {
  try {
    const { _id } = req.params;
    if (!_id) {
      return res.status(400).json({ error: "Please provide type id" });
    }
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ error: "Invalid type id format" });
    }
    const type = await TypeModel.findById(_id);

    if (type) {
      return res.status(200).json({ message: "Request successful", type });
    } else {
      return res.status(404).json({ error: "Type not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// POST REQUESTS
/* 
  Route: types/create-type
  Params: 
  Body: 
  Request: POST
  Access: admin
*/
export const createType = async (req, res) => {
  try {
    const { typeLink, typeName } = req.body;
    if (!typeName || !typeLink) {
      return res
        .status(400)
        .json({ error: "Please provide type name and type link" });
    }
    const existingType = await TypeModel.findOne({ typeName });
    if (existingType) {
      return res
        .status(400)
        .json({ error: "Type with the same name already exists" });
    }
    const type = new TypeModel({ typeName, typeLink });
    await type.save();

    const list = await TypeModel.find();

    return res
      .status(201)
      .json({ message: "Created type successfully", list, type });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// PUT REQUESTS
/* 
  Route: types/update-type/:_id
  Params: _id
  Body: typeDetails
  Request: PUT
  Access: admin
*/
export const updateType = async (req, res) => {
  try {
    const { _id } = req.params;
    const { typeName, typeLink } = req.body;
    if (!_id || !typeName || !typeLink) {
      return res
        .status(400)
        .json({ error: "Please provide id and type details" });
    }

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ error: "Invalid id" });
    }
    const type = await TypeModel.findByIdAndUpdate(
      _id,
      { typeName, typeLink },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!type) {
      return res.status(404).json({ error: "Type not found" });
    }
    const list = await TypeModel.find();
    return res
      .status(200)
      .json({ message: "Updated type successfully", list, updatedType: type });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// DELETE REQUESTS

/* 
  Route: types/delete-type/:_id
  Params: _id
  Body: 
  Request: DELETE
  Access: admin
*/
export const deleteType = async (req, res) => {
  try {
    const { _id } = req.params;
    console.log(_id);
    if (!_id) {
      return res.status(400).json({ error: "Please provide id" });
    }

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const type = await TypeModel.findByIdAndDelete(_id);

    if (!type) {
      return res.status(400).json({ error: "Type not found!" });
    }
    const list = await TypeModel.find();
    return res
      .status(200)
      .json({ message: "Deleted type successfully", list, deletedType: type });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
