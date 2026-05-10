// yet to do 
// 1) validations on model and routes
// 2) login page for admin 
// 3) login/sign up  page for user
// ye model aik public browsing , restricted action model ki tarah bnana hai 
// 4) Navbar 
// 5) hero page
// 6) get photos for hotel ambiance and rooms 
// 7) footer , contact info and social media account links 
// 8) attach front end with backend 
// 9) Test model 
const express = require("express")
const mongoose = require("mongoose")
const roomRoutes = require("./Routes/Room")
const bookingRoutes = require("./Routes/Booking");
const authRoutes = require("./Routes/auth")
const app = express()
app.use(express.json())
// connect database
mongoose.connect("mongodb://127.0.0.1:27017/hotelDB")
.then(()=> console.log("MongoDB Connected"))
.catch(err => console.log(err))
// routes for room
app.get("/", (req, res) => {
  res.send("Your backend is running");
});
app.use("/room", roomRoutes)
// routes for booking
app.use("/booking", bookingRoutes);
// routes for signup
app.use("/auth",authRoutes)
// abhi ke liye port 3000 use ho rha 
app.listen(3000, () => {
    console.log("Server running on port 3000")
})

// new changes