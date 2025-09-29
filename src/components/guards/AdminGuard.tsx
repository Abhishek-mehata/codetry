import { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { RootAppState } from "../../redux/store";
import { useSelector } from "react-redux";

const AdminAuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAdmin } = useSelector((state: RootAppState) => state.auth);
  const location = useLocation();
  const [requestedLocation, setRequestedLocation] = useState<string | null>(null);

  //  Store the last requested location only if the user is not authenticated
  useEffect(() => {
    if (!isAdmin && location.pathname !== requestedLocation) {
      setRequestedLocation(location.pathname);
    }
  }, [isAdmin, location.pathname, requestedLocation]);

  //  Redirect to login if not authenticated
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  // After login, redirect to the last requested location
  if (requestedLocation && location.pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} replace />;
  }

  return <>{children}</>;
};

export default AdminAuthGuard;
