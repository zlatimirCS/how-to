const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin");

router.get("/add-product", adminController.getAddProduct);

router.post("/product", adminController.postProduct);

router.get("/products", adminController.getProducts);

module.exports = router;
