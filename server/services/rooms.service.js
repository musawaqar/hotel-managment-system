const Room = require("../Models/room");

// Create Room
const createRoom = async (roomData) => {
    const room = new Room(roomData);
    return await room.save();
};

// Get All Rooms
const getAllRooms = async () => {
    return await Room.find();
};

// Get Single Room
const getRoomById = async (id) => {
    return await Room.findById(id);
};

// Update Room
const updateRoom = async (id, roomData) => {
    return await Room.findByIdAndUpdate(id, roomData, {
        new: true,
    });
};

// Delete Room
const deleteRoom = async (id) => {
    return await Room.findByIdAndDelete(id);
};

module.exports = {
    createRoom,
    getAllRooms,
    getRoomById,
    updateRoom,
    deleteRoom,
};