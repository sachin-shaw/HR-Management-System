import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import useAuth hook
import "./Sidebar.css";

function Sidebar() {
  const { logout } = useAuth(); // Access logout function from context
  const navigate = useNavigate(); // For redirecting after logout

  const handleLogout = () => {
    logout(); // Call logout function from context
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <aside className="sidebar">
      <div className="logo-container">
        <div className="logo-placeholder"></div>
        <span>LOGO</span>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search" />
      </div>
      <nav className="main-navigation">
        <ul>
          <li>
            <a href="#">Recruitment</a>
          </li>
          <li className="active">
            <a href="#">Candidates</a>
          </li>
          <li>
            <a href="#">Organization</a>
          </li>
          <li>
            <a href="#">Employees</a>
          </li>
          <li>
            <a href="#">Attendance</a>
          </li>
          <li>
            <a href="#">Leaves</a>
          </li>
        </ul>
      </nav>
      <nav className="other-navigation">
        <ul>
          <li>
            <a href="#" onClick={handleLogout}>
              Logout
            </a>{" "}
            {/* Add onClick handler */}
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
