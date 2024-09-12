const mongoose = require("mongoose");
/* Question Structure
{
id: original uuid of question object
typeId: id of type that this question comes under
titleId: id of title that this question comes under
question: question
answer: answer
quesLink: link portion that will be visible in browser url
attachments: attachments array containing urls of images/videos/pdfs
...
}
*/

const QuestionSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  typeId: {
    type: String,
    required: true,
    unique: true,
  },
  titleId: {
    type: String,
    required: true,
    unique: true,
  },
  question: {
    type: String,
    required: true,
    unique: true,
  },
  answer: {
    type: String,
    unique: true,
    required: true,
  },
  quesLink: {
    type: String,
    required: true,
    unique: true,
  },
  attachments: {
    type: [String],
  },
});

module.exports = mongoose.model("Question", QuestionSchema);
