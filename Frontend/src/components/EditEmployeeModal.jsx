import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddCandidateModal.css";

function EditEmployeeModal({ isOpen, onClose, employee, onUpdate }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
  });

  useEffect(() => {
    if (employee) {
      setFormData({
        fullName: employee.fullName || "",
        email: employee.email || "",
        phone: employee.phone || "",
        position: employee.position || "",
        experience: employee.experience || "",
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/employees/update-status/${
          employee._id
        }`,
        formData
      );
      onUpdate(); // Refresh employee list
      onClose();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Edit Employee</h2>
          <button className="close-button" onClick={onClose}>
            X
          </button>
        </div>
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Full Name*</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email*</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Phone*</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Position*</label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Experience*</label>
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="modal-footer">
            <button type="submit" className="save-button">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditEmployeeModal;
