const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewares/isAuthenticated");
const ordersController = require("../controllers/ordersController");

router.route("/pay").post(isAuthenticated, ordersController.newOrder);

module.exports = router;
