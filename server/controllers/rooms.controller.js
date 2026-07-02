const roomService = require("../services/rooms.service");

const createRoom = async (req, res) => {
    try {
        const room = await roomService.createRoom(req.body);
        res.status(201).json(room);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getAllRooms = async (req, res) => {
    try {
        const rooms = await roomService.getAllRooms();
        res.json(rooms);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getRoomById = async (req, res) => {
    try {
        const room = await roomService.getRoomById(req.params.id);
        res.json(room);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const updateRoom = async (req, res) => {
    try {
        const room = await roomService.updateRoom(req.params.id, req.body);
        res.json(room);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const deleteRoom = async (req, res) => {
    try {
        await roomService.deleteRoom(req.params.id);
        res.json({ message: "Room deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createRoom,
    getAllRooms,
    getRoomById,
    updateRoom,
    deleteRoom,
};