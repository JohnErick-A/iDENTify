// src/pages/Queue.jsx
import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/pages/Queue.css";

const averageTreatmentMinutes = 30;
const dentistAvailabilityMinutes = {
  "Dr. Paul Zaragoza": 0,
  "Dr. Erica Aquino": 10,
  "Dr. Hernane Benedicto": 5,
};

function Queue() {
  const navigate = useNavigate();

  const getInitialQueueList = () => {
    try {
      const stored = localStorage.getItem('queueList');
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  };

  const [queueList, setQueueList] = useState(getInitialQueueList() || [
    {
      id: 1,
      number: 1,
      name: "Hernane Benedicto",
      status: "Checked-In",
      assignedDentist: "Dr. Paul Zaragoza",
      notes: "Patient nervous",
      checkedInTime: "2025-11-28T09:00:00.000Z",
    },
    {
      id: 2,
      number: 2,
      name: "Erica",
      status: "Waiting",
      assignedDentist: "",
      notes: "Waiting for parent",
      checkedInTime: "2025-11-28T09:15:00.000Z",
    },
    {
      id: 3,
      number: 3,
      name: "Paul",
      status: "On Chair",
      assignedDentist: "Dr. Erica Aquino",
      notes: "Special instructions",
      checkedInTime: "2025-11-28T09:30:00.000Z",
    },
    {
      id: 4,
      number: 4,
      name: "Mara",
      status: "For X-ray",
      assignedDentist: "",
      notes: "",
      checkedInTime: "2025-11-28T09:45:00.000Z",
    },
    {
      id: 5,
      number: 5,
      name: "Jan",
      status: "Returning from X-ray",
      assignedDentist: "Dr. Hernane Benedicto",
      notes: "Reschedule requested",
      checkedInTime: "2025-11-28T10:00:00.000Z",
    },
    {
      id: 6,
      number: 6,
      name: "John",
      status: "Payment / Billing",
      assignedDentist: "Dr. Hernane Benedicto",
      notes: "New patient",
      checkedInTime: "2025-11-28T10:15:00.000Z",
    },
    {
      id: 7,
      number: 7,
      name: "Jane",
      status: "Done",
      assignedDentist: "Dr. Hernane Benedicto",
      notes: "Follow up in 6 months",
      checkedInTime: "2025-11-28T10:30:00.000Z",
    },
    {
      id: 8,
      number: 8,
      name: "Mike",
      status: "No-Show",
      assignedDentist: "",
      notes: "",
      checkedInTime: "2025-11-28T10:45:00.000Z",
    },
    {
      id: 9,
      number: 9,
      name: "Sara",
      status: "Cancelled",
      assignedDentist: "",
      notes: "Patient called to cancel",
      checkedInTime: "2025-11-28T11:00:00.000Z",
    },

  ]);

  const [draggingId, setDraggingId] = useState(null);

  React.useEffect(() => {
    try {
      localStorage.setItem('queueList', JSON.stringify(queueList));
    } catch (e) {
      // ignore storage errors
    }
  }, [queueList]);

  const calculateWaitingTime = (index, dentist) => {
    const availabilityOffset = dentistAvailabilityMinutes[dentist] || 0;
    const minutes = index * averageTreatmentMinutes + availabilityOffset;
    return minutes <= 0 ? "Now" : `${minutes} min`;
  };

  const handleAction = (id) => {
    const selected = queueList.find((item) => item.id === id);
    if (selected?.assignedDentist) {
      const storedStatuses = JSON.parse(
        localStorage.getItem("dentistStatus") || "{}"
      );
      storedStatuses[selected.assignedDentist] = {
        status: "Busy",
        patient: selected.name,
        patientId: String(selected.id),
        startedAt: new Date().toISOString(),
      };
      localStorage.setItem("dentistStatus", JSON.stringify(storedStatuses));
    }
    navigate(`/app/patient/${id}`);
  };

  const handleAssignDentist = (id, dentist) => {
    setQueueList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, assignedDentist: dentist } : item
      )
    );
  };

  const handleStatusChange = (id, status) => {
    setQueueList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

  const handleStaffNoteChange = (id, note) => {
    setQueueList((prev) => prev.map((item) => (item.id === id ? { ...item, notes: note } : item)));
  };

  const handleDragStart = (id) => setDraggingId(id);
  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (targetId) => {
    if (!draggingId || draggingId === targetId) return;
    setQueueList((prev) => {
      const draggedIndex = prev.findIndex((q) => q.id === draggingId);
      const targetIndex = prev.findIndex((q) => q.id === targetId);
      const updated = [...prev];
      const [removed] = updated.splice(draggedIndex, 1);
      updated.splice(targetIndex, 0, removed);
      return updated.map((item, idx) => ({ ...item, number: idx + 1 }));
    });
    setDraggingId(null);
  };

  const calculateWaitingTimeSince = (checkedInTime) => {
    const now = new Date();
    const checkedIn = new Date(checkedInTime);
    const diff = now - checkedIn;
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return "Just now";
    return `${minutes} min ago`;
  };

  const statusTagClass = (status) =>
    `status-tag status-${status.toLowerCase().replace(/\s+/g, "-")}`;

  const queueWithWait = useMemo(
    () =>
      queueList.map((item, index) => ({
        ...item,
        waitingTime: calculateWaitingTime(index, item.assignedDentist),
      })),
    [queueList]
  );

  return (
    <div className="queue-page">
      <div className="queue-header">
        <h2 className="queue-title">Queue List</h2>
        <div className="queue-legend">
          <span className="status-tag status-overdue">Overdue</span>
          <span className="status-tag status-no-show">No-show</span>
          <span className="status-tag status-cancelled">Cancelled</span>
        </div>
      </div>
      <p className="queue-subtitle">
        Drag to reprioritize emergencies, assign a dentist, and track wait
        estimates.
      </p>

      <div className="queue-table-container">
        <table className="queue-table">
          <thead>
            <tr>
              <th></th>
              <th>#</th>
              <th>Patient</th>
              <th>Status</th>
              <th>Assigned Dentist</th>
              <th>Est. Wait</th>
              <th>Waiting Info</th>
              <th>Notes (staff)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {queueWithWait.map((q) => (
              <tr
                key={q.id}
                className={`queue-row ${
                  draggingId === q.id ? "is-dragging" : ""
                }`}
                draggable
                onDragStart={() => handleDragStart(q.id)}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(q.id)}
              >
                                <td
                                  className="drag-handle"
                                  draggable
                                  onDragStart={() => handleDragStart(q.id)}
                                >
                                  ⋮⋮
                                </td>
                                <td>{q.number.toString().padStart(2, "0")}</td>
                <td>{q.name}</td>
                <td>
                  <select
                    className={statusTagClass(q.status)}
                    value={q.status}
                    onChange={(e) => handleStatusChange(q.id, e.target.value)}
                  >
                    <option value="Checked-In">Checked-In</option>
                    <option value="Waiting">Waiting</option>
                    <option value="On Chair">On Chair</option>
                    <option value="Treatment">Treatment</option>
                    <option value="For X-ray">For X-ray</option>
                    <option value="Returning from X-ray">Returning from X-ray</option>
                    <option value="Payment / Billing">Payment / Billing</option>
                    <option value="Done">Done</option>
                    <option value="No-Show">No-Show</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td>
                  <select
                    className="queue-dentist-select"
                    value={q.assignedDentist}
                    onChange={(e) => handleAssignDentist(q.id, e.target.value)}
                  >
                    <option value="">Assign Dentist</option>
                    <option value="Dr. Paul Zaragoza">Dr. Paul Zaragoza</option>
                    <option value="Dr. Erica Aquino">Dr. Erica Aquino</option>
                    <option value="Dr. Hernane Benedicto">
                      Dr. Hernane Benedicto
                    </option>
                  </select>
                </td>
                <td>
                  <span className="wait-chip">{q.waitingTime}</span>
                </td>
                <td>
                  <div>Checked in: {calculateWaitingTimeSince(q.checkedInTime)}</div>
                </td>
                <td>
                  <textarea
                    className="staff-note-input"
                    placeholder="Add staff notes..."
                    value={q.notes}
                    onChange={(e) => handleStaffNoteChange(q.id, e.target.value)}
                    aria-label={`Staff notes for ${q.name}`}
                  />
                </td>
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
    </div>
  );
}

export default Queue;