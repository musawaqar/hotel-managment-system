const express = require("express")
const router = express.Router()
const Booking = require("../Models/booking.js")
const bookingSchema = require("../Validations/BookingValidations.js")
const { validate, validateParam } = require("../middleware/validate");
const idSchema = require("../Validations/ParamValidations.js");
// reminder

// abhi iski bhi validations lgani hai , validations dono jagah lga ge models mein jo databasae ke 
// liye use ho rha aur routes py bhi jo front end ke sath attach ho ga

// create booking 
// Post /booking/Create
router.post("/Create",validate(bookingSchema),async (req,res) => {
    try {
        const booking = new Booking(req.body)
        await booking.save()
        res.status(201).json("your booking has been made ")
    } catch (error) {
        res.status(400).json({error : error.message})
    }
})
// get all bookings
// Get /booking/All
router.get("/All", async (req,res) =>
{
    try {
        const booking = await Booking.find().populate("room")
        res.json(booking)
    } catch (error) {
        res.status(400).json({error : error.message})
    }
})
// get single booking
// Get /booking/:id
router.get("/:id",validateParam(idSchema, "params"), async (req,res) =>
{
try {
    const booking = await Booking.findById(req.params.id).populate("room")
    if(!booking) return res.status(404).json("Booking Not Found!!!")
    res.json(booking)
} catch (error) {
    res.status(500).json({error : error.message})
}
})
// Update booking
// Put /booking/Update/
router.put("/Update/:id",validateParam(idSchema, "params"),validate(bookingSchema),  async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedBooking)
      return res.status(404).json({ error: "Enter correct Booking ID" });

    res.status(200).json({
      message: "Your booking has been updated",
      booking: updatedBooking 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// delete a room 
// Delete /booking/:id
router.delete("/delete/:id",validateParam(idSchema, "params"), async (req,res)=>
{
    try {
        const deleteBooking = await Booking.findByIdAndDelete(req.params.id)
        if(!deleteBooking) return res.status(400).json({error : "booking not found!!"})
        res.status(200).json({message:"your booking has been removed"})
    } catch (error) {
        res.status(500).json({error : error.message})
    }
})
module.exports = router;