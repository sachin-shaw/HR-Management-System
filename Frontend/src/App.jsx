// src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/dashboard";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";

// Axios configuration to send cookies automatically
import axios from "axios";
axios.defaults.withCredentials = true; // Automatically send cookies with requests
axios.defaults.baseURL = "http://localhost:5000/api/v1"; // Set base URL (adjust as necessary)

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Add other protected routes here */}
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
