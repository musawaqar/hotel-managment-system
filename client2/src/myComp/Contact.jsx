import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact">
      <div className="contact-container">
        <h1>Contact Us</h1>

        <p>
          We'd love to hear from you. Feel free to contact us anytime.
        </p>

        <div className="contact-info">
          <h3>Address</h3>
          <p>123 Main Street, Gujranwala, Pakistan</p>

          <h3>Phone</h3>
          <p>+92 310 4653905</p>

          <h3>Email</h3>
          <p>info@hoteltransylvania.com</p>
        </div>

        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows="5"></textarea>

          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;