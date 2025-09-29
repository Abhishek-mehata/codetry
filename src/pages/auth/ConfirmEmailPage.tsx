import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Logo, Svg } from "../../assets";
import { useEffect, useState } from "react";
import { Spin, message } from "antd";
import axios from "axios";
import { useDispatch } from "react-redux";
import { resendEmailVerification } from "../../redux/actions/auth";
import { AppDispatch } from "../../redux/store";
import api from "../../api";

const ConfirmEmailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  const queryParams = new URLSearchParams(location.search);
  const user = queryParams.get("user");
  const token = queryParams.get("token");

  useEffect(() => {
    const verifyEmail = async () => {
      setIsVerifying(true);

      try {
        await api.post("/auth/email-confirmation", { token });

        message.success(`Your email has been successfully verified!`);
        setIsVerifying(false);
        navigate(`/auth/login`);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          setIsVerifying(false);
          message.error(error?.response?.data.error);
        }
      }
    };

    if (token && user) {
      verifyEmail();
    } else {
      navigate(`/`);
    }
  }, []);

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
          <h3 className={`text-3xl font-medium text-dark-blue mb-8`}>
            Confirm Email
          </h3>
          <div className={``}>
            <div className={`flex justify-center w-full h-96`}>
              <img
                src={Svg.emailSendIcon}
                className={`h-92 max-w-full`}
                alt={`get email graphics`}
              />
            </div>
            {isVerifying && (
              <div
                className={`flex gap-3 items-center justify-center mt-4 w-fit mx-auto`}
              >
                <Spin />
                <span className={`text-sm font-medium text-gray`}>
                  Verifying Email...
                </span>
              </div>
            )}
          </div>
          <div className={`flex gap-1 justify-center items-center mt-10`}>
            <span className={`text-sm font-medium text-gray`}>
              If you didn't get the email,
            </span>
            {user && (
              <button
                type="button"
                onClick={() => dispatch(resendEmailVerification(user))}
                className={`text-sm font-medium text-primary`}
              >
                Click to Resend Email
              </button>
            )}
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

export default ConfirmEmailPage;
