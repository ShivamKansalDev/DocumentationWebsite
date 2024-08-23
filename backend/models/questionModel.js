const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    unique: true,
    required: true,
  },
  answer: {
    type: String,
    unique: true,
    required: true,
  },
});

module.exports = mongoose.model('Question', QuestionSchema);
