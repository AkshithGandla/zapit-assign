const express = require("express");
const taskController = require("../controllers/taskController.js");
const { checkAuth } = require("../middleware/checkAuth.js");
const router = express.Router();
const cache = require("../routeCache.js");

router.post("/", checkAuth, cache(300), taskController.create_task);
router.get("/", checkAuth, cache(300), taskController.get_all_tasks);
router.get("/:taskId", checkAuth, cache(300), taskController.get_task);
router.patch("/:taskId", checkAuth, cache(300), taskController.update_task);
router.delete("/:taskId", checkAuth, cache(300), taskController.delete_task);

module.exports = router;
