const Type = require("../models/typeModel");

// functions related to titles
const TitleController = {
  // GET REQUESTS --------------->

  /*
  Params:  link,
  Body: empty,
  Return Format: [titlesByType]
  */
  getAllTitlesByType: async (req, res) => {
    try {
      const link = req.params.link;
      if (!link) res.status(400).json({ error: "Please provide type" });

      const item = await Type.findOne({ link }); // find object with that has link as given in params
      if (!item) res.status(400).json({ error: "Type not found in database" });

      const allTitles = item.titles; // return all titles found in that item
      res.status(200).json(allTitles);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // POST REQUESTS --------------->
  createTitle: async (req, res) => {
    try {
      const type_link = req.params.type_link;
      const titleBody = req.params.body;
      if (!type_link) res.status(400).json({ error: "Please provide type" });
      const resultType = Type.findOne({ link: type_link });
      if (!resultType) res.status(400).json({ error: "Type is invalid" });
      const resultTitle = resultType.titles;
      res.status(201).json(resultTitle);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  // PATCH REQUESTS --------------->

  // DELETE REQUESTS --------------->
};

module.exports = TitleController;
