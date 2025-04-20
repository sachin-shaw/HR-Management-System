import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CandidateTable.css"; // Reusing styles from CandidateTable

const AttendanceTable = () => {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const today = new Date().toISOString().split("T")[0]; // Format: yyyy-mm-dd

  // Fetch all current employees
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

  // Handle dropdown change
  const handleStatusChange = (empId, status) => {
    setAttendance((prev) => ({
      ...prev,
      [empId]: status,
    }));
  };

  // Submit attendance
  const handleSubmit = async () => {
    const records = employees.map((emp) => ({
      employeeId: emp._id,
      status: attendance[emp._id] || "Absent", // Default to Absent
    }));

    try {
      setIsSubmitting(true);
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/attendance/mark`, {
        date: today,
        records,
      });
      alert("Attendance submitted successfully!");
    } catch (error) {
      console.error("Error submitting attendance:", error);
      alert("Failed to submit attendance.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="attendance-container">
      <h2>Mark Attendance - {today}</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>Sr no.</th>
            <th>Employee Name</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((e, index) => (
            <tr key={e._id}>
              <td>{(index + 1).toString().padStart(2, "0")}</td>
              <td>{e.fullName}</td>
              <td>{e.email}</td>
              <td>
                <select
                  value={attendance[e._id] || ""}
                  onChange={(ev) => handleStatusChange(e._id, ev.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                  <option value="Medical Leave">Medical Leave</option>
                  <option value="Work From Home">Work From Home</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        className="submit-button"
        onClick={handleSubmit}
        disabled={isSubmitting}
        style={{ marginTop: "20px" }}
      >
        {isSubmitting ? "Submitting..." : "Submit Attendance"}
      </button>
    </div>
  );
};

export default AttendanceTable;
