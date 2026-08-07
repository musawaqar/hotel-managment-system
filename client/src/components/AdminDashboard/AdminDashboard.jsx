import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BedDouble,
  CalendarCheck,
} from "lucide-react";
import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom";
import api from "../../lib/api";

const modules = [
  {
    title: "Manage Rooms",
    description: "Create, edit and organize hotel rooms.",
    icon: BedDouble,
    link: "/admin/managerooms",
    color: "emerald",
  },
  {
    title: "Reservations",
    description: "View and manage all bookings.",
    icon: CalendarCheck,
    link: "/admin/managebookings",
    color: "champagne",
  },
];

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState([
    { label: "Available Rooms", value: 0 },
    { label: "Occupied", value: 0 },
    { label: "Today's Check-ins", value: 0 },
    { label: "Revenue Today", value: "$0" },
  ]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [roomsRes, bookingsRes] = await Promise.all([
        api.get("/room/rooms"),
        api.get("/booking/all"),
      ]);

      const rooms = roomsRes.data;
      const bookings = bookingsRes.data;

      const today = new Date();

      const isSameDay = (date) => {
        const d = new Date(date);

        return (
          d.getDate() === today.getDate() &&
          d.getMonth() === today.getMonth() &&
          d.getFullYear() === today.getFullYear()
        );
      };

      // Occupied Rooms
      const occupied = bookings.filter(
        (booking) => booking.status === "CheckedIn"
      ).length;

      // Available Rooms
      const available = rooms.length - occupied;

      // Today's Check-ins
      const todayCheckins = bookings.filter(
        (booking) =>
          booking.status === "CheckedIn" &&
          isSameDay(booking.checkInDate)
      );

      // Revenue Today
      let revenueToday = 0;

      todayCheckins.forEach((booking) => {
        if (!booking.room) return;

        const checkIn = new Date(booking.checkInDate);
        const checkOut = new Date(booking.checkOutDate);

        let nights =
          (checkOut - checkIn) / (1000 * 60 * 60 * 24);

        if (nights <= 0) nights = 1;

        revenueToday += booking.room.roomPrice * nights;
      });

      setStats([
        {
          label: "Available Rooms",
          value: available,
        },
        {
          label: "Occupied",
          value: occupied,
        },
        {
          label: "Today's Check-ins",
          value: todayCheckins.length,
        },
        {
          label: "Revenue Today",
          value: `$${revenueToday.toLocaleString()}`,
        },
      ]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="rooms-admin">
      <div className="rooms-admin__inner">

        <div className="rooms-admin__eyebrow">
          <span className="rooms-admin__eyebrow-dot" />
          Hotel Administration
        </div>

        <h1 className="rooms-admin__title">
          Hotel <em>Management</em> Dashboard
        </h1>

        <div className="dashboard-stats">
          {stats.map((item) => (
            <div key={item.label} className="dashboard-stat">
              <span>{item.label}</span>
              <h2>{item.value}</h2>
            </div>
          ))}
        </div>

        <div className="dashboard-grid">
          {modules.map((module) => {
            const Icon = module.icon;

            return (
              <div className="dashboard-card" key={module.title}>
                <div className={`dashboard-card__icon ${module.color}`}>
                  <Icon size={30} />
                </div>

                <h3>{module.title}</h3>

                <p>{module.description}</p>

                <button
                  className="dashboard-card__button"
                  onClick={() => navigate(module.link)}
                >
                  Open Module
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default AdminDashboard;