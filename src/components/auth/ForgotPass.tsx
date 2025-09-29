import { FormikProvider, useFormik } from "formik";
import { Link } from "react-router-dom";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { resetPasswordRequest } from "../../redux/actions/auth";
import { Logo } from "../../assets";
import Button from "../shared/Button";
import DashboardInput from "../dashboard/shared/DashboardInput";
import { useState } from "react";

const ForgotPass = () => {
  const dispatch: AppDispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      const res = dispatch(resetPasswordRequest({ email: values.email }));
      console.log(res,"fasdfasdfasd");
    },
  });


  const [email, setEmail] = useState(false);
  const handleChnageEmail = (val: string) => {
    if (val.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
      setEmail(false);
    } else if (val.length === 0) {
      setEmail(true);
    } else {
      setEmail(true);
    }
  };

  const validateEmail = () => {
    return email ? (
      <p style={{ color: "red" }}>Please enter a valid Email!</p>
    ) : (
      ""
    );
  };

  return (
    <div className="w-full h-full">
      <div className="w-full flex justify-center items-center h-[100vh]">
        <div className="flex-1 bg-white flex items-center justify-center  max-w-max">
          <div className="w-full flex flex-col justify-center items-center px-0 md:px-14">
            <img src={Logo.logo_purple} className="w-[200px]" alt="dmt_logo" />
            <div className="card max-w-[450px] md:max-w-[500px] w-full h-full px-5  md:px-6">
              <h1 className="font-semibold text-center text-3xl pb-1">
                Forgot Password
              </h1>
              <p className="text-gray text-center">
                Enter your email address to reset your password.
              </p>
              <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit}>
                  <div className="w-full mt-4">
                    <DashboardInput
                      title="Email"
                      name="email"
                      value={formik.values.email}
                      // onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Your email"
                      onChange={(e) => {
                        formik.handleChange(e);
                        handleChnageEmail(e.target.value);
                      }}
                    />
                    {email ? (
                      <div className={` mt-1 text-sm h-8`}>{validateEmail()}</div>
                    ) : null}

                    {/* Add error display */}
                    {formik.touched.email && formik.errors.email && (
                      <div className="text-red-500 text-sm">
                        {formik.errors.email}
                      </div>
                    )}

                    <Button
                      title="Send Request"
                      variant="filled"
                      type="submit"
                      className="text-white w-full font-semibold mb-3 mt-3"
                    />

                    <div className="text-sm ">
                      Remember your password now?{" "}
                      <Link
                        to={"/auth/login"}
                        className="text-primary font-bold"
                      >
                        Sign in
                      </Link>
                    </div>
                  </div>
                </form>
              </FormikProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPass;
