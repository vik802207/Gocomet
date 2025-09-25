require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Flight = require('./models/Flight');
const flightsRouter = require('./routes/flights');
const bookingsRouter = require('./routes/bookings');
const authRouter=require('./routes/auth')
const connectDB=require('./config/db')
const app = express();
app.use(cors());
app.use(express.json());
connectDB();

app.use('/api/flights', flightsRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api/auth', authRouter);

const PORT = process.env.PORT || 4000;
app.post("/flights", async (req, res) => {
  try {
    const { flightNumber, airlineName, origin, destination, departureDatetime, arrivalDatetime } = req.body;

    if (!flightNumber || !airlineName || !origin || !destination || !departureDatetime || !arrivalDatetime) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const flight = new Flight({
      flightNumber,
      airlineName,
      origin,
      destination,
      departureDatetime: new Date(departureDatetime),
      arrivalDatetime: new Date(arrivalDatetime),
    });

    await flight.save();
    res.status(201).json({ message: "Flight added successfully", flight });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});



app.listen(PORT,()=>{
    console.log(`Server is Running on ${PORT}`);
})