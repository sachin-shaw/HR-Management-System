import express from "express";
import {
  addEmployee,
  getAllEmployees,
  updateEmployeeStatus,
  deleteEmployee,
} from "../controllers/employeeController.js";

const router = express.Router();
router.post("/", addEmployee); // POST /api/employees
router.get("/", getAllEmployees); // GET /api/employees (optional)
router.delete("/delete-employee/:id", deleteEmployee);

router.put("/update-status/:id", updateEmployeeStatus);

export default router;
