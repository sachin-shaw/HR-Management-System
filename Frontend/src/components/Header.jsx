import React from "react";
import "./Header.css";
function Header() {
  return (
    <header className="content-header">
      <h1>Candidates</h1>
      <div className="header-actions">
        <div className="filter-group">
          <div className="filter-dropdown">
            <button className="filter-button">
              Status
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="currentColor"
              >
                <path d="M7 10l5 5 5-5z" />
              </svg>
            </button>
          </div>
          <div className="filter-dropdown">
            <button className="filter-button">
              Position
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="currentColor"
              >
                <path d="M7 10l5 5 5-5z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search" />
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M15.5 14h-.79l-.28-.27..." />
          </svg>
        </div>
        <button className="add-candidate-button">
          Add Candidate
          <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
          </svg>
        </button>
      </div>
    </header>
  );
}

export default Header;
