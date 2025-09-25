import React, { useState } from 'react';
import './BookingForm.css';

export default function BookingForm() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [pieces, setPieces] = useState(1);
  const [weight, setWeight] = useState(10);
  const [created, setCreated] = useState(null);

  const submit = async () => {
    try {
      const res = await fetch('https://gocomet.onrender.com/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ origin, destination, pieces, weight_kg: weight })
      });
      const json = await res.json();
      setCreated(json);
    } catch (err) {
      console.error("Error creating booking:", err);
    }
  };

  return (
    <div className="booking-container">
      <div className="booking-card">
        <h2>Create a Booking</h2>
        <div className="form-group">
          <label>Origin</label>
          <input
            value={origin}
            onChange={e => setOrigin(e.target.value)}
            placeholder="Enter origin"
          />

          <label>Destination</label>
          <input
            value={destination}
            onChange={e => setDestination(e.target.value)}
            placeholder="Enter destination"
          />

          <label>Number of Persons</label>
          <input
            type="number"
            value={pieces}
            onChange={e => setPieces(+e.target.value)}
            placeholder="Number of Pieces"
            min="1"
          />

          <label>Weight (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={e => setWeight(+e.target.value)}
            placeholder="Weight in kg"
            min="1"
          />

          <button onClick={submit}>Create Booking</button>
        </div>

        {created && (
          <div className="created-info">
            Booking Created: <b>{created.ref_id}</b> | Status: {created.status}
          </div>
        )}
      </div>
    </div>
  );
}
