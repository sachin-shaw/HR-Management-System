import React from "react";
import { useAuth } from "../../context/AuthContext"; // Import useAuth hook
import "./UserProfile.css";

function UserProfile() {
  const { auth } = useAuth(); // Access the auth state from context

  return (
    <div className="user-profile">
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M12 4a4 4 0 014 4..." />
      </svg>
      <span>{auth?.user?.name || "Guest"}</span>{" "}
      {/* Display user name or "Guest" if no user is logged in */}
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M7 10l5 5 5-5z" />
      </svg>
    </div>
  );
}

export default UserProfile;
