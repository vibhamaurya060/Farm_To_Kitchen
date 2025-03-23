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


app.listen(PORT, async() => {
    try {
        await connectDB;
        console.log("MongoDB Connected.");
    } catch (error) {
        console.log("Error while connecting MongoDB.", error);
    }
    console.log(`Server running on port http://localhost:${PORT}`)
})
  