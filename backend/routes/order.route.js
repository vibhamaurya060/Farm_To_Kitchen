const express = require("express");
const { createOrder, getUserOrders, updateOrderStatus } = require("../controllers/order.controller");
const { authMiddleware } = require("../middleware/authMiddleware");
const orderRouter = express.Router();

orderRouter.post("/add-order", authMiddleware, createOrder);
orderRouter.get("/user", authMiddleware, getUserOrders);
// orderRouter.get("/farmer", authMiddleware, getFarmerOrders);
orderRouter.put("/:id", authMiddleware, updateOrderStatus);

module.exports = orderRouter;
