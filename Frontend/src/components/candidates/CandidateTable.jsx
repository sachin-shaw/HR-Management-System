import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CandidateTable.css";

function CandidateTable({ searchTerm, refreshFlag }) {
  const [candidates, setCandidates] = useState([]);
  const [showDropdown, setShowDropdown] = useState(null); // Track which row's dropdown is open

  const fetchCandidates = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/candidates`
      );
      const data = response.data.data;

      const formatted = data.map((c, index) => ({
        id: (index + 1).toString().padStart(2, "0"),
        _id: c._id,
        name: c.fullName,
        email: c.email,
        phone: c.phone,
        position: c.position,
        status: c.status || "new",
        experience: c.experience?.toString() || "",
        resumeUrl: c.resumeUrl,
      }));

      setCandidates(formatted);
    } catch (error) {
      console.error("Failed to fetch candidates:", error);
    }
  };

  const deleteCandidate = async (candidateId) => {
    try {
      await axios.delete(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/candidates/delete-candidate/${candidateId}`
      );
      fetchCandidates();
    } catch (error) {
      console.error("Failed to delete candidate:", error);
    }
  };

  const handleStatusChange = async (candidate, newStatus) => {
    try {
      if (newStatus === "selected") {
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/employees`, {
          fullName: candidate.name,
          email: candidate.email,
          phone: candidate.phone,
          position: candidate.position,
          experience: candidate.experience,
        });

        await deleteCandidate(candidate._id);
      } else {
        await axios.patch(
          `${import.meta.env.VITE_API_BASE_URL}/candidates/update-status/${
            candidate._id
          }`,
          {
            status: newStatus,
          }
        );
        fetchCandidates();
      }
    } catch (error) {
      console.error("Status update failed:", error);
    }
  };

  const handleDropdownClick = (id) => {
    setShowDropdown(showDropdown === id ? null : id); // Toggle the dropdown for the clicked row
  };

  useEffect(() => {
    fetchCandidates();
  }, [refreshFlag]);

  const filteredCandidates = candidates.filter(
    (candidate) =>
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>Sr no.</th>
          <th>Candidates Name</th>
          <th>Email Address</th>
          <th>Phone Number</th>
          <th>Position</th>
          <th>Status</th>
          <th>Experience</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {filteredCandidates.length === 0 ? (
          <tr>
            <td colSpan="8" style={{ textAlign: "center" }}>
              No candidates found.
            </td>
          </tr>
        ) : (
          filteredCandidates.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.phone}</td>
              <td>{c.position}</td>
              <td>
                <select
                  className={`status-dropdown ${c.status}`}
                  value={c.status}
                  onChange={(e) => handleStatusChange(c, e.target.value)}
                >
                  <option value="new">New</option>
                  <option value="interview">Interview</option>
                  <option value="selected">Selected</option>
                </select>
              </td>
              <td>{c.experience}</td>
              <td className="actions">
                <div className="action-wrapper">
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    onClick={() => handleDropdownClick(c.id)} // Toggle dropdown on click
                    style={{ cursor: "pointer" }}
                  >
                    <circle cx="5" cy="12" r="2" fill="#fff" />
                    <circle cx="12" cy="12" r="2" fill="#fff" />
                    <circle cx="19" cy="12" r="2" fill="#fff" />
                  </svg>
                  {showDropdown === c.id && ( // Only show dropdown if this row's ID matches the selected one
                    <div className="actions-dropdown">
                      <a
                        href={`${
                          import.meta.env.VITE_API_BASE_URL
                        }/candidates/download-resume/${c._id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Download Resume
                      </a>
                      <a href="#" onClick={() => deleteCandidate(c._id)}>
                        Delete Candidate
                      </a>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default CandidateTable;
