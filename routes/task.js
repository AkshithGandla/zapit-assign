const express = require("express");
const taskController = require("../controllers/taskController.js");
const { checkAuth } = require("../middleware/checkAuth.js");
const router = express.Router();
const cache = require("../routeCache.js");

//Create task route
router.post("/", checkAuth, cache(300), taskController.create_task);
//Get all tasks route
router.get("/", checkAuth, cache(300), taskController.get_all_tasks);
//Get specific task route
router.get("/:taskId", checkAuth, cache(300), taskController.get_task);
//Update sepcific task route
router.patch("/:taskId", checkAuth, cache(300), taskController.update_task);
//Detete a task route
router.delete("/:taskId", checkAuth, cache(300), taskController.delete_task);

module.exports = router;
