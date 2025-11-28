import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/pages/Appointments.css";
import EditAppointmentModal from "../components/EditAppointmentModal";

const initialAppointments = [
  {
    id: 1,
    timeStart: "07:00 AM",
    timeEnd: "07:45 AM",
    patient: "Hernane Santos",
    dentist: "Dr. Hernane Benedicto",
    status: "Done",
    procedure: "Cleaning",
    notes: "Bring old X-ray",
    contact: {
      phone: "+63 917 211 2278",
      email: "hernane.santos@example.com",
      birthday: "1990-05-12",
      address: "Pasonanca Rd, Zamboanga City",
    },
  },
  {
    id: 2,
    timeStart: "08:00 AM",
    timeEnd: "08:30 AM",
    patient: "Erica Villas",
    dentist: "Dr. Hernane Benedicto",
    status: "Checked-In",
    procedure: "Filling",
    notes: "Returning patient",
    contact: {
      phone: "+63 918 340 1002",
      email: "erica.villas@example.com",
      birthday: "1987-02-08",
      address: "Gov. Camins Ave, Zamboanga City",
    },
  },
  {
    id: 3,
    timeStart: "09:00 AM",
    timeEnd: "09:45 AM",
    patient: "Paul Rico",
    dentist: "Dr. Paul Zaragoza",
    status: "Waiting",
    procedure: "Root Canal",
    notes: "Special needs: wheelchair",
    contact: {
      phone: "+63 917 882 9980",
      email: "paul.rico@example.com",
      birthday: "1975-11-30",
      address: "Valderrosa St, Zamboanga City",
    },
  },
  {
    id: 4,
    timeStart: "09:30 AM",
    timeEnd: "10:00 AM",
    patient: "Erick Diaz",
    dentist: "Dr. Paul Zaragoza",
    status: "Treatment",
    procedure: "Check-up",
    notes: "Prefers morning slots",
    contact: {
      phone: "+63 919 991 3377",
      email: "erick.diaz@example.com",
      birthday: "1995-03-22",
      address: "Tetuan, Zamboanga City",
    },
  },
  {
    id: 5,
    timeStart: "10:15 AM",
    timeEnd: "11:00 AM",
    patient: "Lisa Franklin",
    dentist: "Dr. Paul Zaragoza",
    status: "For X-ray",
    procedure: "Whitening",
    notes: "Bring old X-ray",
    contact: {
      phone: "+63 927 762 9001",
      email: "lisa.franklin@example.com",
      birthday: "1993-07-19",
      address: "San Jose Rd, Zamboanga City",
    },
  },
  {
    id: 6,
    timeStart: "10:45 AM",
    timeEnd: "11:30 AM",
    patient: "Jamal Hines",
    dentist: "Dr. Erica Aquino",
    status: "Returning from X-ray",
    procedure: "Extraction",
    notes: "Returning patient",
    contact: {
      phone: "+63 928 672 3440",
      email: "jamal.hines@example.com",
      birthday: "1988-09-14",
      address: "Canelar Moret, Zamboanga City",
    },
  },
  {
    id: 7,
    timeStart: "01:00 PM",
    timeEnd: "01:30 PM",
    patient: "Nina Jacobs",
    dentist: "Dr. Erica Aquino",
    status: "Payment / Billing",
    procedure: "Cleaning",
    notes: "Special needs",
    contact: {
      phone: "+63 926 455 6211",
      email: "nina.jacobs@example.com",
      birthday: "2000-01-10",
      address: "Sta. Maria, Zamboanga City",
    },
  },
  {
    id: 8,
    timeStart: "01:15 PM",
    timeEnd: "02:00 PM",
    patient: "Marcus Cole",
    dentist: "Dr. Paul Zaragoza",
    status: "No-Show",
    procedure: "Crown",
    notes: "Bring insurance card",
    contact: {
      phone: "+63 917 403 2201",
      email: "marcus.cole@example.com",
      birthday: "1982-12-01",
      address: "Putik, Zamboanga City",
    },
  },
  {
    id: 9,
    timeStart: "03:00 PM",
    timeEnd: "03:45 PM",
    patient: "Tara Smith",
    dentist: "Dr. Hernane Benedicto",
    status: "Cancelled",
    procedure: "Check-up",
    notes: "Prefers text updates",
    contact: {
      phone: "+63 925 332 1809",
      email: "tara.smith@example.com",
      birthday: "1999-12-19",
      address: "Baliwasan, Zamboanga City",
    },
  },
];

function toMinutes(timeString) {
  const [time, meridiem] = timeString.split(" ");
  const [hourStr, minuteStr] = time.split(":");
  let hour = Number(hourStr);
  const minute = Number(minuteStr);
  if (meridiem === "PM" && hour !== 12) hour += 12;
  if (meridiem === "AM" && hour === 12) hour = 0;
  return hour * 60 + minute;
}

