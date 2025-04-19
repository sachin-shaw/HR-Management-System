import Candidate from "../models/candidateModel.js";

//import Employee from "../models/Employee.js";

//   Update employee position
// @route   PUT /api/employees/:id
export const updateEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const { position } = req.body;

    if (!position) {
      return res.status(400).json({
        success: false,
        message: "Position is required to update",
      });
    }

    const updatedEmployee = await Candidate.findByIdAndUpdate(
      candidateId,
      { position },
      { new: true, runValidators: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Employee position updated successfully",
      data: updatedEmployee,
    });
  } catch (error) {
    console.error("Error updating position:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error while updating employee position",
    });
  }
};
