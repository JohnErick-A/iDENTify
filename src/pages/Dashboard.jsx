import React from "react";
import "./../App.css";
import WeeklyBarChart from "../components/WeeklyBarChart.jsx";

function Dashboard() {
  const todayAppointments = [
    { time: "7:00 AM", name: "Hernane Benedicto", desc: "Permanent Filling" },
    { time: "7:30 AM", name: "Erica Aquino", desc: "Extraction" },
    { time: "9:00 AM", name: "Paul Zaragoza", desc: "Check Up" },
    { time: "9:30 AM", name: "John Erich", desc: "Permanent Filling" },
    { time: "10:00 AM", name: "", desc: "" },
    { time: "1:00 PM", name: "", desc: "" },
    { time: "1:30 PM", name: "", desc: "" },
  ];

  return (
    <div className="dashboard-wrapper">

      {/* HEADER */}
      <h1 className="dash-title">Dashboard</h1>

      {/* DATE + SEARCH BAR */}
      <div className="dash-top-row">
        <p className="dash-date">Sunday, November 23, 2025</p>

        <div className="dash-search-box">
          <span className="dash-search-icon">🔍</span>
          <input
            className="dash-search-input"
            placeholder="Search"
            type="text"
          />
        </div>
      </div>

      {/* FILTERS */}
      <div className="dash-filters">
        <button className="dash-filter active">All</button>
        <button className="dash-filter">Today</button>
        <button className="dash-filter">Upcoming</button>
        <button className="dash-filter">Incomplete</button>
        <button className="dash-filter">Completed</button>
      </div>

      <div className="dash-content-row">

        {/* LEFT SIDE – Appointment List */}
        <div className="dash-left-box">
          <h3 className="dash-subtitle">Today's Appointment</h3>

          <div className="dash-appointment-list">
            {todayAppointments.map((a, i) => (
              <div className="dash-appointment-item" key={i}>
                <div className="dash-time">{a.time}</div>
                <div className="dash-info">
                  <strong>{a.name}</strong>
                  <p className="dash-desc">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE – 2x2 Stats Cards */}
        <div className="dash-stats-box">
          <div className="dash-stat-card">
            <h1>05</h1>
            <p>QUEUE NO.</p>
          </div>

          <div className="dash-stat-card">
            <h1>04</h1>
            <p>QUEUEING</p>
          </div>

          <div className="dash-stat-card">
            <h1>04</h1>
            <p>APPOINTMENTS</p>
          </div>

          <div className="dash-stat-card">
            <h1>03</h1>
            <p>COMPLETED</p>
          </div>
        </div>
      </div>

      {/* CHART */}
      <WeeklyBarChart />
    </div>
  );
}

export default Dashboard;