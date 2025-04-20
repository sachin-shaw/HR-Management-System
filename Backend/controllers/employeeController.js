import Employee from "../models/employeeModel.js";

// Add new employee
export const addEmployee = async (req, res) => {
  try {
    const { fullName, email, phone, position, experience } = req.body;

    const newEmployee = new Employee({
      fullName,
      email,
      phone,
      position,
      experience,
    });

    await newEmployee.save();
    res.status(201).json({ message: "Employee added successfully" });
  } catch (error) {
    console.error("Error adding employee:", error);
    res.status(500).json({ message: "Server error while adding employee" });
  }
};

// (Optional) Get all employees
export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateEmployeeStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedEmployee = await Employee.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ message: "Failed to update employee", error });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedEmployee = await Employee.findByIdAndDelete(id);

    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete employee", error });
  }
};
