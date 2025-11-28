import React, { useState } from "react";
import "../styles/components/EditAppointmentModal.css";

function EditAppointmentModal({
  appointment,
  onSave,
  onCancel,
  dentists,
}) {
  const [formData, setFormData] = useState({
    timeStart: appointment.timeStart,
    timeEnd: appointment.timeEnd,
    dentist: appointment.dentist,
    procedure: appointment.procedure,
    notes: appointment.notes,
    addReminder: false,
    isPriority: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = () => {
    onSave({ ...appointment, ...formData });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Appointment</h2>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="timeStart">Time Start</label>
            <input
              type="text"
              id="timeStart"
              name="timeStart"
              value={formData.timeStart}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="timeEnd">Time End</label>
            <input
              type="text"
              id="timeEnd"
              name="timeEnd"
              value={formData.timeEnd}
              onChange={handleChange}
            />
          </div>
          <div className="form-group full-width">
            <label htmlFor="dentist">Dentist</label>
            <select
              id="dentist"
              name="dentist"
              value={formData.dentist}
              onChange={handleChange}
            >
              {dentists.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group full-width">
            <label htmlFor="procedure">Procedure</label>
            <input
              type="text"
              id="procedure"
              name="procedure"
              value={formData.procedure}
              onChange={handleChange}
            />
          </div>
          <div className="form-group full-width">
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
            ></textarea>
          </div>
          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              id="addReminder"
              name="addReminder"
              checked={formData.addReminder}
              onChange={handleChange}
            />
            <label htmlFor="addReminder">Add reminder</label>
          </div>
          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              id="isPriority"
              name="isPriority"
              checked={formData.isPriority}
              onChange={handleChange}
            />
            <label htmlFor="isPriority">Mark priority</label>
          </div>
        </div>
        <div className="modal-actions">
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditAppointmentModal;

