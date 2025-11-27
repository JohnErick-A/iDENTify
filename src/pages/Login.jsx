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
        <h1 className="login-visual__title">Welcome to iDENTify</h1>
        <p className="login-visual__subtitle">
          Streamlined records, clinical clarity, and a smoother experience for
          every patient visit.
        </p>

        <div className="login-visual__info">
          <div className="info-item">
            <span className="info-label">Reliability</span>
            <strong>99.9%</strong>
          </div>
          <div className="info-item">
            <span className="info-label">Practices</span>
            <strong>1,200+</strong>
          </div>
          <div className="info-item">
            <span className="info-label">Support</span>
            <strong>24/7</strong>
          </div>
        </div>

        <div className="login-logo-card">
          <div className="logo-circle">
            <img src={toothLogo} alt="iDENTify Logo" className="login-logo" />
          </div>
          <div className="logo-copy">
            <p className="logo-tagline">Precision dentistry, simplified.</p>
            <span className="logo-meta">Secure • Scalable • Smart</span>
          </div>
        </div>
      </div>

      <div className="login-panel">
        <div className="login-card">
          <div className="login-card__header">
            <div>
              <p className="eyebrow">Access your workspace</p>
              <h2>Sign in to continue</h2>
            </div>
            <span className="status-badge">Live</span>
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

          <div className="login-footer">
            <p>New to iDENTify?</p>
            <button type="button" className="ghost-btn">
              Create an account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
