const Booking = require("../models/booking");

class BookingService {
    // Create Booking
    async createBooking(bookingData) {
        const booking = new Booking(bookingData);
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