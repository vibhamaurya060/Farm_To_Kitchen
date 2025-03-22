const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const userRouter = require("./routes/user.route");
const productRouter = require("./routes/product.route");
const orderRouter = require("./routes/order.route");
const reviewRouter = require("./routes/review.route");
const chatRouter = require("./routes/chat.route");
const stripe = require("stripe")(process.env.PAY_SECRET);

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3000;

app.get('/', (req, res)=>{
    res.send("API is working.")
})

// user route
app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/orders', orderRouter);
app.use('/reviews', reviewRouter);
app.use('/chats', chatRouter)

app.post("/checkout", async (req, res) => {
    try {
        const { cart } = req.body;

        if (!cart || cart.length === 0) {
            return res.status(400).json({ error: "Cart is empty" });
        }

        console.log("Processing checkout for cart:", cart);

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: cart.map((item) => ({
                price_data: {
                    currency: "usd",
                    product_data: { name: item.name },
                    unit_amount: Math.round(item.price * 100),
                },
                quantity: item.quantity,
            })),
            mode: "payment",
            success_url: "http://localhost:8080/success",
            cancel_url: "http://localhost:8080/cart",
        });

        console.log("Stripe session created:", session);
        res.json({ sessionUrl: session.url });
    } catch (error) {
        console.error("Checkout error:", error);
        res.status(500).json({ error: error.message });
    }
});


app.listen(PORT, async() => {
    try {
        await connectDB;
        console.log("MongoDB Connected.");
    } catch (error) {
        console.log("Error while connecting MongoDB.", error);
    }
    console.log(`Server running on port http://localhost:${PORT}`)
})
  