const express = require("express");
const taskController = require("../controllers/taskController.js");
const router = express.Router();

router.post("/", taskController.create_task);

module.exports = router;
