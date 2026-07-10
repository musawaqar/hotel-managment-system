const express = require("express");
const bookingRoutes = express.Router();

const bookingController = require("../controllers/booking.controller");

bookingRoutes.post("/createBooking", bookingController.createBooking);

bookingRoutes.get("/All", bookingController.getAllBookings);

bookingRoutes.get("/:id", bookingController.getBookingById);

bookingRoutes.put("/Update/:id", bookingController.updateBooking);

bookingRoutes.delete("/delete/:id", bookingController.deleteBooking);

module.exports = bookingRoutes;