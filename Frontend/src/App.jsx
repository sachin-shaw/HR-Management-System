import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import axios from "axios";

import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import EmployeeTable from "./components/EmployeeTable";
import PrivateRoute from "./components/PrivateRoute";

import "./App.css";

// Axios default configuration
axios.defaults.withCredentials = true;
axios.defaults.baseURL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";

const AppRoutes = () => {
  const { loading } = useAuth();

  if (loading) return <div>Loading session…</div>;

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employees" element={<EmployeeTable />} />
      </Route>
    </Routes>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}
