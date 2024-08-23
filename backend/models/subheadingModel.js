const mongoose = require('mongoose');
const Question = require('./questionModel'); 

const SubheadingSchema = new mongoose.Schema({
  topic: {
    type: String,
    unique: true,
    required: true,
  },
  subLink: {
    type: String,
    unique: true,
    required: true,
  },
  questions: [Question.schema],
});

module.exports = mongoose.model('Subheading', SubheadingSchema);
