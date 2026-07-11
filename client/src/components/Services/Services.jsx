import React from "react";
import "./Services.css";

const services = [
  {
    icon: "🛏️",
    title: "Luxury Rooms",
    description:
      "Elegantly appointed rooms and suites featuring premium bedding, curated interiors, and every modern comfort.",
  },
  {
    icon: "📶",
    title: "Free WiFi",
    description:
      "High-speed internet available 24/7 throughout the property, for guests who never want to lose the thread.",
  },
  {
    icon: "🍽️",
    title: "Fine Dining",
    description:
      "A curated menu blending local flavor with international cuisine, served from sunrise past midnight.",
  },
  {
    icon: "🚗",
    title: "Valet Parking",
    description:
      "Complimentary valet service so you can arrive and simply walk away, leaving the rest to us.",
  },
  {
    icon: "🧖",
    title: "Spa & Wellness",
    description:
      "A private sanctuary of treatments and therapies designed to restore you after a long day of travel.",
  },
  {
    icon: "🛎️",
    title: "24/7 Concierge",
    description:
      "Our team is on call around the clock for reservations, recommendations, and anything else you need.",
  },
];

export default function Services() {
  return (
    <div className="services">
      <div className="services__orb" />

      <div className="services__inner">
        <div className="services__eyebrow">
          <span className="services__eyebrow-dot" />
          What We Offer
        </div>

        <h1 className="services__title">
          Why <em>Luxe Stay</em>
        </h1>

        <p className="services__subtitle">
          Every detail considered, every guest attended to. Here's what
          sets your stay apart.
        </p>

        <div className="services-grid">
          {services.map((service) => (
            <div className="service-card" key={service.title}>
              <div className="service-card__icon">{service.icon}</div>
              <h3 className="service-card__title">{service.title}</h3>
              <div className="service-card__rule" />
              <p className="service-card__text">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}