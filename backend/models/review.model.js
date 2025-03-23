const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    consumer: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "product", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true }
}, { timestamps: true });

const reviewModel = mongoose.model("review", reviewSchema);
module.exports = reviewModel;
