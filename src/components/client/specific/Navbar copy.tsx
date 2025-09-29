// /* eslint-disable @typescript-eslint/no-unused-vars */

// import { FC, useState } from "react";
// import { useSelector } from "react-redux";
// import { NavLink, useNavigate ,Link} from "react-router-dom";
// import { Logo, Svg } from "../../../assets";
// import { Drawer, Dropdown, message } from "antd";
// import { HiMenu } from "react-icons/hi";
// import { IoClose } from "react-icons/io5";
// import { FaCircleUser } from "react-icons/fa6";
// import { MdKeyboardArrowDown } from "react-icons/md";
// import type { MenuProps } from "antd";
// import { RootAppState } from "../../../redux/store";
// import {
//   useAppDispatch,
//   useAppSelector,
// } from "../../../hooks/useTypedSelectors";
// import Button from "../../shared/Button";
// import { logout } from "../../../redux/actions/auth";
// import { updateUserRole } from "../../../redux/actions/user";
// import { clearEvents } from "../../../redux/reducers/events";
// import { clearPlaces } from "../../../redux/reducers/places";

// const SwitchRole = () => {
//   const dispatch = useAppDispatch();
//   const {
//     user: { role },
//   } = useAppSelector((state: RootAppState) => state.auth);

//   return (
//     <Button
//       title={`Switch to ${role === "BUYER" ? "Seller" : "Buyer"}`}
//       onClick={async () => {
//         await dispatch(updateUserRole());
//         message.success(`User role switched successful.`);
//       }}
//     />
//   );
// };

// const Logout = () => {
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();

//   const onLogout = () => {
//     dispatch(logout());
//     dispatch(clearPlaces());
//     dispatch(clearEvents());
//     navigate(`/auth/login`);
//   };

//   return (
//     <button type="button" onClick={onLogout}>
//       Logout
//     </button>
//   );
// };

// const items: MenuProps["items"] = [
//   {
//     key: "1",
//     label: <SwitchRole />,
//   },
//   {
//     type: "divider",
//   },
//   {
//     key:"2",
//     label: <Link to="/app/profile">Profile</Link>,
//   },
//   {
//     key: "4",
//     label: <Logout />,
//   },
// ];

// const linkStyle =
//   `flex justify-start lg:justify-center items-center gap-4 lg:gap-2 shadow lg:shadow-none rounded-md lg:rounded-none p-3 lg:p-0 bg-fade-white lg:bg-transparent w-full lg:w-auto` as string;

// const UserMenu = () => (
//   <Dropdown menu={{ items }} placement="bottom" trigger={["click"]}>
//     <button type="button" className={`flex gap-2 items-center rounded-md `}>
//       <FaCircleUser className={`text-xl text-primary`} />
//       <span
//         className={`capitalize text-black font-semibold`}
//       >{`Diwash T.`}</span>
//       <MdKeyboardArrowDown className={`text-xl text-primary`} />
//     </button>
//   </Dropdown>
// );

// const NavLinks = ({
//   role,
//   isAuthenticated,
// }: {
//   role: "ADMIN" | "BUYER" | "SELLER";
//   isAuthenticated: boolean;
// }) => (
//   <div
//     className={`flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-16 ${role}`}
//   >
//     {/* {role === "BUYER" && (
//       <NavLink to={`/trip-board`} type="button" className={linkStyle}>
//         <img src={Svg.heart} />
//         <span className={`text-black text-base font-semibold`}>
//           Trip Boards
//         </span>
//       </NavLink>
//     )} */}

//     {!isAuthenticated && (
//       <div
//         className={`flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-16`}
//       >
//         <NavLink to={`/auth/login`} type="button" className={linkStyle}>
//           <img src={Svg.person} />
//           <span className={`text-black text-base font-semibold`}>Log In</span>
//         </NavLink>
//         <NavLink to={`/auth/signup`} type="button" className={linkStyle}>
//           <img src={Svg.addPerson} className={`text-6xl`} />
//           <span className={`text-black text-base font-semibold`}>Sign Up</span>
//         </NavLink>
//       </div>
//     )}

//     {isAuthenticated && (
//       <div className={`hidden lg:block`}>
//         <UserMenu />
//       </div>
//     )}

//     {!isAuthenticated && (
//       <NavLink
//         // to={`/auth/login`}
//         to={`/app/dashboard`}
//         className="flex items-center rounded-md bg-white ring-1 ring-primary text-primary hover:ring-white hover:bg-primary hover:opacity-70 hover:ease-in-out hover:duration-150 hover:text-white px-3 py-2 text-sm font-semibold  shadow-sm "
//       >
//         Get Started
//       </NavLink>
//     )}
//   </div>
// );

// const Navbar: FC = () => {
//   const {
//     user: { role },
//     isAuthenticated,
//   } = useSelector((state: RootAppState) => state.auth);

//   const [open, setOpen] = useState(false);
//   const toggleDrawer = () => setOpen(!open);

