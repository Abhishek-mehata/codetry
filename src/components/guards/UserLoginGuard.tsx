import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootAppState } from "../../redux/store";

const UserLoginGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAdmin } = useSelector((state: RootAppState) => state.auth);

  // If user is admin, redirect to admin dashboard
  // This prevents admins from accessing regular user login
  return isAdmin ? <Navigate to="/admin/dashboard" replace /> : children;
};

export default UserLoginGuard; 