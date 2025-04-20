import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CandidateTable.css";

function CandidateTable({ searchTerm, refreshFlag }) {
  const [candidates, setCandidates] = useState([]);

  // Function to fetch candidates
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

  // Function to delete a candidate
  const deleteCandidate = async (candidateId) => {
    try {
      const response = await axios.delete(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/candidates/delete-candidate/${candidateId}`
      );
      console.log(response.data.message); // Show success message
      // After deleting the candidate, fetch the updated candidates list
      fetchCandidates();
    } catch (error) {
      console.error("Failed to delete candidate:", error);
    }
  };

  const handleStatusChange = async (candidate, newStatus) => {
    try {
      if (newStatus === "selected") {
        // Add candidate to employee table
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/employees`, {
          fullName: candidate.name,
          email: candidate.email,
          phone: candidate.phone,
          position: candidate.position,
          experience: candidate.experience,
        });

        // Delete candidate from candidate table
        await deleteCandidate(candidate._id);
      } else {
        // Optional: update status if your backend supports PATCH/PUT
        await axios.patch(
          `${import.meta.env.VITE_API_BASE_URL}/candidates/update-status/${
            candidate._id
          }`,
          {
            status: newStatus,
          }
        );
        fetchCandidates(); // Refresh
      }
    } catch (error) {
      console.error("Status update failed:", error);
    }
  };

  useEffect(() => {
    fetchCandidates(); // Fetch candidates when the component mounts
  }, [refreshFlag]);

  // Filter candidates based on search term
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
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path d="M12 16a2 2 0 01-2 2..." />
                </svg>
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
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default CandidateTable;
