const express = require("express");
const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct, getProductByCategory } = require("../controllers/product.controller");
const { authMiddleware } = require("../middleware/authMiddleware");
const productRouter = express.Router();


productRouter.post("/add-product", authMiddleware, createProduct);
productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductById);
productRouter.get('/category', getProductByCategory)
productRouter.put("/:id", authMiddleware, updateProduct);
productRouter.delete("/:id", authMiddleware, deleteProduct);


module.exports = productRouter;

