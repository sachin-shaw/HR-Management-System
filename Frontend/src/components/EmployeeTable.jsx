import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CandidateTable.css";
import EditEmployeeModal from "./EditEmployeeModal"; // new modal component

function EmployeeTable() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/employees`
      );
      setEmployees(response.data);
    } catch (error) {
      console.error("Failed to fetch employees:", error);
    }
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/employees/delete-employee/${id}`
      );
      fetchEmployees();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const closeModal = () => {
    setIsEditModalOpen(false);
    setSelectedEmployee(null);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <>
      <table className="data-table">
        <thead>
          <tr>
            <th>Sr no.</th>
            <th>Employee Name</th>
            <th>Email Address</th>
            <th>Phone Number</th>
            <th>Position</th>
            <th>Experience</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((e, index) => (
            <tr key={e._id}>
              <td>{(index + 1).toString().padStart(2, "0")}</td>
              <td>{e.fullName}</td>
              <td>{e.email}</td>
              <td>{e.phone}</td>
              <td>{e.position}</td>
              <td>{e.experience}</td>
              <td>
                <select
                  onChange={(ev) => {
                    const action = ev.target.value;
                    if (action === "edit") handleEdit(e);
                    if (action === "delete") handleDelete(e._id);
                    ev.target.value = ""; // reset dropdown
                  }}
                >
                  <option value="edit">Edit</option>
                  <option value="delete">Delete</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isEditModalOpen && selectedEmployee && (
        <EditEmployeeModal
          isOpen={isEditModalOpen}
          onClose={closeModal}
          employee={selectedEmployee}
          onUpdate={fetchEmployees}
        />
      )}
    </>
  );
}

export default EmployeeTable;