function Appointments() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState(initialAppointments);
  const [search, setSearch] = useState("");
  const [activeContactId, setActiveContactId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [filters, setFilters] = useState({
    dentist: "all",
    status: "all",
    procedure: "all",
    time: "all",
  });

  const dentists = useMemo(
    () => Array.from(new Set(appointments.map((a) => a.dentist))),
    [appointments]
  );

  const procedures = useMemo(
    () => Array.from(new Set(appointments.map((a) => a.procedure))),
    [appointments]
  );

  const conflicts = useMemo(() => {
    const dentistMap = new Map();

    appointments.forEach((appt) => {
      const start = toMinutes(appt.timeStart);
      const end = toMinutes(appt.timeEnd);
      const existing = dentistMap.get(appt.dentist) || [];
      existing.push({ ...appt, start, end });
      dentistMap.set(appt.dentist, existing);
    });

    const conflictMessages = [];
    dentistMap.forEach((list) => {
      list.sort((a, b) => a.start - b.start);
      for (let i = 0; i < list.length; i += 1) {
        for (let j = i + 1; j < list.length; j += 1) {
          const first = list[i];
          const second = list[j];
          if (second.start < first.end && second.end > first.start) {
            conflictMessages.push({
              id: `${first.id}-${second.id}`,
              message: `${first.dentist}: ${first.patient} (${first.timeStart}-${first.timeEnd}) overlaps with ${second.patient} (${second.timeStart}-${second.timeEnd})`,
            });
          }
        }
      }
    });

    return conflictMessages;
  }, [appointments]);

  const filteredAppointments = useMemo(() => {
    return appointments.filter((appt) => {
      const searchMatch = [
        appt.patient,
        appt.dentist,
        appt.status,
        appt.procedure,
        appt.notes,
      ]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

      const dentistMatch =
        filters.dentist === "all" || appt.dentist === filters.dentist;
      const statusMatch =
        filters.status === "all" || appt.status === filters.status;
      const procedureMatch =
        filters.procedure === "all" || appt.procedure === filters.procedure;

      let timeMatch = true;
      const startMinutes = toMinutes(appt.timeStart);
      if (filters.time === "morning") timeMatch = startMinutes < 12 * 60;
      if (filters.time === "afternoon")
        timeMatch = startMinutes >= 12 * 60 && startMinutes < 17 * 60;
      if (filters.time === "evening") timeMatch = startMinutes >= 17 * 60;

      return (
        searchMatch &&
        dentistMatch &&
        statusMatch &&
        procedureMatch &&
        timeMatch
      );
    });
  }, [
    appointments,
    filters.dentist,
    filters.procedure,
    filters.status,
    filters.time,
    search,
  ]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleEdit = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedAppointment(null);
    setIsModalOpen(false);
  };

  const handleSaveAppointment = (updatedAppointment) => {
    const updatedAppointments = appointments.map((a) =>
      a.id === updatedAppointment.id ? updatedAppointment : a
    );
    setAppointments(updatedAppointments);
    handleCloseModal();
  };

  const handleReschedule = () => {
    navigate("/app/appointments");
  };

  return (
    <div className="appointments-page">
      <div className="appointments-header">
        <h2 className="appointments-title">Appointments</h2>
        <div className="appointments-search">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="appointments-filters">
        <div className="filter-group">
          <label htmlFor="dentist-select">Dentist</label>
          <select
            id="dentist-select"
            value={filters.dentist}
            onChange={(e) => handleFilterChange("dentist", e.target.value)}
          >
            <option value="all">All</option>
            {dentists.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="status-select">Status</label>
          <select
            id="status-select"
            value={filters.status}
            onChange={(e) => handleFilterChange("status", e.target.value)}
          >
            <option value="all">All</option>
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
        </div>

        <div className="filter-group">
          <label htmlFor="procedure-select">Procedure</label>
          <select
            id="procedure-select"
            value={filters.procedure}
            onChange={(e) => handleFilterChange("procedure", e.target.value)}
          >
            <option value="all">All</option>
            {procedures.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="time-select">Time</label>
          <select
            id="time-select"
            value={filters.time}
            onChange={(e) => handleFilterChange("time", e.target.value)}
          >
            <option value="all">All</option>
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
          </select>
        </div>
      </div>

      {conflicts.length > 0 && (
        <div className="conflict-alert">
          <div className="conflict-icon">⚠️</div>
          <div>
            <p className="conflict-title">Overlapping appointments detected:</p>
            <ul>
              {conflicts.map((conflict) => (
                <li key={conflict.id}>
                  {conflict.message}
                  <button
                    onClick={handleReschedule}
                    className="reschedule-btn"
                  >
                    Reschedule
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="appointments-table-container">
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Patient</th>
              <th>Dentist</th>
              <th>Procedure</th>
              <th>Status</th>
              <th>Notes</th>
              <th>Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((a) => (
              <tr key={a.id}>
                <td className="time-cell">
                  <div>{a.timeStart}</div>
                  <span className="time-end">{a.timeEnd}</span>
                </td>
                <td>{a.patient}</td>
                <td>{a.dentist}</td>
                <td>
                  <span className="badge badge-neutral">{a.procedure}</span>
                </td>
                <td>
                  <span className={`badge badge-${a.status.toLowerCase()}`}>
                    {a.status}
                  </span>
                </td>
                <td>
                  <div className="notes-pill">{a.notes}</div>
                </td>
                <td className="contact-cell">
                  <button
                    type="button"
                    className="contact-button"
                    aria-label={`View contact for ${a.patient}`}
                    onClick={() =>
                      setActiveContactId((prev) =>
                        prev === a.id ? null : a.id
                      )
                    }
                  >
                    📇
                  </button>
                  {activeContactId === a.id && (
                    <div className="contact-popover">
                      <p>
                        <strong>Phone:</strong> {a.contact.phone}
                      </p>
                      <p>
                        <strong>Email:</strong> {a.contact.email}
                      </p>
                      <p>
                        <strong>Birthday:</strong> {a.contact.birthday}
                      </p>
                      <p>
                        <strong>Address:</strong> {a.contact.address}
                      </p>
                    </div>
                  )}
                </td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(a)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <EditAppointmentModal
          appointment={selectedAppointment}
          onSave={handleSaveAppointment}
          onCancel={handleCloseModal}
          dentists={dentists}
        />
      )}
    </div>
  );
}

export default Appointments;