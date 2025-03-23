const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["farmer", "consumer"], required: true },
    farmLocation: { type: String }, // Only for farmers
    produceTypes: { type: [String] }, // Only for farmers
    contactInfo: { type: String }, // Farmer's contact info
    preferences: { type: [String] }, // Consumer preferences
    deliveryInfo: { type: String } // Consumer's address
}, { timestamps: true });

const userModel = mongoose.model("user", userSchema);
 

const blacklistSchema=new mongoose.Schema({
    token: {type: String, required: true, unique: true},
    expiresAt: {type: Date, required: true},
})

const blacklistModel=mongoose.model("blacklist", blacklistSchema);

module.exports = {userModel, blacklistModel};