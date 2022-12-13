import mongoose from "mongoose";

const { Schema } = mongoose;

const commentSchema = new Schema({
  author: [{ type: Schema.Types.ObjectId, ref: "user" }],
  // expedition: [{ type: Schema.Types.ObjectId, ref: "expedition" }],
  date: {
    type: Date,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

const commentModel = mongoose.model("comment", commentSchema);

export default commentModel;
