import { FC, ReactNode, useEffect } from "react";
import { useAppSelector } from "../../hooks/useTypedSelectors";
import { RootAppState } from "../../redux/store";
import { message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

interface IncompleteStayGuardProps {
  children: ReactNode;
}

const IncompleteStayGuard: FC<IncompleteStayGuardProps> = ({ children }) => {
  const { incompleteStay } = useAppSelector((state: RootAppState) => state.places);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if there's an incomplete stay and user is not on room creation page
    if (incompleteStay?.incomplete && !location.pathname.includes('/rooms/create')) {
      // Show alert and prevent navigation
      message.error("Stays is incomplete you must add a room to complete it!");
      
      // Redirect back to room creation page
      navigate(`/app/rooms/create?placeId=${incompleteStay.placeId}&incomplete=true`, { replace: true });
    }
  }, [incompleteStay, location.pathname, navigate]);

  return <>{children}</>;
};

export default IncompleteStayGuard; 