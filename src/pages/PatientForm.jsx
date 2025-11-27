// src/pages/PatientForm.jsx
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./../App.css";

function PatientForm() {
  const navigate = useNavigate();
  const { id } = useParams(); // ready for dynamic data later


  const [boxMarks, setBoxMarks] = useState(Array(64).fill(""));

  // Circles: shade only, no letters
  const [circleShades, setCircleShades] = useState(Array(52).fill(false));

  const [selected, setSelected] = useState({
    kind: null, // "box"
    index: null,
    boxKind: null, // "treatment" | "condition"
  });

  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // vital signs
  const [vitals, setVitals] = useState({
    bp: "",
    pulse: "",
    temp: "",
  });

  const updateVitals = (field, value) => {
    setVitals((prev) => ({ ...prev, [field]: value }));
  };

  // ---------------- OPTIONS ----------------
  const treatmentOptions = [
    { code: "FV", label: "Fluoride Varnish" },
    { code: "FG", label: "Fluoride Gel" },
    { code: "PFS", label: "Pit and Fissure Sealant" },
    { code: "PF", label: "Permanent Filling" },
    { code: "TF", label: "Temporary Filling" },
    { code: "X", label: "Extraction" },
    { code: "O", label: "Others" },
    { code: "", label: "Clear (no mark)" },
  ];

  const conditionOptions = [
    { code: "S", label: "Sealed" },
    { code: "UN", label: "Unerupted" },
    { code: "D", label: "Decayed" },
    { code: "F", label: "Filled" },
    { code: "M", label: "Missing" },
    { code: "JC", label: "Jacket Crown" },
    { code: "P", label: "Pontic" },
    { code: "DX", label: "For Extraction" },
    { code: "", label: "Clear (no mark)" },
  ];

  // Tooth numbers for the circles
  const upperConditionRows = [
    ["55", "54", "53", "52", "51", "61", "62", "63", "64", "65"], // 10
    [
      "18",
      "17",
      "16",
      "15",
      "14",
      "13",
      "12",
      "11",
      "21",
      "22",
      "23",
      "24",
      "25",
      "26",
      "27",
      "28",
    ], // 16
  ];
  const lowerConditionRows = [
    [
      "48",
      "47",
      "46",
      "45",
      "44",
      "43",
      "42",
      "41",
      "31",
      "32",
      "33",
      "34",
      "35",
      "36",
      "37",
      "38",
    ], // 16
    ["85", "84", "83", "82", "81", "71", "72", "73", "74", "75"], // 10
  ];

  // ---------------- HELPERS ----------------

  // Decide if a box index is TREATMENT or CONDITION
  const getBoxKind = (idx) => {
    const row = Math.floor(idx / 16); // 0..3
    if (row === 0 || row === 3) return "treatment"; // top row & very bottom row
    return "condition"; // middle two rows
  };

  const handleBoxClick = (idx) => {
    const boxKind = getBoxKind(idx);
    setSelected({
      kind: "box",
      index: idx,
      boxKind,
    });
    setIsPanelOpen(true);
  };

  const toggleCircleShade = (idx) => {
    setCircleShades((prev) =>
      prev.map((v, i) => (i === idx ? !v : v))
    );
  };

  const closePanel = () => {
    setIsPanelOpen(false);
    setSelected({
      kind: null,
      index: null,
      boxKind: null,
    });
  };

  const applyCode = (code) => {
    if (selected.kind === "box" && selected.index != null) {
      setBoxMarks((prev) =>
        prev.map((v, i) => (i === selected.index ? code : v))
      );
    }
    closePanel();
  };

  const handleDone = () => {
    navigate("/app/queue");
  };

  // RENDER a row of 16 boxes
  const renderBoxRow = (rowIndex) => {
    const start = rowIndex * 16; // 0,16,32,48
    return (
      <div className="tc-box-row">
        {Array.from({ length: 16 }).map((_, i) => {
          const idx = start + i;
          const mark = boxMarks[idx];
          const isSelected =
            selected.kind === "box" && selected.index === idx;

          return (
            <button
              key={idx}
              className={
                "tc-box-cell" +
                (mark ? " tc-has-mark" : "") +
                (isSelected ? " tc-selected" : "")
              }
              onClick={() => handleBoxClick(idx)}
            >
              {mark}
            </button>
          );
        })}
      </div>
    );
  };

  // RENDER circles group (upper or lower arch)
  const renderCircleGroup = (rows, startIndex) => {
    let runningIndex = startIndex;

    return rows.map((rowNumbers, rowIdx) => (
      <div className="tc-circle-row" key={rowIdx}>
        {rowNumbers.map((num) => {
          const idx = runningIndex;
          runningIndex += 1;

          const shaded = circleShades[idx];

          return (
            <button
              key={num}
              className={
                "tc-circle-unit" + (shaded ? " tc-has-mark" : "")
              }
              onClick={() => toggleCircleShade(idx)}
            >
              <div className="tc-circle">{/* no letters, just shade */}</div>
              <span className="tc-number">{num}</span>
            </button>
          );
        })}
      </div>
    ));
  };

  const panelTitle =
    selected.boxKind === "treatment"
      ? "Treatment"
      : selected.boxKind === "condition"
      ? "Condition"
      : "Legend";

  const panelOptions =
    selected.boxKind === "treatment"
      ? treatmentOptions
      : selected.boxKind === "condition"
      ? conditionOptions
      : [];

  return (
    <div className="patient-form-page">
      <div className="patient-form-grid">
        
        {/* Patient Details */}
        <section className="patient-details-card">
          <h3 className="section-title">Patient Details</h3>
          <div className="patient-details-box">
            <p>
              <strong>Name:</strong> Hernane Benedicto
            </p>
            <p>
              <strong>Age:</strong> 20
            </p>
            <p>
              <strong>Sex:</strong> Male
            </p>
            <p>
              <strong>Birthdate:</strong> mm/dd/yyyy
            </p>
            <p>
              <strong>#Number:</strong> 0000-0000-0000
            </p>
            <p>
              <strong>Address:</strong> -----------
            </p>
          </div>
        </section>

        {/* Dentist + Vital signs */}
        <section className="dentist-details-card">
          <div className="dentist-row">
            <div>
              <h3 className="section-title">Dentist</h3>
              <select className="dentist-select">
                <option>Select a Dentist</option>
                <option>Dr. Paul Zaragoza</option>
                <option>Dr. Hernane Chu</option>
                <option>Dr. Benedicto</option>
              </select>
            </div>

            <div className="vital-signs">
              <h3 className="section-title">Vital Signs</h3>

              <div className="vital-row">
                <div className="vital-field">
                  <label>Blood Pressure</label>
                  <input
                    className="pill-input-input"
                    placeholder="120/80"
                    value={vitals.bp}
                    onChange={(e) => updateVitals("bp", e.target.value)}
                  />
                </div>
                <div className="vital-field">
                  <label>Pulse Rate</label>
                  <input
                    className="pill-input-input"
                    placeholder="72 bpm"
                    value={vitals.pulse}
                    onChange={(e) =>
                      updateVitals("pulse", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="vital-row">
                <div className="vital-field">
                  <label>Temperature</label>
                  <input
                    className="pill-input-input"
                    placeholder="36.8 °C"
                    value={vitals.temp}
                    onChange={(e) =>
                      updateVitals("temp", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ORAL HEALTH CONDITION */}
      <section className="oral-section">
        <h3 className="section-title">Oral Health Condition</h3>

        <div className="tooth-chart-container">
          <div className="tooth-inner-panel">
            {/* TOP LAYER: Row 0 = TREATMENT, Row 1 = CONDITION */}
            <div className="tc-group">
              <div className="tc-row-header">
                Top Layer (Treatment / Condition)
              </div>
              {/* Row 0: Treatment */}
              {renderBoxRow(0)}
              {/* Row 1: Condition */}
              {renderBoxRow(1)}
            </div>

            {/* MIDDLE: Circles (shade only) */}
            <div className="tc-group">
              <div className="tc-row-header">Condition (Circles only)</div>
              {/* upper arch circles, indices 0–25 */}
              {renderCircleGroup(upperConditionRows, 0)}
              {/* lower arch circles, indices 26–51 */}
              {renderCircleGroup(lowerConditionRows, 26)}
            </div>

            {/* BOTTOM LAYER: Row 2 = CONDITION, Row 3 = TREATMENT */}
            <div className="tc-group">
              <div className="tc-row-header">
                Bottom Layer (Condition / Treatment)
              </div>
              {/* Row 2: Condition */}
              {renderBoxRow(2)}
              {/* Row 3: Treatment */}
              {renderBoxRow(3)}
              <div className="tc-small-hint">
                Click any box to select a code, or click a circle to shade it.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Attachment */}
      <section className="attachment-section">
        <h3 className="section-title">Attachment</h3>

        <div className="attachment-box">
          <div className="attachment-header">Upload image or document</div>
          <div className="attachment-body">Click to Upload</div>
        </div>
      </section>

      {/* Done button */}
      <div className="done-row">
        <button className="done-btn" onClick={handleDone}>
          Done
        </button>
      </div>

      {/* SIDE PANEL: Treatment / Condition legend */}
      <div
        className={
          "side-panel-backdrop" + (isPanelOpen ? " side-panel-open" : "")
        }
        onClick={closePanel}
      >
        <div
          className="side-panel"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="section-title">{panelTitle}</h3>

          <div className="side-panel-content">
            {panelOptions.length === 0 ? (
              <p className="placeholder-text">
                Click a treatment or condition box to choose a code.
              </p>
            ) : (
              <div className="code-grid">
                {panelOptions.map((opt) => (
                  <button
                    key={opt.label}
                    className="code-option-btn"
                    onClick={() => applyCode(opt.code)}
                  >
                    <span className="code-option-code">
                      {opt.code || "Clear"}
                    </span>
                    <span className="code-option-label">{opt.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="side-panel-close-btn" onClick={closePanel}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default PatientForm;