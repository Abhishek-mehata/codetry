import { FormikProvider, useFormik } from "formik";
import { useState } from "react";
import {  Link, useNavigate } from "react-router-dom";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../redux/actions/auth"; // Redux Action
import { Logo } from "../../assets";
import { Button, DashboardInput } from "../../components/index";
import * as Yup from "yup";
import { useLocation } from "react-router-dom";

//  Password Validation Schema
const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-zA-Z]/, "Password must contain letters")
    .matches(/\d/, "Password must contain numbers")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

const PasswordResetPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const location = useLocation(); //  Get URL query parameters
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: async (values, { setSubmitting }) => {
  
      if (!token) {
        console.error("Error: No token found in URL.");
        setSubmitting(false);
        return;
      }
  
      try {
        await dispatch(resetPassword({ token, password: values.password }, navigate));
        setSuccessMessage(" Password reset successfully! Redirecting...");
  
        setTimeout(() => {
          navigate("/auth/login");
        }, 3000);
      } catch (error) {
        console.error(" Password Reset Failed:", error);
        setSubmitting(false);
      }
    },
  });
  
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-center">
          <img src={Logo.logo_purple} className="w-32" alt="dmt_logo" />
        </div>

        <h1 className="text-2xl font-semibold text-center mt-4">Reset Password</h1>

        {successMessage ? (
          <p className="text-green-500 text-center mt-2">{successMessage}</p>
        ) : (
          <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit} className="mt-4">
              {/* Password Input */}
              <DashboardInput
                title="New Password"
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter a New Password"
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-sm">{formik.errors.password}</div>
              )}

              {/* Confirm Password Input */}
              <DashboardInput
                title="Confirm Password"
                placeholder="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <div className="text-red-500 text-sm">{formik.errors.confirmPassword}</div>
              )}

              {/* Submit Button */}
              <Button
                title="Reset Password"
                variant="filled"
                type="submit"
                className="text-white w-full font-medium mt-4 bg-primary"
                disabled={formik.isSubmitting}
              />

              <div className="text-sm text-center mt-3">
                <Link to="/auth/login" className="text-purple">Back to Login</Link>
              </div>
            </form>
          </FormikProvider>
        )}
      </div>
    </div>
  );
};

export default PasswordResetPage;
