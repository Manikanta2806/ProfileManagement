const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    photograpgh:{type:String},
    name:{type:String},
    description:{type:String}
});

module.exports=mongoose.model("profile",profileSchema);