import React, { useEffect, useState } from "react";
import "./PositionFilter.css";

const PositionFilter = ({ currentPage }) => {
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    if (currentPage === "candidates" || currentPage === "employees") {
      setPositions(["Frontend Developer", "Backend Developer", "Designer"]);
    } else {
      setPositions([]);
    }
  }, [currentPage]);

  return (
    <select className="position-filter">
      <option value="">All Positions</option>
      {positions.map((position) => (
        <option key={position} value={position.toLowerCase()}>
          {position}
        </option>
      ))}
    </select>
  );
};

export default PositionFilter;
