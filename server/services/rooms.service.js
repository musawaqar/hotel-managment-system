const Room = require("../models/room");

class RoomService {
    // Create Room
    async createRoom(roomData) {
        const room = new Room(roomData);
        return await room.save();
    }

    // Get All Rooms
    async getAllRooms() {
        return await Room.find();
    }

    // Get Room By ID
    async getRoomById(id) {
        return await Room.findById(id);
    }

    // Update Room
    async updateRoom(id, roomData) {
        return await Room.findByIdAndUpdate(id, roomData, {
            new: true,
        });
    }

    // Delete Room
    async deleteRoom(id) {
        return await Room.findByIdAndDelete(id);
    }
}

module.exports = new RoomService();