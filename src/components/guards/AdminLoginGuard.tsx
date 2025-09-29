import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootAppState } from "../../redux/store";

const AdminLoginGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useSelector((state: RootAppState) => state.auth);

  // If user is authenticated (regular user), redirect to dashboard
  // This prevents regular users from accessing admin login
  return isAuthenticated ? <Navigate to="/app/dashboard" replace /> : children;
};

export default AdminLoginGuard; 