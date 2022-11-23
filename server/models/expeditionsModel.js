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
  beginDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  date: {
    beginDate: {
        type: Date,
    },
    endDate: {
        type: Date,
      },
  }
});

const expeditionModel = mongoose.model('expedition', expeditionSchema);

export default expeditionModel;