import mongoose from "mongoose";

const { Schema } = mongoose;

const leaderSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  languages: {
    type: String,
    required: true,
  }
});

const leaderModel = mongoose.model("leader", leaderSchema);

export default leaderModel;
