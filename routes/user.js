const express = require("express");
const userController = require("../controllers/userController.js");
const { checkAuth } = require("../middleware/checkAuth.js");
const router = express.Router();

//Signup (register user) route
router.post("/signUp", userController.signUp);
//Login route
router.post("/login", userController.login);
//Logout route
router.get("/logout", checkAuth, userController.logout);

module.exports = router;