//   return (
//     <nav
//       className={`fixed top-0 left-0 right-0 bottom-0 z-[999] bg-white flex justify-between items-center shadow-md px-4 md:px-8 h-20 border border-b-fade-white`}
//     >
//       <NavLink
//         to={role === "BUYER" ? `/` : `/app/dashboard`}
//         type="button"
//         className={linkStyle}
//       >
//         <img src={Logo.logo_purple} className={`w-20 md:w-24`} />
//       </NavLink>

//       {role && (
//         <div className={`hidden lg:block`}>
//           <NavLinks role={role} isAuthenticated={isAuthenticated} />
//         </div>
//       )}
//       <div className={`flex gap-4 justify-center items-center lg:hidden`}>
//         {isAuthenticated && (
//           <div className={`block lg:hidden`}>
//             <UserMenu />
//           </div>
//         )}
//         <button type="button" onClick={toggleDrawer}>
//           <HiMenu className={`text-black text-4xl`} />
//         </button>
//       </div>

//       <Drawer
//         placement={`right`}
//         width={500}
//         onClose={toggleDrawer}
//         open={open}
//         onClick={toggleDrawer}
//         closeIcon={<IoClose className={`text-black text-4xl`} />}
//       >
//         {role && <NavLinks role={role} isAuthenticated={isAuthenticated} />}
//       </Drawer>
//     </nav>
//   );
// };

// export default Navbar;
/* eslint-disable @typescript-eslint/no-unused-vars */

import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { Logo, Svg } from "../../../assets";
import { Drawer, Dropdown, message } from "antd";
import { HiMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
import { MdKeyboardArrowDown } from "react-icons/md";
import type { MenuProps } from "antd";
import { RootAppState } from "../../../redux/store";
import { useAppDispatch } from "../../../hooks/useTypedSelectors";
import Button from "../../shared/Button";
import { logout } from "../../../redux/actions/auth";
import { updateUserRole } from "../../../redux/actions/user";
import { clearEvents } from "../../../redux/reducers/events";
import { clearPlaces } from "../../../redux/reducers/places";

const SwitchRole = () => {
  const dispatch = useAppDispatch();
  const {
    user: { role },
  } = useSelector((state: RootAppState) => state.auth);
console.log(role,'rrrrrrrrrrrrrrrr')
  return (
    <Button
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
    navigate(`/auth/login`);
  };

  return (
    <button type="button" onClick={onLogout}>
      Logout
    </button>
  );
};

const UserMenu = () => {
  // const {
  //   user: { firstName, lastName },
  // } = useSelector((state: RootAppState) => state.auth);
  const { user } = useSelector((state: RootAppState) => state.auth) || {}; // Ensure user exists

const firstName = user?.firstName || "";
const lastName = user?.lastName || "";

  const fullName = firstName && lastName ? `${firstName} ${lastName}` : "User";

  const items: MenuProps["items"] = [
    { key: "1", label: <SwitchRole /> },
    { type: "divider" },
    { key: "2", label: <Link to="/app/profile">Profile</Link> },
    { key: "4", label: <Logout /> },
  ];

  return (
    <Dropdown menu={{ items }} placement="bottom" trigger={["click"]}>
      <button type="button" className="flex gap-2 items-center rounded-md">
        <FaCircleUser className="text-xl text-primary" />
        <span className="capitalize text-black font-semibold">{fullName}</span>
        <MdKeyboardArrowDown className="text-xl text-primary" />
      </button>
    </Dropdown>
  );
};

const NavLinks = ({
  role,
  isAuthenticated,
}: {
  role: "ADMIN" | "BUYER" | "SELLER";
  isAuthenticated: boolean;
}) => (
  <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-16">
    {!isAuthenticated ? (
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-16">
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
      <div className="hidden lg:block">
        <UserMenu />
        {/* This is just a dummy */}
        <h1>{role}</h1>
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
  // const {
  //   user: { role },
  //   isAuthenticated,
  // } = useSelector((state: RootAppState) => state.auth);
  const { user, isAuthenticated } = useSelector((state: RootAppState) => state.auth);

  const role = user?.role || "BUYER"; // ✅ Ensures role is always defined
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => setOpen(!open);

  return (
    <nav className="fixed top-0 left-0 right-0 bottom-0 z-[999] bg-white flex justify-between items-center shadow-md px-4 md:px-8 h-20 border border-b-fade-white">
      <NavLink to={role === "BUYER" ? "/" : "/"} className="flex items-center gap-2">
        <img src={Logo.logo_purple} className="w-20 md:w-24" alt="Logo" />
      </NavLink>

      {role && (
        <div className="hidden lg:block">
          <NavLinks role={role} isAuthenticated={isAuthenticated} />
        </div>
      )}

      <div className="flex gap-4 justify-center items-center lg:hidden">
        {isAuthenticated && (
          <div className="block lg:hidden">
            <UserMenu />
          </div>
        )}
        <button type="button" onClick={toggleDrawer}>
          <HiMenu className="text-black text-4xl" />
        </button>
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
    </nav>
  );
};

export default Navbar;