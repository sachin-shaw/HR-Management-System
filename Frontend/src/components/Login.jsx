// src/components/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";
import dashboardImage from "../assets/Rectangle77.png";
import axios from "axios"; // Import the configured axios

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth(); // Access login function from context
  const navigate = useNavigate(); // For redirecting after login

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/v1/auth/login`,
        formData
      ); // Use relative URL
      const { user, token } = response.data;

      // Call login function from context to update auth state
      login(user, token);

      // Redirect to dashboard after successful login
      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed", err.response?.data || err.message);
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="left-section">
        <div className="logo-container">
          <div className="logo-placeholder"></div>
          <span>LOGO</span>
        </div>
        <div className="dashboard-preview">
          <img
            src={dashboardImage}
            alt="Dashboard Preview"
            className="dashboard-image"
          />
        </div>
        <div className="text-content">
          <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h2>
          <p>
            Tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam.
          </p>
          <div className="pagination">
            <span className="dot active"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
      </div>
      <div className="right-section">
        <div className="welcome-container">
          <h1>Welcome to Dashboard</h1>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address*</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email Address"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password*</label>
              <div className="password-input">
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
                <button type="button" className="toggle-password">
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="currentColor"
                  >
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"></path>
                  </svg>
                </button>
              </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="form-actions">
              <a href="#" className="forgot-password">
                Forgot password?
              </a>
              <button type="submit" className="login-button" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>
          <div className="register-link">
            Don't have an account?{" "}
            <a href="/register" className="register-button">
              Register
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
