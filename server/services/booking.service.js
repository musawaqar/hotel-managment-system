const Booking = require("../models/booking");
const Room = require("../models/room");

class BookingService {
    // Create Booking
    async createBooking(bookingData) {
        const booking = new Booking(bookingData);
        const room = await Room.findByIdAndUpdate(bookingData.room, {roomIsAvailable:false});
        return await booking.save();
    }

    // Get All Bookings
    async getAllBookings() {
        return await Booking.find().populate("room");
    }

    // Get Booking By ID
    async getBookingById(id) {
        return await Booking.findById(id).populate("room");
    }

    // Get Booking By ID
    async getBookingsByEmail(email) {
        return await Booking.find({customerEmail:email}).populate("room");
    }

    // Update Booking
    async updateBooking(id, bookingData) {
        return await Booking.findByIdAndUpdate(id, bookingData, {
            new: true,
        }).populate("room");
    }

    // Delete Booking
    async deleteBooking(id) {
        return await Booking.findByIdAndDelete(id);
    }
}

module.exports = new BookingService();