import React, { useEffect, useRef } from "react";
import { Star } from "lucide-react";
import "./Hero.css";
const Hero = () => {
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("in-view");
        });
      },
      { threshold: 0.15 }
    );
    const els = document.querySelectorAll(".hero__reveal");
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="hero">

      {/* Full-bleed background */}
      <div className="hero__bg">
        <img src="/HomeCover.jpg" alt="" className="hero__bg-img" />
        <div className="hero__bg-overlay" />
      </div>

      {/* Floating ambient orbs */}
      <div className="hero__orb hero__orb--1" />
      <div className="hero__orb hero__orb--2" />

      {/* Main content */}
      <div className="hero__body">

        <div className="hero__eyebrow hero__reveal">
          <span className="hero__eyebrow-dot" />
          Five-Star Hospitality · Est. 2004
          <span className="hero__eyebrow-dot" />
        </div>

        <h1 className="hero__heading hero__reveal">
          <span className="hero__heading-thin">Where Every</span>
          <span className="hero__heading-bold">Moment</span>
          <span className="hero__heading-italic">Becomes a Memory</span>
        </h1>

        <p className="hero__sub hero__reveal">
          Indulge in curated luxury — from bespoke suites and Michelin-starred dining
          to a holistic spa retreat, set against the heart of Lahore.
        </p>

        <div className="hero__actions hero__reveal">
          <a href="/booking" className="hero__btn-primary">
            <span>Reserve Your Suite</span>
            <svg className="hero__btn-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="/rooms" className="hero__btn-ghost">
            Explore Rooms
          </a>
        </div>

        {/* Stats strip */}
        <div className="hero__stats hero__reveal" ref={statsRef}>
          {[
            { value: "98", suffix: "%", label: "Guest Satisfaction" },
            { value: "142", suffix: "+", label: "Luxury Suites" },
            {
              value: "3",
              suffix: (
                <Star
                  className="hero__stat-icon"
                  size={14}
                  strokeWidth={2}
                  fill="currentColor"
                  aria-hidden="true"
                />
              ),
              label: "Michelin Restaurants",
            },
            { value: "20", suffix: "yr", label: "of Excellence" },
          ].map(({ value, suffix, label }) => (
            <div className="hero__stat" key={label}>
              <div className="hero__stat-num">
                {value}<span>{suffix}</span>
              </div>
              <div className="hero__stat-label">{label}</div>
            </div>
          ))}
        </div>

      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll">
        <span>Scroll</span>
        <div className="hero__scroll-line">
          <div className="hero__scroll-dot" />
        </div>
      </div>

    </section>
  );
};

export default Hero;