const express = require('express');
const router = express.Router();
const Flight = require('../models/Flight');
const { startOfDay, endOfDay, addDays } = require('date-fns');

// GET /api/flights - list
router.get('/', async (req, res) => {
  const flights = await Flight.find().limit(200);
  res.json(flights);
});

// GET /api/flights/route?origin=...&destination=...&date=YYYY-MM-DD
router.get('/route', async (req, res) => {
  try {
    const { origin, destination, date } = req.query;
    if (!origin || !destination || !date) return res.status(400).json({ error: 'origin,destination,date required' });

    const d = new Date(date);
    const dayStart = startOfDay(d);
    const dayEnd = endOfDay(d);

    // Direct flights: same origin & destination and departure on that date
    const direct = await Flight.find({
      origin,
      destination,
      departureDatetime: { $gte: dayStart, $lte: dayEnd }
    });

    // Transit (one-hop)
    // 1) find flights from origin -> mid on date
    const firstLegs = await Flight.find({
      origin,
      departureDatetime: { $gte: dayStart, $lte: dayEnd }
    });

    const transitRoutes = [];

    for (const f1 of firstLegs) {
      // possible midpoints
      const mid = f1.destination;
      // second leg must be mid -> destination
      // allowed departure day: same day (>= f1.arrival) or next day (any time)
      const dayOfF1Arrival = startOfDay(f1.arrivalDatetime);
      const sameDayStart = f1.arrivalDatetime; // must depart after arrival if on same day
      const sameDayEnd = endOfDay(f1.arrivalDatetime);

      // same-day second legs departing after arrival
      const sameDayLegs = await Flight.find({
        origin: mid,
        destination,
        departureDatetime: { $gte: sameDayStart, $lte: sameDayEnd }
      });

      for (const f2 of sameDayLegs) {
        transitRoutes.push({ legs: [f1, f2] });
      }

      // next-day second legs (arrival date +1)
      const nextDayStart = startOfDay(addDays(dayOfF1Arrival, 1));
      const nextDayEnd = endOfDay(addDays(dayOfF1Arrival, 1));
      const nextDayLegs = await Flight.find({
        origin: mid,
        destination,
        departureDatetime: { $gte: nextDayStart, $lte: nextDayEnd }
      });

      for (const f2 of nextDayLegs) {
        transitRoutes.push({ legs: [f1, f2] });
      }
    }

    res.json({ direct, transit: transitRoutes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

module.exports = router;
