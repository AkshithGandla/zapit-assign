const express = require("express");
const taskController = require("../controllers/taskController.js");
const { checkAuth } = require("../middleware/checkAuth.js");
const router = express.Router();

router.post("/", checkAuth, taskController.create_task);
router.get("/", checkAuth, taskController.get_all_tasks);
router.get("/:taskId", checkAuth, taskController.get_task);
router.patch("/:taskId", checkAuth, taskController.update_task);
router.delete("/:taskId", checkAuth, taskController.delete_task);

module.exports = router;
