const jwt=require("jsonwebtoken");
const { blacklistModel } = require("../models/user.model");


const authMiddleware= async(req, res, next)=>{
    const token=req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json({message: "Not authorized"});
    }

    const isBlacklisted=await blacklistModel.findOne({token});
    if(isBlacklisted){
        return res.status(403).json({message: "Token has boon invalidated. Please login again."})
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
        if(err){
            return res.status(403).json({message: "Invalid token"});
        }
        req.user=decoded;
        console.log(req.user)
        next();
    });
};


const roleMiddleware=(role)=>(req, res, next)=>{
    
    if(!req.user || req.user.role !== role){
        return res.status(403).json({message: "Admin access required"});
    }
    next();
}

module.exports= {authMiddleware, roleMiddleware};
