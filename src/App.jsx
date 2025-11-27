// src/App.jsx
import React, { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Login from "./pages/Login.jsx";
import AppLayout from "./layout/AppLayout.jsx";

import Dashboard from "./pages/Dashboard.jsx";
import Appointments from "./pages/Appointments.jsx";
import Queue from "./pages/Queue.jsx";
import Reports from "./pages/Reports.jsx";
import Dentists from "./pages/Dentists.jsx";
import PatientForm from "./pages/PatientForm.jsx";

function ProtectedRoute({ isLoggedIn, children }) {
  const location = useLocation();
  if (!isLoggedIn) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }
  return children;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Routes>
      {/* LOGIN PAGE */}
      <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

      {/* MAIN APP LAYOUT (SIDEBAR + CONTENT) */}
      <Route
        path="/app"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <AppLayout setIsLoggedIn={setIsLoggedIn} />
          </ProtectedRoute>
        }
      >
        {/* DEFAULT PAGE → DASHBOARD */}
        <Route index element={<Dashboard />} />

        {/* APP PAGES */}
        <Route path="appointments" element={<Appointments />} />
        <Route path="queue" element={<Queue />} />
        <Route path="reports" element={<Reports />} />
        <Route path="dentists" element={<Dentists />} />

        {/* PATIENT FORM PAGE */}
        <Route path="patient/:id" element={<PatientForm />} />
      </Route>

      {/* ANYTHING ELSE → LOGIN */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
