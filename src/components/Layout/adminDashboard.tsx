import { NavLink, Outlet, useLocation } from "react-router-dom";
import DashboardHeader from "../../pages/admin/components/DashboardHeader"
import { GiSpeedometer } from "react-icons/gi";
import { MdMeetingRoom, MdOutlineBed, MdOutlineEmojiEvents } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
// import { PiBookBookmark } from "react-icons/pi";
import { FaGear } from "react-icons/fa6";
import { GrTransaction } from "react-icons/gr";
import { PiHandWithdraw } from "react-icons/pi";
import { Drawer } from "antd";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { HiMenu } from "react-icons/hi";


const navss = {
  ADMIN: [
    { name: "Dashboard", href: "dashboard", icon: <GiSpeedometer /> },
    { name: "Stays", href: "stays", icon: <MdOutlineBed /> },
    { name: "Rooms", href: "rooms", icon: <MdMeetingRoom /> },
    { name: "Events", href: "events", icon: <MdOutlineEmojiEvents /> },
    { name: "Users", href: "users", icon: <FaRegUser /> },
    // { name: "Reservations", href: "reservation", icon: <PiBookBookmark/> },
    { name: "Transactions", href: "transactions", icon: <GrTransaction /> },
    { name: "Payouts", href: "payouts", icon: <PiHandWithdraw /> },
    { name: "App Settings", href: "app-settings", icon: <FaGear /> },
  ],
};

const DashboardNav = ({ className }: { className: string }) => {

  const navs = navss.ADMIN;
  return (
    <ul className={`${className} flex flex-col flex-1 border-r-2 border-[#E2E2E2] lg:max-w-[300px]`}>
      {navs.map((nav, i) => (
        <li key={i}>
          <NavLink
            to={nav.href}
            className={({ isActive }) =>
              `flex items-center justify-start gap-2 p-6  transition-all duration-300 ${isActive
                ? "bg-[rgb(239,239,239)] text-purple-600" // Active state styling
                : "text-dark-blue hover:bg-[rgb(239,239,239)]"
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
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => setOpen(!open);
  const { pathname } = useLocation();
  const page = pathname.split("/").filter((item) => item)[1];

  return (
    <div className={`flex flex-1 flex-col w-full min-h-screen`}>
      <div className={`block relative -z-10 h-20 w-full`} />
      <DashboardHeader />
      <button className="py-4 lg:hidden" type="button" onClick={toggleDrawer}>
        <HiMenu className="text-primary text-4xl" />
      </button>
      <div className={`flex flex-1 overflow-hidden`}>
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
    </div>
  );
};

export default DashboardLayout;
