const express = require("express");
const taskController = require("../controllers/taskController.js");
const router = express.Router();

router.post("/", taskController.create_task);
router.get("/", taskController.get_all_tasks);
router.get("/:taskId", taskController.get_task);
router.patch("/:taskId", taskController.update_task);
router.delete("/:taskId", taskController.delete_task);

module.exports = router;
