const express = require("express");
const { addReview, getProductReviews } = require("../controllers/review.controller");
const { authMiddleware } = require("../middleware/authMiddleware");
const reviewRouter = express.Router();

reviewRouter.post("/", authMiddleware, addReview);
reviewRouter.get("/:productId", getProductReviews);

module.exports = reviewRouter;
