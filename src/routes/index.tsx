/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import GuestGuard from "../components/guards/GuestGuard";
// import AuthGuard from "../components/guards/AuthGuard";
import ForgotPass from "../components/auth/ForgotPass";
import { ClientLayout, DashboardLayout, Loader, AdminLoginGuard, UserLoginGuard } from "../components";
import AdminDashboardLayout from "../components/Layout/adminDashboard"
// import EventsDetailsPage from "../pages/dashboard/Events/EventsDetailsPage";
import EventDetails from "../pages/dashboard/Events/event-details/EventDetails"
// import AbhiStays from "../pages/dashboard/Stays/StaysDetails"
import {
  DashboardPage as Dashboard,
  ProfilePage as Profile,
  StaysPage as Stays,
  DetailsPage as Details,
  // StaysDetailsPage as StaysDetails,
  TripBoardPage as TripBoard,
  EventsPage as Events,
  EventsDetailsPage as EventsDetails,
  AddEventsPage as AddEvents,
  AddStaysPage as AddStays,
  StaysRoomsPage as StaysRooms,
  StaysAddRoomPage as AddStaysRoom,
  StaysEditRoomPage as EditStaysRoom,
  ConfirmEmailPage as ConfirmEmail,
  ReservationPage as Reservation,
  ReservationDetailsPage as ReservationDetails,
} from "../pages";

// Admin Pages Import Start
import AdminStaysPage from "../pages/admin/Stays/AdminStaysPage";
import AdminStaysRoomsPage from "../pages/admin/Stays/StaysRoomsPage";
import AdminStaysAddRoomPage from "../pages/admin/Stays/Create/AdminStaysAddRoomPage";
import AdminEventPage from "../pages/admin/Events/EventsPage";
import AdminUsersPage from "../pages/admin/Users/AdminUsersPage";
// import AdminAddStayPage from "../pages/admin/Stays/Create/AddStays";
// import AdminAddEventPage from "../pages/admin/Events/Create/AddEventsPage";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import AdminAppSettingsPage from "../pages/admin/AppSettings/AdminAppSettings";
import PayoutsTransactions from "../pages/admin/Payouts/PayoutsTransactions";
// Admin Pages Import End

import PropertyPage from "../pages/dashboard/Properties/PropertyPage";
import AddPropertyForm from "../pages/dashboard/Properties/Create/AddProperties";
import AuthGuard from "../components/guards/AuthGuard";

//stays details page
// import StaysD from "../pages/dashboard/Stays/StaysDetails";
import StaysD from "../pages/dashboard/Stays/StaysDetails"
import StaysForm from "../pages/dashboard/Stays/StaysForm";
import BookingsCardDetails from "../pages/dashboard/Reservation/BookingsCardDetails";
import TermsAndConditionPage from "../components/auth/TermsAndConditionPage";
// import EventsForm from "../pages/dashboard/Events/event-details/EventsForm";


// import EventsReservation from "../pages/dashboard/Events/event-details/EventsReservation";


import PaymentSuccess from "../pages/payment/success"; // Import the Payment Success Page
import PaymentCancel from "../pages/payment/cancel";
import EventBookingCard from "../pages/dashboard/Reservation/EventBookingCard";
import EventBookingForm from "../pages/dashboard/Reservation/EventBookingForm";
import Loginpage from "../components/auth/adminAuth/LoginPage";
import AdminAuthGuard from "../components/guards/AdminGuard";
import StaysEditPage from "../pages/dashboard/Stays/Update/StaysEditPage";
import UpdateRoom from "../components/dashboard/Stays/UpdateRoom";
// import EditEventPage from "../pages/dashboard/Events/Update/EditEventPage";

const Loadable = (Component: any) => (props: any) => {
  return (
    <Suspense fallback={<Loader className="h-screen" loading={true || ""} />}>
      <Component {...props} />
    </Suspense>
  );
};

// Client
const Homepage = Loadable(lazy(() => import("../pages/client/Homepage")));
const Searchpage = Loadable(lazy(() => import("../pages/client/Searchpage")));
const DetailsPage = Loadable(Details);
const TripBoardPage = Loadable(TripBoard);

// Authentication
const ConfirmEmailPage = Loadable(ConfirmEmail);
const LoginPage = Loadable(lazy(() => import("../pages/auth/Loginpage")));
const RegisterPage = Loadable(lazy(() => import("../pages/auth/RegisterPage")));
const OtpVerify = Loadable(lazy(() => import("../pages/auth/OtpVerify")));
const PasswordResetPage = Loadable(lazy(() => import("../pages/auth/PasswordResetPage")))


