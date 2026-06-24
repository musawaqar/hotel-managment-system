const dotenv = require("dotenv");
dotenv.config();
const express = require("express")
const mongoose = require("mongoose")
const cors = require('cors');
const roomRoutes = require("./routes/room.routes")
const bookingRoutes = require("./routes/booking.routes")
const authRoutes = require("./routes/auth.routes")
const connectDB = require("./configs/mongodb.config");
const app = express()

app.use(express.json())


connectDB();

app.use(cors({
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true
}))

app.get("/", (req, res) => {
  res.send("Your backend is running");
});
app.use("/api/room", roomRoutes)

app.use("/api/booking", bookingRoutes);

app.use("/api/auth",authRoutes)

app.listen(3001, () => {
    console.log("Server running on port 3000")
})

