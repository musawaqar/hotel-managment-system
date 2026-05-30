import React from 'react'
import "./Services.css";
export default function Services() {
  return (
    <div>
      <section className="services">
      <h1 className='heading'>Why Hotel Transylvania?</h1>

      <div className="services-container">
        <div className="service-card">
          <h3>Luxury Rooms</h3>
          <p>Comfortable and premium rooms with all facilities.</p>
        </div>

        <div className="service-card">
          <h3>Free WiFi</h3>
          <p>High-speed internet available 24/7 for guests.</p>
        </div>

        <div className="service-card">
          <h3>Restaurant</h3>
          <p>Delicious food with local and international cuisine.</p>
        </div>
      </div>
    </section>
    </div>
  )
}
