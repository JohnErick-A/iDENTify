import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./../App.css";

const dentists = [
  {
    name: "Dr. Paul Zaragoza",
    specialization: "Orthodontics",
    days: [1, 3, 5], // Mon, Wed, Fri
  },
  {
    name: "Dr. Hernane Chu",
    specialization: "Endodontics",
    days: [2, 4], // Tue, Thu
  },
  {
    name: "Dr. Benedicto",
    specialization: "General Dentistry",
    days: [1, 2, 3, 4, 5], // Weekdays
  },
];

function Dentists() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const dayIndex = selectedDate.getDay(); // 0 = Sun ... 6 = Sat

  const availableDentists = dentists.filter((d) =>
    d.days.includes(dayIndex)
  );

  return (
    <div className="content-card">
      <h2 className="patients-header">Dentist Availability</h2>

      <div className="dentist-calendar-row">
        <div>
          <p className="small-label">Select Date</p>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            className="datepicker-input"
          />
        </div>
      </div>

      <table className="patients-table">
        <thead>
          <tr>
            <th>Dentist</th>
            <th>Specialization</th>
            <th>Available?</th>
          </tr>
        </thead>
        <tbody>
          {dentists.map((d, idx) => {
            const isAvailable = d.days.includes(dayIndex);
            return (
              <tr key={idx}>
                <td>{d.name}</td>
                <td>{d.specialization}</td>
                <td style={{ color: isAvailable ? "green" : "red" }}>
                  {isAvailable ? "Available" : "Not Available"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Dentists;

