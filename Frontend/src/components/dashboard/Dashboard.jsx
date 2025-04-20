import React, { useState } from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import CandidateTable from "../candidates/CandidateTable";
import EmployeeTable from "../employees/EmployeeTable";
import AttendanceTable from "../attendance/AttendanceTable";
import UserProfile from "../layout/UserProfile";
import NotificationButton from "../layout/NotificationButton";
import AddCandidateModal from "../candidates/AddCandidateModal";

import "./Dashboard.css";

function Dashboard() {
  const [currentTable, setCurrentTable] = useState("candidates");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // ✅ searchTerm state
  const [refreshCandidates, setRefreshCandidates] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleCandidateAdded = () => {
    setRefreshCandidates((prev) => !prev); // toggle to trigger refresh
    closeModal(); // close modal
  };

  return (
    <div className="dashboard-container">
      <Sidebar setCurrentTable={setCurrentTable} />
      <main className="main-content">
        <Header
          currentPage={currentTable}
          openModal={openModal}
          closeModal={closeModal}
          isModalOpen={isModalOpen}
          searchTerm={searchTerm} // ✅ pass searchTerm
          setSearchTerm={setSearchTerm} // ✅ pass setter
        />
        <div className="content-body">
          {currentTable === "candidates" && (
            <CandidateTable
              searchTerm={searchTerm}
              refreshFlag={refreshCandidates}
            />
          )}
          <AddCandidateModal
            isOpen={isModalOpen}
            onClose={closeModal}
            onCandidateAdded={handleCandidateAdded} // ✅ pass handler
          />
          {currentTable === "employees" && (
            <EmployeeTable searchTerm={searchTerm} />
          )}
          {currentTable === "attendance" && (
            <AttendanceTable searchTerm={searchTerm} />
          )}
        </div>
      </main>
      <UserProfile />
      <NotificationButton />
    </div>
  );
}

export default Dashboard;
