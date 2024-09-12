import mongoose from "mongoose";

/* Type Structure
{
id: original uuid of type object
type: type name
typeLink: link portion that will be visible in browser url
...
}
*/

const TypeSchema = new mongoose.Schema({
  typeName: {
    type: String,
    required: true,
  },
  typeLink: {
    type: String,
    required: true,
  },
});

TypeSchema.index({ typeName: 1, typeLink: 1 }, { unique: true });

const TypeModel = mongoose.model("Type", TypeSchema);

export default TypeModel;
