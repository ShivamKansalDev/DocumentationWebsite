import mongoose from "mongoose";
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
  typeId: {
    type: String,
    required: true,
  },
  titleId: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  quesLink: {
    type: String,
    required: true,
  },
  attachments: {
    type: [String],
  },
});

QuestionSchema.index({ question: 1, quesLink: 1 }, { unique: true });

const QuestionModel = mongoose.model("Question", QuestionSchema);
QuestionModel.syncIndexes();

export default QuestionModel;
