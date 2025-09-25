import React, { useState } from "react";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [flight, setFlight] = useState({
    flightNumber: "",
    airlineName: "",
    origin: "",
    destination: "",
    departureDatetime: "",
    arrivalDatetime: "",
  });

  const handleChange = (e) =>
    setFlight({ ...flight, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:8000/flights", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(flight),
    });
    const data = await res.json();
    if (res.ok) alert("Flight added successfully!");
    else alert(data.error);
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
  <input name="flightNumber" placeholder="Flight Number" onChange={handleChange} />
  <input name="airlineName" placeholder="Airline Name" onChange={handleChange} />
  <input name="origin" placeholder="Origin" onChange={handleChange} />
  <input name="destination" placeholder="Destination" onChange={handleChange} />

  <label htmlFor="departureDatetime">Departure Date & Time</label>
  <input
    id="departureDatetime"
    name="departureDatetime"
    type="datetime-local"
    onChange={handleChange}
  />

  <label htmlFor="arrivalDatetime">Arrival Date & Time</label>
  <input
    id="arrivalDatetime"
    name="arrivalDatetime"
    type="datetime-local"
    onChange={handleChange}
  />

  <button onClick={handleSubmit}>Add Flight</button>
    </div>
  );
}

export default AdminDashboard;
