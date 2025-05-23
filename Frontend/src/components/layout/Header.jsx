import React from "react";
import StatusFilter from "../shared/StatusFilter";
import PositionFilter from "../shared/PositionFilter";
import SearchInput from "../shared/SearchInput";
import AddCandidateButton from "../shared/AddCandidateButton";

const Header = ({
  currentPage,
  openModal,
  closeModal,
  isModalOpen,
  searchTerm,
  setSearchTerm,
}) => {
  if (currentPage === "candidates") {
    return (
      <div className="flex gap-2 items-center">
        <StatusFilter />
        <PositionFilter />
        <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <AddCandidateButton openModal={openModal} />
      </div>
    );
  }

  if (currentPage === "employees") {
    return (
      <div className="flex gap-2 items-center">
        <PositionFilter />
        <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
    );
  }

  if (currentPage === "attendance") {
    return (
      <div className="flex gap-2 items-center">
        <StatusFilter />
        <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
    );
  }

  return null;
};

export default Header;
