
/* eslint-disable @typescript-eslint/no-unused-vars */

import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate, Link, useLocation } from "react-router-dom";
import { Logo, Svg } from "../../../assets";
import { Drawer, Dropdown, message } from "antd";
import { MdKeyboardArrowDown } from "react-icons/md";
import type { MenuProps } from "antd";
import { RootAppState } from "../../../redux/store";
import { useAppDispatch } from "../../../hooks/useTypedSelectors";
import Button from "../../shared/Button";
import { logout } from "../../../redux/actions/auth";
import { updateUserRole } from "../../../redux/actions/user";
import { clearEvents } from "../../../redux/reducers/events";
import { clearPlaces } from "../../../redux/reducers/places";
import "../../../../src/index.css"
import { HiMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import UserProfile from "../../../pages/dashboard/Events/event-details/UserProfile";

const SwitchRole = () => {
  const dispatch = useAppDispatch();
  const {
    user: { role },
  } = useSelector((state: RootAppState) => state.auth);

  return (
    <Button
      className="popins w-full"
      title={`Switch to ${role === "BUYER" ? "Seller" : "Buyer"}`}
      onClick={async () => {
        await dispatch(updateUserRole());
        message.success(`User role switched successfully.`);
      }}
    />
  );
};

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onLogout = () => {
    dispatch(logout(navigate));
    dispatch(clearPlaces());
    dispatch(clearEvents());
  };

  return (
    <button type="button" className="w-full text-start" onClick={onLogout}>
      Logout
    </button>
  );
};

const UserMenu = () => {
  const items: MenuProps["items"] = [
    { key: "1", label: <SwitchRole /> },
    { type: "divider" },
    { key: "2", label: <Link className="popins w-full block" to="/app/profile">Profile</Link> },
    { key: "4", label: <Logout /> },
  ];

  return (
    <Dropdown menu={{ items }} className="popins" placement="bottom" trigger={["click"]}>
      <button type="button" className="flex gap-2 items-center rounded-md">
        <UserProfile/>
        {/* <span className="capitalize text-black font-semibold">{fullName}</span> */}
        <MdKeyboardArrowDown className="text-xl text-primary" />
      </button>
    </Dropdown>
  );
};

const NavLinks = ({
  // role,
  isAuthenticated,
}: {
  role: "ADMIN" | "BUYER" | "SELLER";
  isAuthenticated: boolean;
}) => (
  <div className="flex flex-col md:flex-row items-center justify-between gap-4 lg:gap-16">
    {!isAuthenticated ? (
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 lg:gap-16">
        <NavLink to="/auth/login" className="flex items-center gap-2">
          <img src={Svg.person} alt="Login" />
          <span className="text-black text-base font-semibold">Log In</span>
        </NavLink>
        <NavLink to="/auth/signup" className="flex items-center gap-2">
          <img src={Svg.addPerson} alt="Sign Up" />
          <span className="text-black text-base font-semibold">Sign Up</span>
        </NavLink>
      </div>
    ) : (
      <div className="hidden md:block">
        <UserMenu />
      </div>
    )}

    {!isAuthenticated && (
      <NavLink
        to="/app/dashboard"
        className="flex items-center rounded-md bg-white ring-1 ring-primary text-primary hover:ring-white hover:bg-primary hover:opacity-70 hover:ease-in-out hover:duration-150 hover:text-white px-3 py-2 text-sm font-semibold shadow-sm"
      >
        Get Started
      </NavLink>
    )}
  </div>
);

const Navbar: FC = () => {
  const url =  useLocation();

  const isDashboard = url?.pathname.split("/").includes("app");
  
  
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => setOpen(!open);
  const { user, isAuthenticated } = useSelector((state: RootAppState) => state.auth);

  const role = user?.role || "BUYER"; // ✅ Ensures role is always defined

  return (
    <nav className="fixed top-0 left-0 right-0 bottom-0 z-[999] bg-white  shadow-md px-4 md:px-8 h-20  border-b-fade-white">
      <div className={`h-20 flex justify-between items-center mx-auto w-full ${isDashboard ? "" : "md:max-w-[800px] lg:max-w-[1000px] xl:max-w-[1400px] "}`}>
        <NavLink to={role === "BUYER" ? "/" : "/"} className="flex items-center gap-2">
          <img src={Logo.logo_purple} className="w-20 md:w-24" alt="Logo" />
        </NavLink>


        {/* // For Desktop Navbar S */}
        {role && (
          <div className="hidden md:block">
            <NavLinks role={role} isAuthenticated={isAuthenticated} />
          </div>
        )}
        {/* // For Desktop Navbar E */}

        <div className="flex gap-4 justify-center items-center md:hidden">
          {isAuthenticated && (
            <div className="">
              <UserMenu />
            </div>
          )}
          {!isAuthenticated &&
            <button type="button" onClick={toggleDrawer}>
              <HiMenu className="text-primary text-4xl" />
            </button>
          }
        </div>

        <Drawer
          placement="right"
          width={500}
          onClose={toggleDrawer}
          open={open}
          onClick={toggleDrawer}
          closeIcon={<IoClose className="text-black text-4xl" />}
        >
          {role && <NavLinks role={role} isAuthenticated={isAuthenticated} />}
        </Drawer>
      </div>
    </nav>
  );
};

export default Navbar;
