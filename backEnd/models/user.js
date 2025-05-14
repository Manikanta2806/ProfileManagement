const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    Username:{type:String},
    email:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,enum:["user","admin"]},
});

module.exports= mongoose.model("user",userSchema);