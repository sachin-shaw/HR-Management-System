import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = () => {
  const { auth, loading } = useAuth();

  if (loading) {
    // still restoring session
    return <div>Loading session…</div>;
  }

  return auth.token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
