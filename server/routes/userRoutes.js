const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

router.route("/user/signup").post(usersController.userSignup);

router.route("/user/login").post(usersController.userLogin);

module.exports = router;
