import { NavLink } from "react-router-dom";
import { Logo, Svg } from "../../assets";
import { LoginForm } from "../../components";

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
          <div className={`flex gap-6 justify-between items-center`}>
            <p className={`text-gray fonr-medium text-sm`}>
              Don’t have an account?
            </p>
            <NavLink
              to={`/auth/signup`}
              className={`flex items-center rounded-md bg-white ring-1 ring-primary text-primary hover:ring-white hover:bg-primary hover:text-white hover:opacity-70 hover:ease-in-out hover:duration-150 px-3 py-2 text-sm font-semibold shadow-sm w-fit`}
            >
              Create One
            </NavLink>
          </div>
        </div>
        <div className={`flex flex-col flex-1 justify-center items-center`}>
          <h3 className={`text-3xl font-medium text-dark-blue mb-8`}>Log In</h3>

          <LoginForm />

          <div className={`flex gap-1 justify-center items-center mt-10`}>
            <span className={`text-sm font-medium text-gray`}>
              Forgot your Password?
            </span>
            <NavLink
              to={`/auth/forgot-password`}
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
        <div className={`text-center max-w-[40ch]`}>
          <h2 className={`text-4xl text-dark-purple font-semibold`}>
            Recapture The Magic
          </h2>
          <p className={`text-sm text-dark-gray font-normal mt-2`}>
            Browse and book tours and activities so incredible, you’ll want to
            tell your friends.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
