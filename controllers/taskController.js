const mongoose = require("mongoose");
const TaskEntry = require("../models/TaskEntry.js");

exports.create_task = (req, res, next) => {
  const task = new TaskEntry({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    description: req.body.description,
    assignee: req.body.assignee,
    completed: req.body.completed,
  });
  task
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "product created succesfully",
        createdTask: {
          _id: result._id,
          name: result.name,
          description: result.description,
        },
      });
    })
    .catch((err) => console.error("error: " + err));
};
