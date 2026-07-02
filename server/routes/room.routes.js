const express = require("express");
const router = express.Router();

const roomController = require("../controllers/rooms.controller");

// Create Room
router.post("/createRoom", roomController.createRoom);

// Get All Rooms
router.get("/rooms", roomController.getAllRooms);

// Get Single Room
router.get("/room/:id", roomController.getRoomById);

// Update Room
router.put("/update/:id", roomController.updateRoom);

// Delete Room
router.delete("/delete/:id", roomController.deleteRoom);

module.exports = router;