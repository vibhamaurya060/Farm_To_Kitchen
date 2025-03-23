const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    farmer: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1 },
    category: { type: String, required: true },
    images: { type: [String], default: [] }, // Array of image URLs
    isAvailable: { type: Boolean, default: true }
}, { timestamps: true });

const productModel = mongoose.model("product", productSchema);
module.exports = productModel; 
