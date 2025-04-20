import React, { useEffect, useState } from "react";

const PositionFilter = ({ currentPage }) => {
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    // You can replace this with actual API calls later
    if (currentPage === "candidates" || currentPage === "employees") {
      setPositions(["Frontend Developer", "Backend Developer", "Designer"]);
    } else {
      setPositions([]);
    }
  }, [currentPage]);

  return (
    <select className="border px-2 py-1 rounded">
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
