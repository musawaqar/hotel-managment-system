import React from "react";
import {
  BedDouble,
  Wifi,
  UtensilsCrossed,
  CarFront,
  Flower2,
  BellRing,
} from "lucide-react";
import "./Services.css";

const services = [
  {
    icon: BedDouble,
    title: "Luxury Rooms",
    description:
      "Elegantly appointed rooms and suites featuring premium bedding, curated interiors, and every modern comfort.",
  },
  {
    icon: Wifi,
    title: "Free WiFi",
    description:
      "High-speed internet available 24/7 throughout the property, for guests who never want to lose the thread.",
  },
  {
    icon: UtensilsCrossed,
    title: "Fine Dining",
    description:
      "A curated menu blending local flavor with international cuisine, served from sunrise past midnight.",
  },
  {
    icon: CarFront,
    title: "Valet Parking",
    description:
      "Complimentary valet service so you can arrive and simply walk away, leaving the rest to us.",
  },
  {
    icon: Flower2,
    title: "Spa & Wellness",
    description:
      "A private sanctuary of treatments and therapies designed to restore you after a long day of travel.",
  },
  {
    icon: BellRing,
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
          {services.map(({ icon: Icon, title, description }) => (
            <div className="service-card" key={title}>
              <div className="service-card__icon" aria-hidden="true">
                <Icon size={28} strokeWidth={1.5} />
              </div>
              <h3 className="service-card__title">{title}</h3>
              <div className="service-card__rule" />
              <p className="service-card__text">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
