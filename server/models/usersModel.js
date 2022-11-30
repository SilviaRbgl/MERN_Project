import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  userName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true, 
  },
  role: {
    traveller: {
      type: Boolean,
      required: false,
      unique: true,
    },
    leader: {
      type: Boolean,
      required: false,
      unique: true,
    },
  }
});

const userModel = mongoose.model("user", userSchema);

export default userModel;