const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema({
    room:{
        type: mongoose.Schema.Types.ObjectId,  
        ref: "Room",
        required: true
    },
    CustomerName:{
        type: String,
        required: true
    },
    CustomerEmail:{
        type: String,
        required: true
    },
    CustomerPhone:{
        type: String,
        required: true
    },
    CheckInDate:{
        type: Date,
        required: true
    },
    CheckOutDate:{
        type: Date,
        required: true
    },
    status:{
        type: String,
        enum: ["Booked","CheckedIn","CheckedOut","Cancelled"],
        default: "Booked"
    },
    CreatedAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Booking", bookingSchema)