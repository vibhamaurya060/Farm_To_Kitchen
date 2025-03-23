const mongoose= require("mongoose");

const blacklistSchema=new mongoose.Schema({
    token: {type: String, required: true, unique: true},
    expiresAt: {type: Date, required: true},
})

const blacklistModel=mongoose.model("blacklist", blacklistSchema);

module.exports=blacklistModel;

