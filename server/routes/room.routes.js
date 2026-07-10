const express = require("express");
const roomRoutes = express.Router();

const roomController = require("../controllers/rooms.controller");

// Create Room
roomRoutes.post("/createRoom", roomController.createRoom);

// Get All Rooms
roomRoutes.get("/rooms", roomController.getAllRooms);

// Get Single Room
roomRoutes.get("/room/:id", roomController.getRoomById);

// Update Room
roomRoutes.put("/update/:id", roomController.updateRoom);

// Delete Room
roomRoutes.delete("/delete/:id", roomController.deleteRoom);

module.exports = roomRoutes;