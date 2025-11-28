import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toothLogo from "../assets/toothlogo.svg";
import "../styles/pages/Login.css";

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
        <p className="login-visual__subtitle">Access your dashboard</p>
      </div>

      <div className="login-form-container">
        <form className="login-form" onSubmit={handleLogin}>
          <h2 className="login-form__title">Log in to your account</h2>
          <p className="login-form__subtitle">
            Please enter your email and password
          </p>
          <div className="login-form__group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@email.com"
            />
          </div>
          <div className="login-form__group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <a href="#" className="login-form__forgot">
            Forgot password?
          </a>
          <button type="submit" className="login-form__button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
