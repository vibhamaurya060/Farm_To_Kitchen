const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");



const registerUser = async (req, res) => {
    try {
        const { name, email, password, role, farmLocation, produceTypes, contactInfo, preferences, deliveryInfo } = req.body;

        const existingUser = await userModel.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Email already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userModel.create({ name, email, password: hashedPassword, role, farmLocation, produceTypes, contactInfo, preferences, deliveryInfo });
        res.status(201).json({ message: "User registered successfully" , user});
 
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.status(201).json({message:"user logged in successfully. ",  token, user });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const logoutUser= async(req, res)=>{
    const token=req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(400).json({message: "Token is required for logout."});
    }

    const decoded=jwt.decode(token);
    if(!decoded || !decoded.exp){
        return res.status(400).json({message: "Invalid token."});
    }

    const expiresAt=new Date(decoded.exp * 1000);
    await userModel.blacklistModel.create({token, expiresAt});
    res.status(200).json({message: "Logout successful. Token has been invalidated."});
}

const getUsers=async(req, res)=>{
    try {
        const users=await userModel.find();
        res.status(200).json({users: users})
    } catch (error) {
        res.status(500).json({message: "Server error"})
    }
}

module.exports = {registerUser, loginUser, logoutUser, getUsers}

