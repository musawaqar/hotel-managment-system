const dotenv = require("dotenv");
dotenv.config();
const express = require("express")
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose")
const cors = require('cors');
const roomRoutes = require("./routes/room.routes")
const bookingRoutes = require("./routes/booking.routes")
const authRoutes = require("./routes/auth.routes")
const connectDB = require("./configs/mongodb.config");
const protectedRoutes = require("./routes/protected.routes");
const app = express()

app.use(express.json());
app.use(cookieParser());


connectDB();

app.use(cors({
  origin: ['http://localhost:3000','https://myfyp.cscircle.com'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true
}))

app.get("/", (req, res) => {
  res.send("Your backend is running");
});
app.use("/api/room", roomRoutes);

app.use("/api/booking", bookingRoutes);

app.use("/api/auth",authRoutes);

app.use("/api/protected", protectedRoutes);


app.listen(3001, () => {
    console.log("Server running on port 3001")
})

