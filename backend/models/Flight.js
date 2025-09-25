const mongoose = require('mongoose');

const FlightSchema = new mongoose.Schema({
  flightNumber: { type: String, required: true },
  airlineName: String,
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  departureDatetime: { type: Date, required: true },
  arrivalDatetime: { type: Date, required: true }
});

module.exports = mongoose.model('Flight', FlightSchema);
