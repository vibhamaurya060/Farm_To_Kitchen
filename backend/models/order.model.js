const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    consumer: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: "product", required: true },
            quantity: { type: Number, required: true, min: 1 }
        }
    ],
    totalPrice: { type: Number, required: true },
    status: { 
        type: String, 
        enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"], 
        default: "Pending" 
    },
    deliveryAddress: { type: String, required: true },
    paymentMethod: { type: String, enum: ["Card", "Cash on Delivery"], required: true },
    isPaid: { type: Boolean, default: false }
}, { timestamps: true });

const orderModel = mongoose.model("order", orderSchema);
module.exports = orderModel;
