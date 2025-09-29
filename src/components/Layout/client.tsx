import { Outlet, useLocation } from "react-router-dom";
import { ClientNavbar, Footer } from "..";
import { useAppDispatch } from "../../hooks/useTypedSelectors";
// import { RootAppState } from "../../redux/store";
import { useEffect } from "react";
import {  getActivePlaces, getLatestPlaces } from "../../redux/actions/places";
import {  getUpcomingEvents } from "../../redux/actions/events";
// import { useNavigate } from "react-router-dom";

const ClientLayout = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  // const { user } = useAppSelector((state: RootAppState) => state.auth);
  // const navigate = useNavigate();
  
  useEffect(() => {
    dispatch(getActivePlaces());
    dispatch(getUpcomingEvents());
    dispatch(getLatestPlaces());
    // dispatch(getAllEvents());
  }, []);

  // useEffect(() => {
  //   if (user?.role && user.role !== "BUYER") {
  //     navigate("/app/dashboard", { replace: true });
  //   }
  // }, [user, navigate]);

  return (
    <div className={`w-full h-full`}>
      <div className={`block relative -z-10 h-20 w-full`} />
      <ClientNavbar />
      <div className="">
        <Outlet />
      </div>
      {/* <EventCard /> */}
      {pathname !== "/search" && <Footer />}
    </div>
  );
};

export default ClientLayout;
