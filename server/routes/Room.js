const express = require("express")
const router = express.Router()
const Room = require("../Models/room.js")
const roomSchema = require("../Validations/RoomValidations.js")
const { validate, validateParam } = require("../middleware/validate.js");
const idSchema = require("../Validations/ParamValidations.js");
// ye sab sirf admin ke control mein hona chahye 

// reminder

// abhi iski bhi validations lgani hai , validations dono jagah lga ge models mein jo databasae ke 
// liye use ho rha aur routes py bhi jo front end ke sath attach ho ga


// Createing a room 
// Route = Post /room/CreateRoom
router.post("/CreateRoom",validate(roomSchema),async (req,res) =>
{
try{
    const room = new Room(req.body)
    await room.save()
    res.status(201).json(room)
}catch(err)
{
    res.status(400).json({error : err.message})
}
})
// getting all the rooms
// Route = Get /room/Rooms
router.get("/Rooms",async (req,res)=>{
    try{
        const rooms = await Room.find()
        res.json(rooms)
    }catch(err){
        res.status(400).json({error : err.message})
    }
})
// getting a specific room
// Route = Get /room/Room:id
router.get("/Room/:id" ,async (req,res) =>
{
    try{
    const room = await Room.findById(req.params.id)
    res.json(room)    
    }
    catch(err)
    {
res.status(400).json({error : err.message})
    }
    
})
//Update a specific room
// Put /room/update:id
router.put("/update/:id",validate(roomSchema), async (req,res) =>
{
    try{
        const room = await Room.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.json(room)
    }catch(err)
    {
        res.status(400).json({error : err.message})
    }
})
// DELETE room
// Delete /room/delete:id
router.delete("/delete/:id", async (req, res) => {
    try {
        await Room.findByIdAndDelete(req.params.id);
        res.json({ message: "Room deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
module.exports = router