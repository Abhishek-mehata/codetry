import { NavLink, Outlet, useLocation } from "react-router-dom";
import { ClientFooter, ClientNavbar, IncompleteStayGuard } from "..";
import { PiBookBookmark, PiHandWithdraw } from "react-icons/pi";
// import { GiSpeedometer } from "react-icons/gi";
import { MdMeetingRoom, MdOutlineBed, MdOutlineEmojiEvents } from "react-icons/md";
import { LuUser } from "react-icons/lu";
import { useSelector } from "react-redux";
import { RootAppState } from "../../redux/store";
import { CiCircleCheck } from "react-icons/ci";
import { GrTransaction } from "react-icons/gr";
import { Drawer } from "antd";
import { HiMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { useState } from "react";

const navss = {
  BUYER: [
    // { name: "Dashboard", href: "dashboard", icon: <GiSpeedometer /> },
    { name: "Profile", href: "profile", icon: <LuUser /> },
    { name: "Bookings", href: "reservation", icon: <PiBookBookmark /> },
  ],
  SELLER: [
    // { name: "Dashboard", href: "dashboard", icon: <GiSpeedometer /> },
    { name: "Profile", href: "profile", icon: <LuUser /> },
    { name: "Stays", href: "stays", icon: <MdOutlineBed /> },
    { name: "Rooms", href: "rooms", icon: <MdMeetingRoom /> },
    { name: "Events", href: "events", icon: <MdOutlineEmojiEvents /> },
    { name: "Reservations", href: "reservation", icon: <CiCircleCheck /> },
    { name: "Payouts", href: "payouts", icon: <PiHandWithdraw /> },
    { name: "Transactions", href: "transactions", icon: <GrTransaction /> },
  ],

  // {
  //   name: "Dashboard",
  //   href: "dashboard",
  //   icon: <GiSpeedometer />,
  // },
  // {
  //   name: "Profile",
  //   href: "profile",
  //   icon: <LuUser />,
  // },
  // {
  //   name: "Stays",
  //   href: "stays",
  //   icon: <MdOutlineBed />,
  // },
  // {
  //   name: "Events",
  //   href: "events",
  //   icon: <MdOutlineEmojiEvents />,
  // },
  // {
  //   name: "Reservations",
  //   href: "reservation",
  //   icon: <PiBookBookmark />,
  // },
};

// const DashboardNav = () => {
//   return (
//     <ul
//       className={`flex flex-col flex-1 border-r-2 border-[#E2E2E2] max-w-[300px]`}
//     >
//       {navs.map((nav, i) => (
//         <li key={i}>
//           <NavLink
//             to={nav.href}
//             className={`flex items-center justify-start gap-2 p-6 border border-b-fade-white hover:text-none`}
//           >
//             <span className={`mr-4 text-2xl text-dark-blue`}> {nav.icon}</span>
//             <span className={`hidden lg:block text-dark-blue`}>{nav.name}</span>
//           </NavLink>
//         </li>
//       ))}
//     </ul>
//   );
// };


const DashboardNav = ({ className }: { className: string }) => {
  const role = (useSelector((state: RootAppState) => state.auth.user.role) || "BUYER") as keyof typeof navss;
  const navs = navss[role] || navss.BUYER;
  return (
    <ul className={`${className} flex flex-col flex-1 border-r-2 border-[#E2E2E2] lg:max-w-[300px]`}>
      {navs
        .filter(n => n.name !== 'Payouts')
        .map(nav => (
          <li key={nav.href || nav.name}>
            <NavLink
              to={nav.href}
              className={({ isActive }) =>
                `flex items-center justify-start gap-2 p-6 transition-all duration-300 ${isActive ? "bg-[rgb(239,239,239)] text-purple-600" : "text-dark-blue hover:bg-[rgb(239,239,239)]"
                }`
              }
            >
              <span className="mr-4 text-2xl">{nav.icon}</span>
              <span className="lg:block">{nav.name}</span>
            </NavLink>
          </li>
        ))}
    </ul>
  );
};

const DashboardLayout = () => {
  // const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => setOpen(!open);
  const { pathname } = useLocation();
  const page = pathname.split("/").filter((item) => item)[1];
  // const {
  //   user: { role, id },
  // } = useAppSelector((state: RootAppState) => state.auth);

  // useEffect(() => {
  //   dispatch(getAllHostedEvents());
  //   if (id) {
  //     dispatch(getSellerPlaces(id));
  //   }
  // }, []);

  // if (role !== "SELLER") {
  //   return <Navigate to="/" replace />;
  // }

  return (
    <IncompleteStayGuard>
      <div className={`flex flex-1 flex-col w-full min-h-screen`}>
        <div className={`block relative -z-10 h-20 w-full`} />
        <ClientNavbar />
        <button className="py-4 lg:hidden" type="button" onClick={toggleDrawer}>
          <HiMenu className="text-primary text-4xl" />
        </button>
        <div className={`flex flex-1 overflow-hidden `}>
          <DashboardNav className="hidden lg:block" />
          <Drawer
            placement="left"
            width={500}
            onClose={toggleDrawer}
            open={open}
            onClick={toggleDrawer}
            closeIcon={<IoClose className="text-black text-4xl" />}
          >
            <DashboardNav className="block lg:hidden" />
          </Drawer>
          <div
            className={`relative flex-1 min-w-0 ${page !== "reservation" && "md:p-12 p-2"
              } overflow-y-auto bg-white`}
          >
            <Outlet />
          </div>
        </div>
        <ClientFooter />
      </div>
    </IncompleteStayGuard>
  );
};

export default DashboardLayout;
