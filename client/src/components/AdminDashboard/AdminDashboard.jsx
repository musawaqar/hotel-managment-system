



import React from "react";
import {
  BedDouble,
  CalendarCheck,
  Users,
  CreditCard,
  ConciergeBell,
  UtensilsCrossed,
  Hotel,
  Bell,
  ClipboardList,
  Star,
  Settings,
  BarChart3,
} from "lucide-react";
import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom";

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

const stats = [
  { label: "Available Rooms", value: "84" },
  { label: "Occupied", value: "52" },
  { label: "Today's Check-ins", value: "17" },
  { label: "Revenue Today", value: "$8,420" },
];

const AdminDashboard = () => {
    const navigate = useNavigate();
    const moveTo = (link) => {
        navigate(link);
    }
  return (
    <section className="rooms-admin">
      <div className="rooms-admin__orb" />

      <div className="rooms-admin__inner">
        <div className="rooms-admin__eyebrow">
          <span className="rooms-admin__eyebrow-dot" />
          Hotel Administration
        </div>

        <h1 className="rooms-admin__title">
          Hotel <em>Management</em> Dashboard
        </h1>

        {/* Stats */}
        <div className="dashboard-stats">
          {stats.map((item) => (
            <div key={item.label} className="dashboard-stat">
              <span>{item.label}</span>
              <h2>{item.value}</h2>
            </div>
          ))}
        </div>

        {/* Modules */}
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

                <button className="dashboard-card__button" onClick={() => moveTo(module.link)}>
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