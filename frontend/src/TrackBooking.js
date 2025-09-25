import React, {useState} from 'react';
import './TrackBooking.css'
export default function TrackBooking(){
  const [ref,setRef]=useState('');
  const [booking,setBooking]=useState(null);

  const get = async () => {
    const res = await fetch(`https://gocomet.onrender.com/api/bookings/${ref}`);
    if (res.status===404) { setBooking({ error:'Not found' }); return; }
    const json = await res.json();
    setBooking(json);
  };

  const depart = async () => {
    await fetch(`https://gocomet.onrender.com/api/bookings/${ref}/depart`, {
      method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ location: booking.origin })
    });
    get();
  };
  const arrive = async () => {
    await fetch(`https://gocomet.onrender.com/api/bookings/${ref}/arrive`, {
      method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ location: booking.destination })
    });
    get();
  };
  const cancel = async () => {
    await fetch(`https://gocomet.onrender.com/api/bookings/${ref}/cancel`, {
      method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ note: 'Cancelled via UI' })
    });
    get();
  };

  return (
    <div>
     <div className="track-container">
  <h2>Track Booking</h2>
  <div style={{ display: 'flex', marginBottom: 15 }}>
    <input placeholder="ref_id" value={ref} onChange={e=>setRef(e.target.value)} />
    <button onClick={get}>Get</button>
  </div>

  {booking && booking.error && <div className="error">{booking.error}</div>}

  {booking && !booking.error && (
    <div className="booking-info">
      <p><b>{booking.ref_id}</b> — {booking.status}</p>
      <p>{booking.pieces} persons · weights {booking.weight_kg} kg</p>

      <h4>Timeline</h4>
      <ul>
        {booking.timeline.map((t,i)=>(
          <li key={i}>
            [{new Date(t.timestamp).toLocaleString()}] {t.type} — {t.location || ''} {t.note ? `(${t.note})` : ''}
          </li>
        ))}
      </ul>

      <div className="action-buttons">
        <button onClick={depart}>Mark Departed</button>
        <button onClick={arrive}>Mark Arrived</button>
        <button onClick={cancel}>Cancel</button>
      </div>
    </div>
  )}
</div>

    </div>
  );
}
