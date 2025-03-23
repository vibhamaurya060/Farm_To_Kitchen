const express = require("express");
const { sendMessage, getChatHistory } = require("../controllers/chat.controller");
const { authMiddleware } = require("../middleware/authMiddleware");

const chatRouter = express.Router();

chatRouter.post("/", authMiddleware, sendMessage);
chatRouter.get("/:recipientId", authMiddleware, getChatHistory);

module.exports = chatRouter;
