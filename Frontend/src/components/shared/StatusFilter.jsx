import React, { useEffect, useState } from "react";
import "./StatusFilter.css";

const StatusFilter = ({ currentPage }) => {
  const [statusOptions, setStatusOptions] = useState([]);

  useEffect(() => {
    if (currentPage === "candidates") {
      setStatusOptions(["Pending", "Interviewed", "Hired", "Rejected"]);
    } else if (currentPage === "attendance") {
      setStatusOptions(["Present", "Absent", "On Leave"]);
    } else {
      setStatusOptions([]);
    }
  }, [currentPage]);

  return (
    <select className="status-filter">
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
