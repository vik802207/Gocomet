const express = require('express');
const router = express.Router();
const { nanoid } = require('nanoid');
const Booking = require('../models/Booking');
const Flight = require('../models/Flight');
const mongoose = require('mongoose');

// Create booking
router.post('/', async (req, res) => {
  try {
    const { origin, destination, pieces, weight_kg, flights } = req.body;
    const ref_id = (req.body.ref_id) ? req.body.ref_id : `BKG-${nanoid(8).toUpperCase()}`;

    const booking = new Booking({
      ref_id,
      origin,
      destination,
      pieces,
      weight_kg,
      flights: flights ? flights.map(id => mongoose.Types.ObjectId(id)) : [],
      timeline: [{ type: 'CREATED', location: origin, note: 'Booking created' }]
    });
    await booking.save();
    res.json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'could not create booking' });
  }
});

// Get booking + timeline
router.get('/:ref', async (req, res) => {
  const { ref } = req.params;
  const booking = await Booking.findOne({ ref_id: ref }).populate('flights').lean();
  if (!booking) return res.status(404).json({ error: 'not found' });
  res.json(booking);
});

// Depart booking
router.post('/:ref/depart', async (req, res) => {
  try {
    const { ref } = req.params;
    const { location, flightId, note } = req.body;
    const booking = await Booking.findOne({ ref_id: ref });
    if (!booking) return res.status(404).json({ error: 'not found' });

    booking.status = 'DEPARTED';
    booking.timeline.push({ type: 'DEPART', location, flightId, note });
    await booking.save();
    res.json(booking);
  } catch (err) { console.error(err); res.status(500).json({ error: 'server error' }); }
});

// Arrive booking
router.post('/:ref/arrive', async (req, res) => {
  try {
    const { ref } = req.params;
    const { location, flightId, note, deliver = false } = req.body;
    const booking = await Booking.findOne({ ref_id: ref });
    if (!booking) return res.status(404).json({ error: 'not found' });

    booking.status = deliver ? 'DELIVERED' : 'ARRIVED';
    booking.timeline.push({ type: 'ARRIVE', location, flightId, note });
    await booking.save();
    res.json(booking);
  } catch (err) { console.error(err); res.status(500).json({ error: 'server error' }); }
});

// Cancel booking
router.post('/:ref/cancel', async (req, res) => {
  try {
    const { ref } = req.params;
    const { note } = req.body;
    const booking = await Booking.findOne({ ref_id: ref });
    if (!booking) return res.status(404).json({ error: 'not found' });

    // cannot cancel after arrived
    if (['ARRIVED','DELIVERED'].includes(booking.status)) {
      return res.status(400).json({ error: 'Cannot cancel booking that has already arrived/delivered' });
    }

    booking.status = 'CANCELLED';
    booking.timeline.push({ type: 'CANCELLED', location: booking.origin, note: note || 'Cancelled' });
    await booking.save();
    res.json(booking);
  } catch (err) { console.error(err); res.status(500).json({ error: 'server error' }); }
});

module.exports = router;
