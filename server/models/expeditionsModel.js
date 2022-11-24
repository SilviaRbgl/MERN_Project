import mongoose from "mongoose";

const { Schema } = mongoose;

const expeditionSchema = new Schema({
  island: {
    type: String,
    required: true,
    unique: true,
  },
  country: {
    type: String,
    required: true,
    unique: false,
  },
  date: {
    beginDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  leader: {
    type: String,
  },
});

const expeditionModel = mongoose.model("expedition", expeditionSchema);

export default expeditionModel;
