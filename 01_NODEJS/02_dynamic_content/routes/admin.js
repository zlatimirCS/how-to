const express = require("express");
const router = express.Router();
const path = require("path");
const rootDir = require("../util/path");

const products = [];

router.get("/add-product", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "add-product.html"));
});

router.post("/product", (req, res, next) => {
  // console.log(req.body);
  products.push({ title: req.body.title });
  res.redirect("/");
});

exports.routes = router;
exports.products = products;
