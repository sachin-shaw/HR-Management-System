import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import CandidateTable from "./CandidateTable";
import UserProfile from "./UserProfile";
import NotificationButton from "./NotificationButton";
import "./Dashboard.css";

function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true); // Open the modal when button is clicked
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content">
        <Header
          openModal={openModal}
          closeModal={closeModal}
          isModalOpen={isModalOpen}
        />
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
