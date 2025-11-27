import React from "react";
import "./../App.css";

function Appointments() {
  const appointments = [
    {
      time: "07:00 AM",
      patient: "Hernane",
      dentist: "Dr. Benedicto",
      status: "Completed",
    },
    {
      time: "08:00 AM",
      patient: "Erica",
      dentist: "Dr. Benedicto",
      status: "Completed",
    },
    {
      time: "09:00 AM",
      patient: "Paul",
      dentist: "Dr. Benedicto",
      status: "Cancelled",
    },
    {
      time: "10:00 AM",
      patient: "Erick",
      dentist: "Dr. Benedicto",
      status: "Completed",
    },
  ];

  return (
    <div className="content-card">
      <h2 className="patients-header">Appointments</h2>

      <table className="patients-table">
        <thead>
          <tr>
            <th>Time</th>
            <th>Patient</th>
            <th>Dentist</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((a, idx) => (
            <tr key={idx}>
              <td>{a.time}</td>
              <td>{a.patient}</td>
              <td>{a.dentist}</td>
              <td>{a.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Appointments;
