const path = require("path");

const express = require("express");

const productsController = require("../controllers/p03shop");

const router = express.Router();

router.get("/", productsController.getIndex);

router.get("/product-list", productsController.getProducts);

router.get("/product-list/:productId", productsController.getProduct);

// router.get("/cart", productsController.getCart);
// router.post("/cart", productsController.postCart);
// router.post("/cart-delete-item", productsController.postCartDeleteItem);

// router.get("/orders", productsController.getOrders);

module.exports = router;
