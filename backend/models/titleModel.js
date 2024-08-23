const mongoose = require("mongoose");

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
});

module.exports = mongoose.model("Title", TitleSchema);
