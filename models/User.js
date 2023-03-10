const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: {
      type: String,
      required: true,
      min: 4,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      min: 4,
      max: 20,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 20,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
