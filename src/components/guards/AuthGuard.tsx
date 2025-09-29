// import { useState } from "react";
// import { Navigate, useLocation } from "react-router-dom";

// import { RootAppState } from "../../redux/store";
// import Loginpage from "../../pages/auth/Loginpage";
// import { useAppSelector } from "../../hooks/useTypedSelectors";

// const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const { isAuthenticated } = useAppSelector(
//     (state: RootAppState) => state.auth
//   );

//   const { pathname } = useLocation();
//   const [requestedLocation, setRequestedLocation] = useState<string | null>(
//     null
//   );

//   if (!isAuthenticated) {
//     if (pathname !== requestedLocation) {
//       setRequestedLocation(pathname);
//     }
//     return <Loginpage />;
//   }

//   if (requestedLocation && pathname !== requestedLocation) {
//     setRequestedLocation(null);

//     return <Navigate to={requestedLocation} />;
//   }

//   return <>{children}</>;
// };

// export default AuthGuard;
import { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { RootAppState } from "../../redux/store";
import { useSelector } from "react-redux";

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useSelector((state: RootAppState) => state.auth);
  const location = useLocation();
  const [requestedLocation, setRequestedLocation] = useState<string | null>(null);

  //  Store the last requested location only if the user is not authenticated
  useEffect(() => {
    if (!isAuthenticated && location.pathname !== requestedLocation) {
      setRequestedLocation(location.pathname);
    }
  }, [isAuthenticated, location.pathname, requestedLocation]);

  //  Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  // After login, redirect to the last requested location
  if (requestedLocation && location.pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;
