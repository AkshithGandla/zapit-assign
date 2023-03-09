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
exports.get_all_tasks = (req, res, next) => {
  TaskEntry.find()
    .select("name description assignee createdAt completed")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        tasks: docs.map((doc) => {
          return {
            name: doc.name,
            description: doc.description,
            assignee: doc.assignee,
            createdAt: doc.createdAt,
            completed: doc.completed,
            request: "GET",
            URL: "baseURL/tasks/" + doc._id,
          };
        }),
      };

      res.status(200).send(response);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err.message);
    });
};

exports.get_task = (req, res, next) => {
  const id = req.params.taskId;
  TaskEntry.findById(id)
    .select("name description assignee createdAt completed")
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json({
          name: doc.name,
          description: doc.description,
          assignee: doc.assignee,
          createdAt: doc.createdAt,
          completed: doc.completed,
          request: "GET",
        });
      } else {
        console.log("No valid entry");
        res.status(404).json({ error: "No entry found" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ errorMessage: "No entry found" });
    });
};

exports.update_task = (req, res, next) => {
  const id = req.params.taskId;
  const updateOps = {};

  for (const ops in req.body) {
    updateOps[ops.propName] = ops.value;
  }

  TaskEntry.updateMany({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Task updated successfully",
        request: {
          type: "GET",
          url: "baseURL/tasks/" + id,
        },
      });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};
exports.delete_task = (req, res, next) => {
  const id = req.params.taskId;
  TaskEntry.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({ message: "Task deleted successfully" });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: error.message });
    });
};