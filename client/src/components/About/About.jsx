import React from "react";
import "./About.css";

const stats = [
  { value: "150+", label: "Rooms & Suites" },
  { value: "24/7", label: "Concierge Service" },
  { value: "15", label: "Years of Hospitality" },
  { value: "4.9", label: "Average Guest Rating" },
];

const About = () => {
  return (
    <div className="about">
      <div className="about__orb" />

      <div className="about__inner">
        <div className="about__eyebrow">
          <span className="about__eyebrow-dot" />
          Our Story
        </div>

        <h1 className="about__title">
          Hotel <em>Transylvania</em>
        </h1>

        <div className="about__layout">
          <div className="about__copy">
            <p>
              Welcome to Hotel Transylvania, where luxury meets comfort.
              Located in the heart of the city, our hotel offers a relaxing
              and unforgettable experience for travelers, families, and
              business guests alike.
            </p>

            <p>
              We believe every guest deserves exceptional hospitality. Our
              modern rooms, premium services, and attentive staff are
              dedicated to making your stay comfortable, memorable, and
              entirely your own.
            </p>

            <p>
              Whether you're visiting for business or leisure, we provide
              world-class facilities including luxury rooms, free WiFi,
              round-the-clock room service, fine dining, and peaceful
              surroundings designed for rest.
            </p>

            <p className="about__signature">
              Your comfort is our priority. Thank you for choosing Hotel
              Transylvania.
            </p>
          </div>

          <div className="about__stats">
            {stats.map((stat) => (
              <div className="about-stat" key={stat.label}>
                <div className="about-stat__value">{stat.value}</div>
                <div className="about-stat__label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;