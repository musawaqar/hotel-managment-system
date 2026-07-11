

const bookingService = require("../services/booking.service");

// Create Booking
const createBooking = async (req, res) => {
    try {
        const booking = await bookingService.createBooking(req.body);

        res.status(201).json({
            message: "Your booking has been made.",
            booking,
        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
};

// Get All Bookings
const getAllBookings = async (req, res) => {
    try {
        const bookings = await bookingService.getAllBookings();

        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};


// Get Booking By ID
const getBookingById = async (req, res) => {
    try {
        const booking = await bookingService.getBookingById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                error: "Booking not found.",
            });
        }

        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};

// Get Booking By ID
const getBookingsByEmail = async (req, res) => {
    try {
        const booking = await bookingService.getBookingsByEmail(req.email);

        if (!booking) {
            return res.status(404).json({
                error: "Booking not found.",
            });
        }

        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};
// Update Booking
const updateBooking = async (req, res) => {
    try {
        const booking = await bookingService.updateBooking(
            req.params.id,
            req.body
        );

        if (!booking) {
            return res.status(404).json({
                error: "Booking not found.",
            });
        }

        res.status(200).json({
            message: "Booking updated successfully.",
            booking,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};

// Delete Booking
const deleteBooking = async (req, res) => {
    try {
        const booking = await bookingService.deleteBooking(req.params.id);

        if (!booking) {
            return res.status(404).json({
                error: "Booking not found.",
            });
        }

        res.status(200).json({
            message: "Booking deleted successfully.",
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};

module.exports = {
    createBooking,
    getAllBookings,
    getBookingById,
    getBookingsByEmail,
    updateBooking,
    deleteBooking,
};