const Type = require("../models/typeModel");

const TypeController = {
  // GET REQUESTS
  getAllTypes: async (req, res) => {
    try {
      const types = await Type.find(); // to find all the entries
      res.status(200).json(types);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // POST REQUESTS
  createType: async (req, res) => {
    try {
      const type = new Type(req.body);
      await type.save();
      res.status(201).json(type);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // PATCH REQUESTS

  // DELETE REQUESTS
};

module.exports = TypeController;
