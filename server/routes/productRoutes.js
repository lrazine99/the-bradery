const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");

router.route("/products").get(productsController.getAllProducts);

router.route("/product/:id").get(productsController.getProductById);

module.exports = router;
