import React, { useState } from "react";
import "./Login.css"; // Reusing same styles for layout
import dashboardImage from "../assets/Rectangle77.png";
import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Client-side password match check
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "https://psquare-assessment.onrender.com/api/v1/auth/register",
        {
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
        }
      );

      console.log("Registration successful", response.data);
      // Handle redirect or success notification
      navigate("/login");
    } catch (err) {
      console.error("Registration failed", err.response?.data || err.message);
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
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
          <h2>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod
          </h2>
          <p>
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
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
          <h1>Create an Account</h1>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullName">Full Name*</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Full Name"
                required
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
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
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password*</label>
              <div className="password-input">
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="form-actions">
              <button type="submit" className="login-button" disabled={loading}>
                {loading ? "Registering..." : "Register"}
              </button>
            </div>
          </form>
          <div className="register-link">
            Already have an account?{" "}
            <a href="#" className="register-button">
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
