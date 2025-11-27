import React, { useEffect, useState } from "react";
import "./Appointment.css";

// Reusable appointment component with inline edit and status actions.
// Works standalone (local state) and also calls parent callbacks when provided:
// - onUpdate(updatedAppointment)
// - onStatusChange(nextStatus, updatedAppointment)
export default function Appointment({ appointment = {}, onUpdate, onStatusChange, extraAction, showDefaultActions = true }) {
  const [local, setLocal] = useState({
    id: appointment.id,
    time: appointment.time || "",
    name: appointment.name || "",
    desc: appointment.desc || "",
    status: appointment.status || "scheduled",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ time: local.time, name: local.name, desc: local.desc });

  useEffect(() => {
    setLocal({
      id: appointment.id,
      time: appointment.time || "",
      name: appointment.name || "",
      desc: appointment.desc || "",
      status: appointment.status || "scheduled",
    });
    setForm({ time: appointment.time || "", name: appointment.name || "", desc: appointment.desc || "" });
  }, [appointment]);

  function startEdit() {
    setForm({ time: local.time || "", name: local.name || "", desc: local.desc || "" });
    setIsEditing(true);
  }

  function cancelEdit() {
    setIsEditing(false);
  }

  function saveEdit() {
    const updated = { ...local, ...form };
    setLocal(updated);
    setIsEditing(false);
    if (typeof onUpdate === "function") onUpdate(updated);
  }

  function changeStatus(nextStatus) {
    if (nextStatus === "completed") {
      if (!window.confirm("Mark this appointment as completed?")) return;
    }
    const updated = { ...local, status: nextStatus };
    setLocal(updated);
    if (typeof onStatusChange === "function") onStatusChange(nextStatus, updated);
  }

  return (
    <div className="dash-appointment-item">
      <div className="dash-time">{local.time || "-"}</div>

      <div className="dash-info">
        {isEditing ? (
          <div className="appointment-edit">
            <input
              className="appointment-input"
              value={form.time}
              onChange={(e) => setForm((s) => ({ ...s, time: e.target.value }))}
              placeholder="Time"
            />
            <input
              className="appointment-input"
              value={form.name}
              onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
              placeholder="Patient name"
            />
            <input
              className="appointment-input"
              value={form.desc}
              onChange={(e) => setForm((s) => ({ ...s, desc: e.target.value }))}
              placeholder="Description"
            />
            <div className="appointment-edit-actions">
              <button className="small-btn" onClick={saveEdit}>Save</button>
              <button className="small-btn muted" onClick={cancelEdit}>Cancel</button>
            </div>
          </div>
        ) : (
          <>
            <strong>{local.name || "(empty)"}</strong>
            <p className="dash-desc">{local.desc || "-"}</p>
          </>
        )}
      </div>

      <div className="appointment-actions">
        <span className={`status-badge status-${local.status}`}>{local.status}</span>

        {showDefaultActions && !isEditing && (
          <>
            <button className="small-btn" onClick={startEdit} title="Edit appointment">Edit</button>

            {local.status !== "processing" && (
              <button className="small-btn" onClick={() => changeStatus("processing")}>Processing</button>
            )}

            {local.status !== "completed" ? (
              <button className="small-btn primary" onClick={() => changeStatus("completed")}>Complete</button>
            ) : (
              <button className="small-btn muted" onClick={() => changeStatus("scheduled")}>Undo</button>
            )}
          </>
        )}

        {extraAction ? <div className="appointment-extra">{extraAction}</div> : null}
      </div>
    </div>
  );
}
