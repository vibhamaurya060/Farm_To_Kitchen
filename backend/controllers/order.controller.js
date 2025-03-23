const orderModel = require("../models/order.model");


const createOrder = async (req, res) => {
    try {
        const { products, totalPrice, deliveryAddress, paymentMethod } = req.body;

        // Ensure all required fields are provided
        if (!products || !totalPrice || !deliveryAddress || !paymentMethod) {
            return res.status(400).json({ message: "All fields are required (products, totalPrice, deliveryAddress, paymentMethod)" });
        }

        const newOrder = await orderModel.create({
            consumer: req.user.id, // Ensure user is authenticated
            products,
            totalPrice,
            deliveryAddress,
            paymentMethod,
            status: "Pending",
            isPaid: false // Default value
        });

        res.status(201).json({ message: "Order placed successfully", order: newOrder });
    } catch (error) {
        res.status(500).json({ message: "Error creating order", error: error.message });
    }
};

const getUserOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ consumer: req.user.id }).populate("products.product");
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error: error.message });
    }
};

// Get all orders for farmers
// const getFarmerOrders = async (req, res) => {
//     try {
//         // Find all orders and populate products
//         const orders = await orderModel.find().populate("products.product");

//         // Filter orders where at least one product belongs to the farmer
//         const filteredOrders = orders.map(order => {
//             // Filter products belonging to the farmer
//             const farmerProducts = order.products.filter(
//                 item => item.product && item.product.farmer.toString() === req.user.id
//             );

//             // If this order has farmer's products, return a modified version of the order
//             if (farmerProducts.length > 0) {
//                 return { ...order.toObject(), products: farmerProducts };
//             }

//             return null; // Exclude orders with no farmer's products
//         }).filter(order => order !== null); // Remove null values

//         res.status(200).json(filteredOrders);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching orders", error: error.message });
//     }
// };


const updateOrderStatus = async (req, res) => {
    try {
        const updatedOrder = await orderModel.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );

        if (!updatedOrder) return res.status(404).json({ message: "Order not found" });

        res.status(200).json({ message: "Order status updated", order: updatedOrder });
    } catch (error) {
        res.status(500).json({ message: "Error updating order", error: error.message });
    }
};

module.exports = { createOrder, getUserOrders, updateOrderStatus };
