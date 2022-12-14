import mongoose from "mongoose";

const { Schema } = mongoose;

const commentSchema = new Schema({
  author: {
    type: String,
    required: false,
    unique: false,
    sparse: true,
  },
  // date: {
  //   type: Date,
  //   required: true,
  // },
  text: {
    type: String,
    required: true,
  },
  expedition: { type: String, required: true },
});

const commentModel = mongoose.model("comment", commentSchema);

export default commentModel;
