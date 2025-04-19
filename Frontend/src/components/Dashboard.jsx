import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import CandidateTable from "./CandidateTable";
import UserProfile from "./UserProfile";
import NotificationButton from "./NotificationButton";
import "./Dashboard.css";
function Dashboard() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content">
        <Header />
        <div className="content-body">
          <CandidateTable />
        </div>
      </main>
      <UserProfile />
      <NotificationButton />
    </div>
  );
}

export default Dashboard;
