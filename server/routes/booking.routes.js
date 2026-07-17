const express = require("express");
const bookingRoutes = express.Router();

const bookingController = require("../controllers/booking.controller");

const verifyToken = require("../middleware/verifyToken");

bookingRoutes.post("/createBooking", bookingController.createBooking);

bookingRoutes.get("/all", bookingController.getAllBookings);

bookingRoutes.get("/myBookings", verifyToken, bookingController.getBookingsByEmail);

bookingRoutes.get("/:id", bookingController.getBookingById);

bookingRoutes.put("/update/:id", bookingController.updateBooking);

bookingRoutes.delete("/delete/:id", bookingController.deleteBooking);

module.exports = bookingRoutes;