// Admin DashboardPages
const AdminStaysPages = Loadable(AdminStaysPage);
const AdminEventsPage = Loadable(AdminEventPage);
// const AdminAddStays = Loadable(AdminAddStayPage);
// const AdminAddEvents = Loadable(AdminAddEventPage);
const AdminStaysRooms = Loadable(AdminStaysRoomsPage);
const AdminStaysAddRoom = Loadable(AdminStaysAddRoomPage);
const AdminUsers = Loadable(AdminUsersPage);
const AdminDashboard = Loadable(AdminDashboardPage);
const AdminAppSettings = Loadable(AdminAppSettingsPage);
const TransactionsPage = Loadable(lazy(() => import("../pages/admin/Transactions/Transactions")));
import TransactionDetailsPage from "../pages/admin/Transactions/TransactionDetailsPage";
import Support from "../pages/Support";
import TrustAndSafety from "../pages/TrustAndSafety";
import VacationGuide from "../pages/VacationGuides";
import About from "../pages/About";
import HowBookingWorks from "../pages/HowBookingWorks";
import DmtInstallationGuide from "../pages/DmtInstallationGuide";
import DestinationList from "../pages/DestinationList";
import HostSupport from "../pages/HostSupport";
import BoostListing from "../pages/BoostMyListingGuide";
const PayoutsTransactionsPage = Loadable(PayoutsTransactions);




const DashboardTransactionsPage = Loadable(lazy(() => import("../pages/dashboard/Transactions/Transactions")));
const DashboardTransactionDetailsPage = Loadable(lazy(() => import('../pages/dashboard/Transactions/TransactionDetails')));
// Dashboard pages
const DashboardPage = Loadable(Dashboard);
const StaysPage = Loadable(Stays);
const EventsPage = Loadable(Events);
const EventsDetailsPage = Loadable(EventsDetails);
const ProfilePage = Loadable(Profile);
const AddStaysPage = Loadable(AddStays);
const StaysRoomsPage = Loadable(StaysRooms);
const StaysAddRoomPage = Loadable(AddStaysRoom);
const StaysEditRoomPage = Loadable(EditStaysRoom);
const AddEventsPage = Loadable(AddEvents);
const EditEventPage = Loadable(lazy(() => import("../pages/dashboard/Events/Update/EditEventPage")));
const ReservationPage = Loadable(Reservation);
const ReservationDetailsPage = Loadable(ReservationDetails);
const Payouts = Loadable(lazy(() => import("../pages/dashboard/Payouts/Payouts")))


