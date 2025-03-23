const chatModel = require("../models/chat.model");


// Send a message
const sendMessage = async (req, res) => {
    try {
        const { receiver, message } = req.body;
        const newMessage = await chatModel.create({
            sender: req.user.id,
            receiver,
            message
        });
        res.status(201).json({ message: "Message sent", chat: newMessage });
    } catch (error) {
        res.status(500).json({ message: "Error sending message", error: error.message });
    }
};

// Get chat history between two users
const getChatHistory = async (req, res) => {
    try {
        const chats = await chatModel.find({
            $or: [
                { sender: req.user.id, receiver: req.params.receiverId },
                { sender: req.params.receiverId, receiver: req.user.id }
            ]
        }).sort({ createdAt: 1 });

        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json({ message: "Error fetching chat history", error: error.message });
    }
};

module.exports = {sendMessage, getChatHistory}