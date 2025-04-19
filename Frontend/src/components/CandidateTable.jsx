import React, { useEffect, useState } from "react";
import axios from "axios";
import "./candidateTable.css";

function CandidateTable() {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/candidates"
        );
        const data = response.data.data;

        const formatted = data.map((c, index) => ({
          id: (index + 1).toString().padStart(2, "0"),
          _id: c._id, // keep _id for backend resume download
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

    fetchCandidates();
  }, []);

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
        {candidates.map((c) => (
          <tr key={c.id}>
            <td>{c.id}</td>
            <td>{c.name}</td>
            <td>{c.email}</td>
            <td>{c.phone}</td>
            <td>{c.position}</td>
            <td>
              <span className={`status ${c.status}`}>
                {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="currentColor"
                >
                  <path d="M7 10l5 5 5-5z" />
                </svg>
              </span>
            </td>
            <td>{c.experience}</td>
            <td className="actions">
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="currentColor"
              >
                <path d="M12 16a2 2 0 01-2 2..." />
              </svg>
              <div className="actions-dropdown">
                <a
                  href={`http://localhost:5000/api/candidates/download-resume/${c._id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download Resume
                </a>
                <a href="#">Delete Candidate</a>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CandidateTable;
