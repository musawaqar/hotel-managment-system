import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section">
          <h3>Luxury Hotel</h3>
          <p>Experience comfort, luxury, and unforgettable stays.</p>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <p>Phone: +92 310 4653905</p>
          <p>Email: MusaWaqar@gmail.com</p>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <a href="#">Facebook</a>
          <a href="#">Instagram</a>
          <a href="#">Twitter</a>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 Luxury Hotel. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;