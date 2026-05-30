import React from "react";
import "./Room.css";

const Rooms = () => {
  return (
    <section className="rooms">
      <h2>Our Rooms</h2>
      <p>Choose from our luxurious rooms designed for comfort.</p>

      <div className="room-container">
        <div className="room-card">
          <img src="/room1.jpg" alt="room" />
          <h3>Deluxe Room</h3>
        </div>

        <div className="room-card">
          <img src="/room2.jpg" alt="room" />
          <h3>Executive Suite</h3>
        </div>

        <div className="room-card">
          <img src="/room3.jpg" alt="room" />
          <h3>Royal Suite</h3>
        </div>
      </div>
    </section>
  );
};

export default Rooms;