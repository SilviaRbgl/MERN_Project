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
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    required: false,
  },
  // favourites: {
  //   type: Array,
  //   required: false,
  // },
  favourites: [{ type: Schema.Types.ObjectId, ref: "expedition" }],
});

const userModel = mongoose.model("user", userSchema);

export default userModel;
