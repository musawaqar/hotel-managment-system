import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">

      {/* Top divider accent */}
      <div className="footer__accent-bar" />

      <div className="footer__inner">

        {/* Brand column */}
        <div className="footer__brand">
          <Link to="/" className="footer__logo">
            <span className="footer__logo-mark">L</span>
            <span className="footer__logo-name">uxe<em>Stay</em></span>
          </Link>
          <p className="footer__brand-desc">
            A sanctuary of refined elegance — where world-class hospitality,
            architectural beauty, and personal care converge for an unparalleled stay.
          </p>
          <div className="footer__socials">
            {["Facebook", "Instagram", "LinkedIn", "X"].map((s) => (
              <a key={s} href="/" className="footer__social" aria-label={s}>
                {s[0]}
              </a>
            ))}
          </div>
        </div>

        {/* Links grid */}
        <div className="footer__nav-grid">

          <div className="footer__nav-col">
            <h5 className="footer__nav-title">Explore</h5>
            <ul>
              {["Home", "Rooms & Suites", "Dining", "Spa & Wellness", "Events"].map((l) => (
                <li key={l}><a href="/">{l}</a></li>
              ))}
            </ul>
          </div>

          <div className="footer__nav-col">
            <h5 className="footer__nav-title">Guest Services</h5>
            <ul>
              {["Online Booking", "Concierge", "Airport Transfer", "Loyalty Programme", "Gift Cards"].map((l) => (
                <li key={l}><a href="/">{l}</a></li>
              ))}
            </ul>
          </div>

          <div className="footer__nav-col">
            <h5 className="footer__nav-title">Contact</h5>
            <ul className="footer__contact-list">
              <li>
                <span className="footer__contact-label">Phone</span>
                <a href="tel:+923104653905">+92 310 4653905</a>
              </li>
              <li>
                <span className="footer__contact-label">Email</span>
                <a href="mailto:info@luxestay.com">info@luxestay.com</a>
              </li>
              <li>
                <span className="footer__contact-label">Address</span>
                <span>Mall Road, Lahore, Pakistan</span>
              </li>
            </ul>
          </div>

        </div>

      </div>

      {/* Newsletter */}
      <div className="footer__newsletter">
        <div className="footer__newsletter-inner">
          <div className="footer__newsletter-copy">
            <h4>Stay in the Know</h4>
            <p>Exclusive offers, seasonal packages & curated experiences — delivered to your inbox.</p>
          </div>
          <form className="footer__newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email address"
              className="footer__newsletter-input"
            />
            <button type="submit" className="footer__newsletter-btn">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <span>© {year} LuxeStay. All rights reserved.</span>
        <div className="footer__bottom-links">
          <a href="/">Privacy Policy</a>
          <span>·</span>
          <a href="/">Terms of Service</a>
          <span>·</span>
          <a href="/">Cookie Preferences</a>
        </div>
      </div>

    </footer>
  );
};

export default Footer;