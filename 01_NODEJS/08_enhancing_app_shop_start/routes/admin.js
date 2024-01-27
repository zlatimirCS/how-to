const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products");

router.get("/add-product", productsController.getAddProduct);

router.post("/product", productsController.postProduct);

module.exports = router;
