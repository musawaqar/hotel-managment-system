const mongoose = require("mongoose")
const roomSchema = new mongoose.Schema({
    roomNumber:{
        type : Number,
        required : true,
        unique : true
    },
    roomType:{
     type : String,
     required : true,
     enum: ["Single", "Double", "Suite"] 
    },
    roomPrice:{
        type : Number,
        required: true,
        min : 0
    },
    roomIsAvailable:{
        type:Boolean,
        default:true,
    }
})
module.exports = mongoose.model("Room", roomSchema);