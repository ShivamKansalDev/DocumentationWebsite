const Type = require("../models/typeModel");

const QuestionController = {
  // GET REQUESTS
  getAllQuestionsByTitle: async (req, res) => {
    try {
      const { type, title } = req.params;
      if (!type || !title) {
        res
          .status(400)
          .json({ error: "Please provide all fields ( Type and Title )" });
      }

      const resultType = await Type.findOne({ type });
      if (!resultType) {
        res.status(400).json({ error: `No type "${type}" found in database` });
      } else {
        const resultTitle = resultType.titles.find(
          (item) => item.title === title
        );
        if (!resultTitle) {
          res
            .status(400)
            .json({ error: `No title "${title}" found in database` });
        } else {
          const allQuestions = resultTitle.questions;
          res.status(200).json(allQuestions);
        }
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // POST REQUESTS

  // PATCH REQUESTS

  // DELETE REQUESTS
};

module.exports = QuestionController;
