import React, {useState} from 'react';
import './SearchRoute.css'
export default function SearchRoute(){
  const [origin,setOrigin]=useState('');
  const [destination,setDestination]=useState('');
  const [date,setDate]=useState('2025-08-15');
  const [result,setResult]=useState(null);

  const search = async () => {
    const q = new URLSearchParams({ origin, destination, date });
    const res = await fetch(`https://gocomet.onrender.com/api/flights/route?${q.toString()}`);
    const json = await res.json();
    setResult(json);
  };

  return (
    <div>
     <div className="search-container">
  <h2>Search Route</h2>
  <div className="search-inputs">
    <input value={origin} onChange={e=>setOrigin(e.target.value)} placeholder="Origin" />
    <input value={destination} onChange={e=>setDestination(e.target.value)} placeholder="Destination" />
    <input type="date" value={date} onChange={e=>setDate(e.target.value)} />
    <button onClick={search}>Search</button>
  </div>

  {result && (
    <>
      <h3>Direct Flights</h3>
      {result.direct.length === 0 
        ? <div className="no-flights">No direct flights</div> 
        : result.direct.map(f => (
            <div className="flight-card" key={f._id}>
              {f.flightNumber} {f.airlineName} {new Date(f.departureDatetime).toLocaleString()} → {new Date(f.arrivalDatetime).toLocaleString()}
            </div>
      ))}

      <h3>Transit (1-stop)</h3>
      {result.transit.length === 0 
        ? <div className="no-flights">No transit flights</div> 
        : result.transit.map((t, i) => (
            <div className="transit-card" key={i}>
              <div><b>Leg 1:</b> {t.legs[0].flightNumber} {t.legs[0].origin} → {t.legs[0].destination} {new Date(t.legs[0].departureDatetime).toLocaleString()}</div>
              <div><b>Leg 2:</b> {t.legs[1].flightNumber} {t.legs[1].origin} → {t.legs[1].destination} {new Date(t.legs[1].departureDatetime).toLocaleString()}</div>
            </div>
      ))}
    </>
  )}
</div>

    </div>
  );
}
