
/* eslint-disable @typescript-eslint/no-unused-vars */

import { FC } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { Logo } from "../../../assets";
import { Dropdown } from "antd";
import { FaCircleUser } from "react-icons/fa6";
import { MdKeyboardArrowDown } from "react-icons/md";
import type { MenuProps } from "antd";
import { useAppDispatch } from "../../../hooks/useTypedSelectors";
import { logout } from "../../../redux/actions/auth";
import { clearEvents } from "../../../redux/reducers/events";
import { clearPlaces } from "../../../redux/reducers/places";
import "../../../../src/index.css"


const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onLogout = () => {
    dispatch(logout(navigate));
    dispatch(clearPlaces());
    dispatch(clearEvents());
  };

  return (
    <button className="w-full text-start" type="button" onClick={onLogout}>
      Logout
    </button>
  );
};

const UserMenu = () => {
  const items: MenuProps["items"] = [
    { key: "2", label: <Link className="popins" to="/admin/profile">Profile</Link> },
    { key: "4", label: <Logout /> },
  ];

  return (
    <Dropdown menu={{ items }} className="popins" placement="bottom" trigger={["click"]}>
      <button type="button" className="flex gap-2 items-center rounded-md">
        <FaCircleUser className="text-xl text-primary" />
        <span className="capitalize text-black font-semibold">Admin</span>
        <MdKeyboardArrowDown className="text-xl text-primary" />
      </button>
    </Dropdown>
  );
};


const Navbar: FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bottom-0 z-[999] bg-white  shadow-md px-4 md:px-8 h-20  border-b-fade-white">
      <div className="h-20 flex justify-between items-center mx-auto w-full">
        <NavLink to="/admin" className="flex items-center gap-2">
          <img src={Logo.logo_purple} className="w-20 md:w-24" alt="Logo" />
        </NavLink>
        {/* // User DropDown Menu S */}
        <UserMenu />
        {/* // User DropDown Menu Navbar E */}
      </div>
    </nav>
  );
};

export default Navbar;
