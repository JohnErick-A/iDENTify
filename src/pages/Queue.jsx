// src/pages/Queue.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./../App.css";

function Queue() {
  const navigate = useNavigate();

  const queueList = [
    { id: 1, number: 1, name: "Hernane Benedicto", status: "Completed" },
    { id: 2, number: 2, name: "Erica", status: "Waiting" },
    { id: 3, number: 3, name: "Paul", status: "On Chair" },
  ];

  const handleAction = (id) => {
    // Go to patient form page, e.g. /app/patient/1
    navigate(`/app/patient/${id}`);
  };

  return (
    <div className="content-card">
      <h2 className="patients-header">Queue List</h2>

      <table className="patients-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Patient</th>
            <th>Status</th>
            <th>Action</th> {/* NEW */}
          </tr>
        </thead>
        <tbody>
          {queueList.map((q) => (
            <tr key={q.number}>
              <td>{q.number.toString().padStart(2, "0")}</td>
              <td>{q.name}</td>
              <td>{q.status}</td>
              <td>
                <button
                  className="action-btn"
                  onClick={() => handleAction(q.id)}
                >
                  Start
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Queue;
