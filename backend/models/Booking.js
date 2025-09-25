const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  type: { type: String, enum: ['CREATED','DEPART','ARRIVE','CANCELLED'], required: true },
  location: String,
  timestamp: { type: Date, default: Date.now },
  flightId: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight' },
  note: String
});

const BookingSchema = new mongoose.Schema({
  ref_id: { type: String, unique: true, required: true },
  origin: String,
  destination: String,
  pieces: Number,
  weight_kg: Number,
  status: { type: String, enum: ['BOOKED','DEPARTED','ARRIVED','DELIVERED','CANCELLED'], default: 'BOOKED' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  flights: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Flight' }], // optional chosen flights
  timeline: [EventSchema]
});

BookingSchema.pre('save', function(next){ this.updatedAt = new Date(); next(); });

module.exports = mongoose.model('Bookingnew', BookingSchema);
