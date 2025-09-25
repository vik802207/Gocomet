# Air Cargo Booking & Tracking System

## 📌 Overview

This project is an **Air Cargo Booking & Tracking System** built with
**Node.js, Express, MongoDB, and React**.\
It allows users to **book cargo shipments, track their journey, and
manage flight schedules**.

------------------------------------------------------------------------

## 🔗 Live Links
- **Frontend:** [https://gocomet-s5gx.vercel.app/](https://gocomet-s5gx.vercel.app/)  
- **Backend:** [https://gocomet.onrender.com/](https://gocomet.onrender.com/)

---

## 🚀 Features

-   **Flight Management**
    -   Add new flights (with airline, route, timings)
    -   Search flights (direct + transit routes)
-   **Booking Management**
    -   Create new booking with unique `ref_id`
    -   Update booking status (`BOOKED`, `DEPARTED`, `ARRIVED`,
        `DELIVERED`, `CANCELLED`)
    -   Cancel booking (only if not already arrived)
    -   View full booking history with timeline events
-   **Tracking**
    -   Search by `ref_id` to view current status + full event timeline
---

To **add a new flight**:

1. Login as admin.
2. Navigate to `/admin` in the browser or click "Admin Dashboard".
3. Fill in the flight details:

   - Flight Number  
   - Airline Name  
   - Origin  
   - Destination  
   - Departure Date & Time  
   - Arrival Date & Time  

4. Click **Add Flight**.  
5. The data will be sent to the backend: `POST /flights`  
   - **Endpoint:** `https://gocomet.onrender.com/flights`  
   - **Headers:**  
     ```json
     {
       "Content-Type": "application/json",
       "Authorization": "Bearer <admin-token>"
     }
     ```
   - **Body Example:**
     ```json
     {
       "flightNumber": "AI101",
       "airlineName": "Air India",
       "origin": "DEL",
       "destination": "BLR",
       "departureDatetime": "2025-09-25T10:00",
       "arrivalDatetime": "2025-09-25T12:30"
     }
     ```
6. On success, an alert "Flight added successfully!" will appear.

------------------------------------------------------------------------

## 🛠 Tech Stack

-   **Backend:** Node.js, Express.js, MongoDB, Mongoose
-   **Frontend:** React.js (Vite) + Tailwind CSS
-   **Auth (Optional):** JWT / Google OAuth

------------------------------------------------------------------------

## 📂 Project Structure

    backend/
     ├── models/         # Mongoose models (Flight, Booking)
     ├── routes/         # Express routes (flights, bookings)
     ├── server.js       # App entry point
     ├── .env            # Environment variables
    frontend/
     ├── src/
     │    ├── components/ # UI Components
     │    ├── pages/      # Pages (Booking, Tracking, Flights)
     │    ├── App.jsx     # Main React App
     ├── vite.config.js   # Vite config

------------------------------------------------------------------------

## ⚙️ Installation

### 1️⃣ Clone Repository

``` bash
git clone https://github.com/your-username/air-cargo-system.git
cd air-cargo-system
```

### 2️⃣ Setup Backend

``` bash
cd backend
npm install
```

Create a `.env` file:

``` env
MONGO_URI=mongodb://localhost:27017/aircargo
PORT=5000
```

Run backend:

``` bash
npm start
```

### 3️⃣ Setup Frontend

``` bash
cd frontend
npm install
npm run dev
```

------------------------------------------------------------------------

## 📡 API Endpoints

### Flights

-   `POST /api/flights` → Add new flight
-   `GET /api/flights/route?origin=DEL&destination=BLR&departureDate=2025-08-15`
    → Get direct + transit routes

### Bookings

-   `POST /api/bookings` → Create booking
-   `PATCH /api/bookings/:id/depart` → Mark as departed
-   `PATCH /api/bookings/:id/arrive` → Mark as arrived
-   `PATCH /api/bookings/:id/cancel` → Cancel booking
-   `GET /api/bookings/:ref_id` → Get booking history

------------------------------------------------------------------------

## ✅ Example Request

``` json
POST /api/bookings
{
  "origin": "DEL",
  "destination": "BLR",
  "pieces": 5,
  "weight_kg": 120
}
```

Response:

``` json
{
  "ref_id": "AB12CD",
  "status": "BOOKED",
  "origin": "DEL",
  "destination": "BLR",
  "pieces": 5,
  "weight_kg": 120
}
```

------------------------------------------------------------------------

## 📌 Notes

-   Transit route rule: Second hop must be **same day or next day
    only**.
-   Cancel booking is not allowed after arrival.

------------------------------------------------------------------------

## 📜 License

MIT License © 2025
