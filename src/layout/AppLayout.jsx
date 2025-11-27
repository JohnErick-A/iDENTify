// src/layout/AppLayout.jsx
import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./../App.css";

import DashboardIcon from "../assets/dashboard.svg";
import AppointmentIcon from "../assets/appointment.svg";
import QueueIcon from "../assets/queue.svg";
import ReportIcon from "../assets/report.svg";
import DentistIcon from "../assets/dentist.svg";
import LogoutIcon from "../assets/logout.svg";

function AppLayout({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="layout">

      {/* SIDEBAR WITH TOGGLE */}
      <aside className={`sidebar-full ${isSidebarCollapsed ? "collapsed" : ""}`}>
        <div className="sidebar-header">
          <button className="sidebar-toggle" onClick={toggleSidebar} title="Toggle sidebar">
            ☰
          </button>
          <h1 className="sidebar-title">iDENTify</h1>
        </div>

        <NavLink to="/app" end className="side-icon-btn">
          <img src={DashboardIcon} className="side-icon" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/app/appointments" className="side-icon-btn">
          <img src={AppointmentIcon} className="side-icon" />
          <span>Appointments</span>
        </NavLink>

        <NavLink to="/app/queue" className="side-icon-btn">
          <img src={QueueIcon} className="side-icon" />
          <span>Queue</span>
        </NavLink>

        <NavLink to="/app/reports" className="side-icon-btn">
          <img src={ReportIcon} className="side-icon" />
          <span>Reports</span>
        </NavLink>

        <NavLink to="/app/dentists" className="side-icon-btn">
          <img src={DentistIcon} className="side-icon" />
          <span>Dentists</span>
        </NavLink>

        <button className="side-icon-btn logout-row" onClick={handleLogout}>
          <img src={LogoutIcon} className="side-icon" />
          <span>Logout</span>
        </button>
      </aside>

      <main className="dashboard-area">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
