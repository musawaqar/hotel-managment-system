const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema({
    room:{
        type: mongoose.Schema.Types.ObjectId,  
        ref: "Room",
        required: true
    },
    customerName:{
        type: String,
        required: true
    },
    customerEmail:{
        type: String,
        required: true
    },
    customerPhone:{
        type: String,
        required: true
    },
    checkInDate:{
        type: Date,
        required: true
    },
    checkOutDate:{
        type: Date,
        required: true
    },
    status:{
        type: String,
        enum: ["Booked","CheckedIn","CheckedOut","Cancelled"],
        default: "Booked"
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Booking", bookingSchema)