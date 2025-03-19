const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3000;

app.get('/', (req, res)=>{
    res.send("API is working.")
})

app.listen(PORT, async() => {
    try {
        await connectDB;
        console.log("MongoDB Connected.");
    } catch (error) {
        console.log("Error while connecting MongoDB.", error);
    }
    console.log(`Server running on port http://localhost:${PORT}`)
})
