import { NavLink } from "react-router-dom";
import { Logo, Svg } from "../../../assets";
import  LoginForm  from "./LoginForm";

const Loginpage = () => {
  return (
    <div className={`flex justify-between items-start h-full w-full`}>
      <div className={`flex flex-col flex-1 lg:w-1/2 p-8 min-h-screen`}>
        <div
          className={`flex gap-4 lg:gap-0 flex-col lg:flex-row justify-between items-center`}
        >
          <NavLink to={`/`}>
            <img
              src={Logo.logo_purple}
              className={`h-auto max-w-full w-28`}
              alt={`dmt logo`}
            />
          </NavLink>
        </div>
        <div className={`flex flex-col flex-1 justify-center items-center`}>
          <h3 className={`text-3xl font-medium text-dark-blue mb-8`}>Admin Login</h3>

          <LoginForm />

          <div className={`flex gap-1 justify-center items-center mt-10`}>
            <NavLink
              to={``}
              className={`text-sm font-medium text-primary`}
            >
              Reset Password
            </NavLink>
          </div>
        </div>
      </div>
      <div
        className={`hidden md:flex flex-col gap-20 justify-center items-center rounded-l-[4rem] shadow-2xl min-h-screen h-full w-1/2`}
      >
        <img
          src={Svg.hotAir}
          className={`h-auto max-w-full`}
          alt={`hot air baloon graphics`}
        />
      </div>
    </div>
  );
};

export default Loginpage;
