import React from "react";
import "../styles/pages/Dashboard.css";
import WeeklyBarChart from "../components/WeeklyBarChart.jsx";
import { clinicStats } from "../data/clinicData";
import { defaultDentists } from "../data/dentistsData";

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

  const dentistsWithStatus = defaultDentists.map((dentist) => ({
    ...dentist,
    status: ["Available", "With patient", "On break"][
      Math.floor(Math.random() * 3)
    ],
  }));

  const completedAppointments = todayAppointments.filter(
    (appt) => appt.name
  ).length;
  const totalAppointments = todayAppointments.length;
  const clinicLoad = (completedAppointments / totalAppointments) * 100;

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h2 className="dashboard-title">Dashboard</h2>
        <div className="top-row">
          <p className="dashboard-date">Friday, November 282, 2025</p>
          <div className="dashboard-search-box">
            <span className="dashboard-search-icon">🔍</span>
            <input
              className="dashboard-search-input"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-section">
          <h3 className="dashboard-subtitle">Patients Currently in Clinic</h3>
          <div className="clinic-stats">
            <div className="stat-item">
              <span className="stat-value">{clinicStats.checkedIn}</span>
              <span className="stat-label">Checked-in</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{clinicStats.waiting}</span>
              <span className="stat-label">Waiting</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{clinicStats.inTreatment}</span>
              <span className="stat-label">In Treatment</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{clinicStats.completed}</span>
              <span className="stat-label">Completed</span>
            </div>
          </div>
        </div>

        <div className="dashboard-section">
          <h3 className="dashboard-subtitle">Clinic Load</h3>
          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${clinicLoad}%` }}
            ></div>
          </div>
          <p className="progress-label">{`${Math.round(
            clinicLoad
          )}% of appointments processed`}</p>
        </div>

        <div className="dashboard-section">
          <h3 className="dashboard-subtitle">Dentist Utilization</h3>
          <ul className="dentist-utilization-list">
            {dentistsWithStatus.map((dentist) => (
              <li key={dentist.name} className="dentist-utilization-item">
                <span
                  className={`status-dot ${dentist.status
                    .toLowerCase()
                    .replace(" ", "-")}`}
                ></span>
                <span>{dentist.name}</span>
                <span className="dentist-status">{dentist.status}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="dashboard-section">
          <h3 className="dashboard-subtitle">Quick Actions</h3>
          <div className="quick-actions">
            <button className="quick-action-btn">Add Walk-In Patient</button>
            <button className="quick-action-btn">Add Appointment</button>
            <button className="quick-action-btn">Open Queue</button>
            <button className="quick-action-btn">View Today’s Summary</button>
          </div>
        </div>

        <div className="dashboard-section full-width">
          <h3 className="dashboard-subtitle">Today's Appointments</h3>
          <ul className="dashboard-appointments-list">
            {todayAppointments.map((appt, i) => (
              <li key={i} className="dashboard-appointment-item">
                <span className="dashboard-appointment-time">{appt.time}</span>
                <span className="dashboard-appointment-name">{appt.name}</span>
                <span className="dashboard-appointment-desc">{appt.desc}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="dashboard-section full-width">
          <h3 className="dashboard-subtitle">Last 7 Days</h3>
          <WeeklyBarChart />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;