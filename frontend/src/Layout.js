// Layout.js
import React from "react";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import SearchRoute from "./SearchRoute";
import BookingForm from "./BookingForm";
import TrackBooking from "./TrackBooking";

function Layout() {
  const location = useLocation();

  // You can skip home check if needed, just an example
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white p-4 text-center font-bold text-xl">
        Air Cargo — Demo
      </header>

      <div className="flex flex-1 overflow-hidden">
        <nav className="w-60 bg-gray-100 p-4">
          <ul className="space-y-3">
            <li>
              <Link
                to="/"
                className={`block p-2 rounded hover:bg-blue-200 ${
                  location.pathname === "/" ? "bg-blue-300 font-bold" : ""
                }`}
              >
                Search Route
              </Link>
            </li>
            <li>
              <Link
                to="/booking"
                className={`block p-2 rounded hover:bg-blue-200 ${
                  location.pathname === "/booking" ? "bg-blue-300 font-bold" : ""
                }`}
              >
                Create Booking
              </Link>
            </li>
            <li>
              <Link
                to="/track"
                className={`block p-2 rounded hover:bg-blue-200 ${
                  location.pathname === "/track" ? "bg-blue-300 font-bold" : ""
                }`}
              >
                Track Booking
              </Link>
            </li>
          </ul>
        </nav>

        <main className="flex-1 p-6 overflow-auto">
          <Routes>
            <Route path="/" element={<SearchRoute />} />
            <Route path="/booking" element={<BookingForm />} />
            <Route path="/track" element={<TrackBooking />} />
          </Routes>
        </main>
      </div>

      <footer className="bg-gray-200 text-center p-3">
        &copy; 2025 Air Cargo Demo
      </footer>
    </div>
  );
}

export default Layout;
