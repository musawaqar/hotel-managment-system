import React from "react";
import "./Booking.css";

const Booking = () => {
  return (
    <div className="booking">
      <div className="booking-container">
        <h1>Book Your Stay</h1>

        <form>
          <input type="text" placeholder="Full Name" />
          <input type="email" placeholder="Email Address" />
          <input type="tel" placeholder="Phone Number" />

          <label>Check-In Date</label>
          <input type="date" />

          <label>Check-Out Date</label>
          <input type="date" />

          <select>
            <option>Select Room Type</option>
            <option>Standard Room</option>
            <option>Deluxe Room</option>
            <option>Suite</option>
          </select>

          <input type="number" placeholder="Number of Guests" />

          <textarea
            rows="4"
            placeholder="Special Requests"
          ></textarea>

          <button type="submit">Book Now</button>
        </form>
      </div>
    </div>
  );
};

export default Booking;