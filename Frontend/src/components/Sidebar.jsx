// Sidebar.jsx
import React from "react";
import { useAuth } from "../context/AuthContext";
import "./Sidebar.css";

function Sidebar({ setCurrentTable }) {
  const { logout } = useAuth(); // Access logout function from context

  const handleLogout = () => {
    logout(); // Call logout function from context
  };

  const handleTableSwitch = (table) => {
    setCurrentTable(table); // Update the current table state
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
            <a href="#" onClick={() => handleTableSwitch("recruitment")}>
              Recruitment
            </a>
          </li>
          <li className="active">
            <a href="#" onClick={() => handleTableSwitch("candidates")}>
              Candidates
            </a>
          </li>
          <li>
            <a href="#" onClick={() => handleTableSwitch("organization")}>
              Organization
            </a>
          </li>
          <li>
            <button
              onClick={() => handleTableSwitch("employees")}
              className="nav-button"
            >
              Employees
            </button>
          </li>
          <li>
            <button
              onClick={() => handleTableSwitch("attendance")}
              className="nav-button"
            >
              Attendance
            </button>
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
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
