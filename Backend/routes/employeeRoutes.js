import express from "express";
import { updateEmployee } from "../controllers/employeeController.js";

const router = express.Router();

router.put("/:id", updateEmployee); //  Edit employee
//router.get("/", getAllEmployees);
//router.get("/:id", getEmployeeById);
//router.post("/create", createEmployee);

export default router;
