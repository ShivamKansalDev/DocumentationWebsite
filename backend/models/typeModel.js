const mongoose = require("mongoose");

/* Type Structure
{
id: original uuid of type object
type: type name
typeLink: link portion that will be visible in browser url
...
}
*/

const TypeSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true,
  },
  type: {
    type: String,
    unique: true,
    required: true,
  },
  typeLink: {
    type: String,
    unique: true,
    required: true,
  },
});

module.exports = mongoose.model("Type", TypeSchema);
