const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: {
      type: String,
      required: true,
      min: 4,
      max: 20,
    },
    description: {
      type: String,
      required: true,
      min: 4,
      max: 20,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId, //reference to the User schema: Each task will have a user assigned
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

const TaskEntry = mongoose.model("TaskEntry", TaskSchema);
module.exports = TaskEntry;
