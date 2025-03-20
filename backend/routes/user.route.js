const express = require("express");
const { registerUser, loginUser, logoutUser, getUsers } = require("../controllers/user.controller");
const { authMiddleware } = require("../middleware/authMiddleware");


const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post('/logout', authMiddleware, logoutUser);
userRouter.get('/', getUsers);

module.exports = userRouter;
