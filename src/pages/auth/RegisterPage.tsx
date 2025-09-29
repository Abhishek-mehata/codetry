import { NavLink } from "react-router-dom";
import { Logo, Svg } from "../../assets";
import { RegisterForm } from "../../components";

const RegisterPage = () => {
  return (
    <div className={`flex justify-between items-start h-full w-full`}>
      <div className={`flex flex-col flex-1 lg:w-1/2 p-8 min-h-screen`}>
        <NavLink to={`/`} className={`flex justify-between items-center`}>
          <img
            src={Logo.logo_purple}
            className={`h-auto max-w-full w-28`}
            alt={`dmt logo`}
          />
        </NavLink>
        <div className={`flex flex-col flex-1 justify-center items-center`}>
          <h3 className={`text-3xl font-medium text-dark-blue mb-8`}>
            Register
          </h3>
          <RegisterForm />
        </div>
      </div>
      <div
        className={`hidden md:flex flex-col gap-20 justify-center items-center rounded-l-[4rem] shadow-2xl min-h-screen h-full w-1/2 `}
      >
        <img
          src={Svg.signUp}
          className={`h-auto max-w-full`}
          alt={`hot air baloon graphics`}
        />
        <div className={`text-center`}>
          <h2 className={`text-4xl text-dark-purple font-semibold`}>
            Adventure Travel Simplifed.
          </h2>
          <p
            className={`text-sm mx-auto text-dark-gray font-normal mt-2 max-w-[40ch]`}
          >
            Browse and book tours and activities so incredible, you’ll want to
            tell your friends.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
