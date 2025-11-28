import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "../styles/layout/AppLayout.css";

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
      <aside className={`sidebar ${isSidebarCollapsed ? "collapsed" : ""}`}>
        <div className="sidebar-header">
          <span className="sidebar-title">iDENTify</span>
        </div>
        <button className="toggle-btn" onClick={toggleSidebar}>
          {isSidebarCollapsed ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          )}
        </button>
        <nav>
          <NavLink to="/app" end>
            <img src={DashboardIcon} alt="Dashboard" />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/app/appointments">
            <img src={AppointmentIcon} alt="Appointments" />
            <span>Appointments</span>
          </NavLink>
          <NavLink to="/app/queue">
            <img src={QueueIcon} alt="Queue" />
            <span>Queue</span>
          </NavLink>
          <NavLink to="/app/reports">
            <img src={ReportIcon} alt="Reports" />
            <span>Reports</span>
          </NavLink>
          <NavLink to="/app/dentists">
            <img src={DentistIcon} alt="Dentists" />
            <span>Dentists</span>
          </NavLink>
        </nav>
        <button onClick={handleLogout} className="logout-btn">
          <img src={LogoutIcon} alt="Logout" />
          <span>Logout</span>
        </button>
      </aside>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}


export default AppLayout;
