import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toothLogo from "../assets/toothlogo.svg";
import "./../App.css";

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email.trim() && password.trim()) {
      setIsLoggedIn(true);
      navigate("/app");
    } else {
      alert("Please enter email and password.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-visual">
        <div className="login-visual__badge">Trusted dental insights</div>
        <div className="login-visual__header">
          <div className="logo-circle">
            <img src={toothLogo} alt="iDENTify Logo" className="login-logo" />
          </div>
          <h1 className="login-visual__title">Welcome to iDENTify</h1>
        </div>
        <p className="login-visual__subtitle">
          Streamlined records, clinical clarity, and a smoother experience for
          every patient visit.
        </p>
      </div>

      <div className="login-panel">
        <div className="login-card">
          <div className="login-card__header">
            <div>
              <p className="eyebrow">Access your workspace</p>
              <h2>Sign in to continue</h2>
            </div>

          </div>

          <form onSubmit={handleLogin} className="signin-form">
            <label>Email or Username</label>
            <input
              type="text"
              placeholder="doctor@practice.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="signin-actions">
              <label className="remember-me">
                <input type="checkbox" /> Keep me signed in
              </label>
              <button type="button" className="text-link">
                Forgot password?
              </button>
            </div>

            <button type="submit" className="signin-btn">
              Continue
            </button>
          </form>


        </div>
      </div>
    </div>
  );
}

export default Login;
