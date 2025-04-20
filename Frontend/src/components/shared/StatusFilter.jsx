import React, { useEffect, useState } from "react";

const StatusFilter = ({ currentPage }) => {
  const [statusOptions, setStatusOptions] = useState([]);

  useEffect(() => {
    // Simulate fetching status options based on currentPage
    if (currentPage === "candidates") {
      setStatusOptions(["Pending", "Interviewed", "Hired", "Rejected"]);
    } else if (currentPage === "attendance") {
      setStatusOptions(["Present", "Absent", "On Leave"]);
    } else {
      setStatusOptions([]);
    }
  }, [currentPage]);

  return (
    <select className="border px-2 py-1 rounded">
      <option value="">All Status</option>
      {statusOptions.map((status) => (
        <option key={status} value={status.toLowerCase()}>
          {status}
        </option>
      ))}
    </select>
  );
};

export default StatusFilter;
