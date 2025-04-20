import React from "react";

const AddCandidateButton = ({ openModal }) => {
  return (
    <button
      onClick={openModal}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Add Candidate
    </button>
  );
};

export default AddCandidateButton;
