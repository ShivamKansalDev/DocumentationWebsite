import mongoose from "mongoose";

/* Title Structure
{
id: original uuid of title object
typeId: id of type that this question comes under
title: title name
titleLink: link portion that will be visible in browser url
...
}
*/

const TitleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  titleLink: {
    type: String,
    required: true,
    unique: true,
  },
  typeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Type",
    required: true,
  },
});

TitleSchema.index({ title: 1, titleLink: 1 }, { unique: true });

const TitleModel = mongoose.model("Title", TitleSchema);

TitleModel.syncIndexes();

export default TitleModel;
