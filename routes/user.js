const express = require("express");
const userController = require("../controllers/userController.js");
const { checkAuth } = require("../middleware/checkAuth.js");
const router = express.Router();

router.post("/signUp", userController.signUp);
router.post("/login", userController.login);
router.get("/logout", checkAuth, userController.logout);

module.exports = router;