export default function Router() {
  return useRoutes([
    {
      path: "auth",
      children: [
        {
          path: "login",
          element: (
            <UserLoginGuard>
              <GuestGuard>
                <LoginPage />
              </GuestGuard>
            </UserLoginGuard>
          ),
        },
        {
          path: "signup",
          element: (
            <UserLoginGuard>
              <GuestGuard>
                <RegisterPage />
              </GuestGuard>
            </UserLoginGuard>
          ),
        },
        {
          path: "forgot-password",
          element: (
            <UserLoginGuard>
              <GuestGuard>
                <ForgotPass />
              </GuestGuard>
            </UserLoginGuard>
          ),
        },
        {
          path: "verify-otp", // Ensure it matches what you navigate to
          element: (
            <UserLoginGuard>
              <GuestGuard>
                <OtpVerify />
              </GuestGuard>
            </UserLoginGuard>
          ),
        },
        {
          path: "confirm-email",
          element: (
            <UserLoginGuard>
              <GuestGuard>
                <ConfirmEmailPage />
              </GuestGuard>
            </UserLoginGuard>
          ),
        },
        {
          path: "reset-password",
          element: (
            <UserLoginGuard>
              <GuestGuard>
                <PasswordResetPage />
              </GuestGuard>
            </UserLoginGuard>
          ),
        },
      ],
    },
    {
      path: "app",
      element: (
        <>
          <AuthGuard>
            <DashboardLayout />
          </AuthGuard>
        </>
      ),
      children: [
        { path: "dashboard", element: <DashboardPage /> },
        { path: "profile", element: <ProfilePage /> },
        { path: "properties", element: <PropertyPage /> },
        { path: "properties/new", element: <AddPropertyForm /> },
        { path: "events", element: <EventsPage /> },
        { path: "stays", element: <StaysPage /> },
        { path: "events/:id/details", element: <EventsDetailsPage /> },
        { path: "rooms", element: <StaysRoomsPage /> },

        // { path: "stays/:id/rooms/create", element: <StaysAddRoomPage /> },
        { path: "rooms/create", element: <StaysAddRoomPage /> },
        { path: "rooms/edit/:roomId", element: <UpdateRoom /> }, // ✅ Route for editing
        { path: "stays/edit/:id", element: <StaysEditPage /> },
        { path: "events/edit/:id", element: <EditEventPage /> },
        { path: "stays/:id/rooms/edit/:editId", element: <StaysEditRoomPage />, },
        { path: "events/create", element: <AddEventsPage /> },
        { path: "stays/create", element: <AddStaysPage /> },
        { path: "reservation", element: <ReservationPage /> },
        { path: "reservation/:id/details", element: <ReservationDetailsPage />, },
        { path: "payouts", element: <Payouts /> },
        { path: "transactions", element: <DashboardTransactionsPage />, },
        { path: "transactions/:id", element: <DashboardTransactionDetailsPage /> },
      ],
    },
    {
      path: "/",
      element: (
        <ClientLayout />
      ),
      children: [
        { path: "/", element: <Homepage />, },
        // {path: "/video",element: <VideoCall />,},
        { path: "/payment/success", element: <PaymentSuccess />, },
        { path: "/payment/cancel", element: <PaymentCancel /> },
        { path: "/trip-board", element: <TripBoardPage />, },
        { path: "/search", element: <Searchpage />, },
        ///Event details
        { path: "/events/:id", element: <EventDetails />, },
        { path: "/bookevents/:id", element: <EventBookingForm />, },
        { path: "/bookingsCardDetails/:id", element: <BookingsCardDetails />, },
        { path: "/eventBookingDetail/:id", element: <EventBookingCard />, },
        { path: "/terms-and-conditions", element: <TermsAndConditionPage />, },
        // Stays Details page
        { path: "/stays/:id", element: <StaysD />, },
        //stays details form page
        { path: "/staysForm/:id", element: <StaysForm />, },
        { path: "/:category/details/:id", element: <DetailsPage />, },
        { path: "/support", element: <Support />, },
        { path: "/trust-and-safety", element: <TrustAndSafety />, },
        { path: "/vacation-guide", element: <VacationGuide/>, },
        { path: "/about", element: <About/>, },
        { path: "/how-bookings-works", element: <HowBookingWorks />, },
        { path: "/dmt-installation-guide", element: <DmtInstallationGuide />, },
        { path: "/destination-list", element: <DestinationList />, },
        { path: "/support-host", element: <HostSupport />, },
        { path: "/host/boost-plans", element: <BoostListing />, },
      ],
    },
    {
      path: "admin",
      element: (
        <>
          <AdminAuthGuard>
              <AdminDashboardLayout />
          </AdminAuthGuard>
        </>
      ),
      children: [
        { path: "", element: <AdminDashboard /> },
        { path: "dashboard", element: <AdminDashboard /> },
        { path: "profile", element: <ProfilePage /> },
        { path: "properties", element: <PropertyPage /> },
        { path: "properties/new", element: <AddPropertyForm /> },
        { path: "events", element: <AdminEventsPage /> },
        { path: "stays", element: <AdminStaysPages /> },
        { path: "users", element: <AdminUsers /> },
        { path: "events/:id/details", element: <EventsDetailsPage /> },
        { path: "rooms", element: <AdminStaysRooms /> },
        { path: "rooms/create", element: <AdminStaysAddRoom /> },
        { path: "rooms/edit/:roomId", element: <StaysAddRoomPage /> },
        { path: "stays/:id/rooms/edit/:editId", element: <StaysEditRoomPage />, },
        { path: "reservation", element: <ReservationPage /> },
        { path: "reservation/:id/details", element: <ReservationDetailsPage /> },
        { path: "payouts", element: <PayoutsTransactionsPage /> },
        { path: "transactions", element: <TransactionsPage /> },
        { path: "transactions/:id", element: <TransactionDetailsPage /> },
        {
          path: "app-settings", element: <AdminAppSettings />,
        },
      ],
    },
    // Admin Login Route Start
    { 
      path: "admin/login", 
      element: (
        <AdminLoginGuard>
          <Loginpage />
        </AdminLoginGuard>
      ) 
    },
    // Admin Login Route End
    { path: "loading", element: <Loader loading={true} /> },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
