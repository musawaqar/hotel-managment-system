import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../../lib/api";
import "./Navbar.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("customer");
  const [checkingAuth, setCheckingAuth] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Re-check auth on every route change, so login/logout elsewhere
  // (e.g. LoginModal) is reflected here without a full page reload.
  useEffect(() => {
    checkAuth();
  }, [location.pathname]);

  const checkAuth = async () => {
    try {
      const response = await api.get("/protected/protected-route");
      setIsLoggedIn(true);
      setRole(response.data.role);
    } catch (error) {
      setIsLoggedIn(false);
    } finally {
      setCheckingAuth(false);
    }
  };

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoggedIn(false);
      setMenuOpen(false);
      navigate("/");
    }
  };

  const links = [
    { to: "/", label: "Home" },
    { to: "/rooms", label: "Rooms" },
    { to: "/booking", label: "Booking" },
    { to: "/mybookings", label: "My Bookings" },
    { to: "/services", label: "Services" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
        <div className="navbar__inner">

          {/* Logo */}
          <Link to="/" className="navbar__logo">
            <span className="navbar__logo-mark">L</span>
            <span className="navbar__logo-text">uxe<em>Stay</em></span>
          </Link>

          {/* Desktop Links */}
          <ul className="navbar__links">
            {links.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={`navbar__link ${location.pathname === to ? "navbar__link--active" : ""}`}
                >
                  {label}
                  <span className="navbar__link-bar" />
                </Link>
              </li>
            ))}
            {isLoggedIn && role === "admin" && (
    <li>
      <Link
        to="/admin/dashboard"
        className={`navbar__link ${
          location.pathname.startsWith("/admin")
            ? "navbar__link--active"
            : ""
        }`}
      >
        Admin Dashboard
        <span className="navbar__link-bar" />
      </Link>
    </li>
  )}
          </ul>

          {/* CTA */}
          <div className="navbar__actions">
            {!checkingAuth && (
              isLoggedIn ? (
                <button onClick={handleLogout} className="navbar__login navbar__login--btn">
                  Sign Out
                </button>
              ) : (
                <Link to="/auth/login" className="navbar__login">Sign In</Link>
              )
            )}
            <Link to="/booking" className="navbar__reserve">
              Reserve Now
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className={`navbar__burger ${menuOpen ? "navbar__burger--open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>

        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${menuOpen ? "mobile-drawer--open" : ""}`}>
        <ul className="mobile-drawer__links">
          {links.map(({ to, label }, i) => (
            <li key={to} style={{ "--i": i }}>
              <Link to={to} onClick={() => setMenuOpen(false)}>{label}</Link>
            </li>
          ))}
           {isLoggedIn && role === "admin" && (
    <li style={{ "--i": links.length }}>
      <Link
        to="/admin/dashboard"
        onClick={() => setMenuOpen(false)}
      >
        Admin Dashboard
      </Link>
    </li>
  )}
        </ul>

        {!checkingAuth && (
          isLoggedIn ? (
            <button className="mobile-drawer__cta mobile-drawer__cta--logout" onClick={handleLogout}>
              Sign Out
            </button>
          ) : (
            <Link to="/auth/login" className="mobile-drawer__cta mobile-drawer__cta--login" onClick={() => setMenuOpen(false)}>
              Sign In
            </Link>
          )
        )}

        <Link to="/booking" className="mobile-drawer__cta" onClick={() => setMenuOpen(false)}>
          Reserve Now
        </Link>
      </div>
    </>
  );
};

export default Navbar;