// src/components/PrivateRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = () => {
  const { auth, loading } = useAuth();

  // Wait for auth check
  if (loading) return <div>Loading...</div>;

  // If token exists, allow route
  return auth?.token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
