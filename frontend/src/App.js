import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import SearchRoute from './SearchRoute';
import BookingForm from './BookingForm';
import TrackBooking from './TrackBooking';
import Login from './Login';
import AdminDashboard from './AdminDashboard';
import Signup from './Signup';
import './App.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="blocks-container">
      <div className="block">
        <div className="card-header">Search Route</div>
        <div className="card-content">
          <SearchRoute />

          {/* Buttons inside Search Route box */}
          <div className="button-row">
            <button
              className="action-button"
              onClick={() => navigate('/booking')}
            >
              Create Booking
            </button>

            <button
              className="action-button"
              onClick={() => navigate('/track')}
            >
              Track Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <h1>Air Cargo — Demo</h1>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/booking" element={<BookingForm />} />
          <Route path="/track" element={<TrackBooking />} />
           <Route path="/login" element={<Login />} />
            <Route path="/" element={<Signup />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
