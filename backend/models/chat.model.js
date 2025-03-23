const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false }
}, { timestamps: true });

const chatModel = mongoose.model("chat", chatSchema);
module.exports = chatModel;
