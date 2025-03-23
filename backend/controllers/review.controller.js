const reviewModel = require("../models/review.model");


// Add a review
const addReview = async (req, res) => {
    try {
        const { product, rating, comment } = req.body;
        const newReview = await reviewModel.create({
            consumer: req.user.id,
            product,
            rating,
            comment
        });
        res.status(201).json({ message: "Review added successfully", review: newReview });
    } catch (error) {
        res.status(500).json({ message: "Error adding review", error: error.message });
    }
};

// Get reviews for a product
const getProductReviews = async (req, res) => {
    try {
        const reviews = await reviewModel.find({ product: req.params.productId }).populate("consumer", "name");
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Error fetching reviews", error: error.message });
    }
};

module.exports = {addReview, getProductReviews};