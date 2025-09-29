import { message } from 'antd';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppDispatch } from "../store";
// import {
//   getUsers,
//   loginSuccess,
//   resetUsers,
//   setChatUser,
//   signOut,
//   userLoaded,
// } from "../reducers/auth";
import { switchLoading } from "../reducers/ui";
// import { getAllTransactions } from "./transactions";
// import { resetTransactoins } from "../reducers/transactions";
// import { showAllConversations, showConversations } from "./message";
import { loginSuccess, signOut, otpVerified } from "../reducers/auth";
import { getUser } from "./user";
import api from "../../api";
import { NavigateFunction } from "react-router-dom"; // Import NavigateFunction type


interface LoginResponse {
  token: string;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
}

// Define the login success payload structure
interface LoginSuccessPayload {
  user: LoginResponse['user'];
  isAuthenticated: boolean | undefined;
  isAdmin: boolean | undefined;
  token: string;
}

export const login =
  (email: string, password: string) => async (dispatch: AppDispatch): Promise<boolean> => {
    const body = { email, password };
    try {
      dispatch(switchLoading());

      const res: any = await api.post("/auth/sign-in", body);

      const {
        data: { token, user },
      } = res.data;

      let isadmin;
      let isuser;

      if (user.role === "ADMIN") {
        localStorage.setItem("admin-token", token);
        isadmin = true;
        isuser = false;
      } else {
        localStorage.setItem("token", token);
        isadmin = false;
        isuser = true;
      }

      localStorage.setItem("user_id", user.id);

      const payload: LoginSuccessPayload = {
        user,
        isAuthenticated: isuser,
        isAdmin: isadmin,
        token,
      };

      dispatch(loginSuccess(payload));
      await dispatch(getUser(user.id));
      dispatch(switchLoading());

      return true; // ✅ success
    } catch (err: any) {
      dispatch(switchLoading());
      message.error(err.response?.data?.error || 'Login failed');
      return false; // ❌ failure
    }
  };

export const signup =
  (body: any, navigate: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(switchLoading());

      await api.post("/auth/sign-up-email", body);

      message.success("✅ OTP sent! Please check your email.");
      dispatch(
        loginSuccess({
          user: { ...body },
          isAuthenticated: false,
          token: null,
        })
      );

      // localStorage.setItem("user_email", body.email);
      setTimeout(() => {
        navigate("/auth/verify-otp");
      }, 500);
    } catch (err: any) {
      message.error(err.response?.data?.error || "Signup failed.");
    } finally {
      dispatch(switchLoading());
    }
  };

// export const login =
//   (email: string, password: string) => async (dispatch: AppDispatch) => {
//     const body = { email, password };

//     try {
//       dispatch(switchLoading());

//       const res = await api.post("/auth/sign-in", body);
//       const { token, user } = res.data;

//       //  Store token & user data in localStorage
//       localStorage.setItem("token", token);
//       localStorage.setItem("user_id", user.id);

//       dispatch(
//         loginSuccess({
//           user,
//           isAuthenticated: true,
//           token,
//         })
//       );

//       await dispatch(getUser(user.id));
//       dispatch(switchLoading());

//       message.success("Login successful!");
//     } catch (err: any) {
//       dispatch(switchLoading());
//       message.error(err.response?.data?.error || "Login failed.");
//     }
//   };
export const verifyOtp =
  (email: string, otp: string, navigate: any, password: string) =>
    async (dispatch: AppDispatch) => {
      try {
        dispatch(switchLoading());

        const res = await api.post("/auth/verify-otp", { email, otp, password });
        const { token, user } = res.data;

        //  Store authentication token
        localStorage.setItem("token", token);
        localStorage.setItem("user_id", user.id);

        dispatch(otpVerified());

        dispatch(
          loginSuccess({
            user,
            isAuthenticated: true,
            token,
          })
        );

        message.success("OTP Verified! Redirecting...");
        navigate("/app/dashboard");
      } catch (err: any) {
        message.error(err.response?.data?.error || "Invalid OTP, try again.");
      } finally {
        dispatch(switchLoading());
      }
    };

// // export const renewToken = () => async (dispatch: AppDispatch) => {
// //   try {
// //     const res: any = await api.get('/auth/renewtoken');
// //     const user: any = jwtDecode(res.data.token);

// //     dispatch({
// //       type: 'LOGIN_SUCCESS',
// //       payload: { ...res.data, ...user },
// //     });
// //     dispatch(getUser());
// //   } catch (err) {
// //     dispatch({ type: 'AUTH_ERROR' });
// //   }
// // };

// export const getUser = () => async (dispatch: AppDispatch) => {
//   try {
//     dispatch(switchLoading());
//     const res: AxiosResponse<any, any> = await api.get("/user/");

//     dispatch(userLoaded(res.data));
//     await dispatch(getAllTransactions());
//     await dispatch(showConversations());
//     const { role } = store.getState().auth.user;

//     if (role === "admin") {
//       await dispatch(getAllUser());
//       await dispatch(showAllConversations());
//     }

//     dispatch(switchLoading());
//   } catch (err: any) {
//     dispatch(switchLoading());

//     message.error(
//       err.response.data?.message ||
//         "Failed To load user. Kindly logout and login"
//     );
//   }
// };
// export const verifyOtp =
//   (email: string, otp: string,navigate: any,password: string) =>
//   async (dispatch: AppDispatch) => {
//     try {
//       dispatch(switchLoading());

//       await api.post("/auth/verify-otp", { email, otp, password });

//       dispatch(otpVerified()); // Update state to mark OTP as verified
//       navigate("/app/dashboard"); //  Redirect to home page after successful OTP verification

//       message.success("OTP Verified! Redirecting...");
//       dispatch(switchLoading());
//     } catch (err: any) {
//       dispatch(switchLoading());
//       message.error(err.response?.data?.error || "Invalid OTP, try again.");
//     }
//   };
// export const verifyOtp =
//   (email: string, otp: string, navigate: any, password: string) =>
//   async (dispatch: AppDispatch) => {
//     try {
//       dispatch(switchLoading());

//       // Send OTP verification request
//       const res = await api.post("/auth/verify-otp", { email, otp, password });

//       // Extract user data and token from response
//       const { token, user } = res.data;

//       // Store authentication token
//       localStorage.setItem("token", token);
//       localStorage.setItem("user_id", user.id);

//       // Dispatch OTP verified action
//       dispatch(otpVerified());

//       // Dispatch login success and update user state
//       dispatch(
//         loginSuccess({
//           user,
//           isAuthenticated: true, // Now user is authenticated
//           token,
//         })
//       );

//       message.success({
//         content: " OTP Verified! Redirecting...",
//         duration: 2,
//       });      
//       // Redirect to dashboard
//       navigate("/app/dashboard");

//       dispatch(switchLoading());
//     } catch (err: any) {
//       dispatch(switchLoading());
//       message.error({
//         content: err.response?.data?.message || "Invalid OTP, try again.",
//         duration: 3,
//       });    }
//   };
export const resendOtp = (email: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(switchLoading());

    await api.post("/auth/resend-otp", { email });

    message.success({
      content: "OTP resent successfully! Please check your email.",
      duration: 2,
    });

    dispatch(switchLoading());
  } catch (err: any) {
    dispatch(switchLoading());
    message.error({
      content: err.response?.data?.error || "❌ Failed to resend OTP.",
      duration: 3,
    });
  }
};

export const getAllUser = () => async () => {
  try {
    await api.get("/user/get-all-users");

    // const {
    //   data: { user },
    // } = res.data;

    // dispatch(getUser(user.id));
  } catch (err: any) {
    message.error(
      err.response.data?.message ||
      "Failed To load All user. Kindly logout and login"
    );
  }
};
// export const signup = (body: any, navigate: any) => async (dispatch: AppDispatch) => {
//   try {
//     dispatch(switchLoading());

//     await api.post("/auth/sign-up-email", body);

//     message.success("OTP sent! Please check your email.");
//     dispatch(switchLoading());

//     // Store email in Redux state
//     dispatch(
//       loginSuccess({
//         user: { ...body }, // Store user data
//         isAuthenticated: false,
//         token: null,
//       })
//     );

//     //Store email in LocalStorage
//     localStorage.setItem("user_email", body.email);

//     // Ensure Redux updates before navigating
//     setTimeout(() => {
//       navigate("/auth/verify-otp");
//     }, 500);
//   } catch (err: any) {
//     dispatch(switchLoading());
//     message.error(err.response?.data?.error || "Signup failed.");
//   }
// };

// export const signup = (body: any) => async (dispatch: AppDispatch) => {
//   try {
//     dispatch(switchLoading());
//     await api.post("/auth/sign-up-email", body);

//     message.success(
//       "Registration successfull! Please check your email for confirmation."
//     );

//     dispatch(switchLoading());
//   } catch (err: any) {
//     dispatch(switchLoading());
//     message.error(err.response.data.error);
//   }
// };

export const signinwithGoogle =
  (body: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(switchLoading());

      await api.post("/auth/sign-in-google", body);

      dispatch(switchLoading());
    } catch (err: any) {
      dispatch(switchLoading());

      message.error(err.response.data?.message);
    }
  };

export const resendEmailVerification =
  (email: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(switchLoading());

      await api.post("/auth/email-confirmation", {
        email,
      });

      dispatch(switchLoading());

      message.success("Email send successfull!");
    } catch (err: any) {
      dispatch(switchLoading());
      message.error(err.response.data?.error);
    }
  };

// export const updatePass = (pass: string) => async (dispatch: AppDispatch) => {
//   try {
//     dispatch({
//       type: "BLOCK_MAIN",
//       payload: {
//         blockFlag: true,
//         blockMessage: "Updating",
//       },
//     });
//     await api.post("/auth/updatePassword", pass);

//     dispatch({
//       type: "UNBLOCK_MAIN",
//     });
//     dispatch({
//       type: "SHOW_SNACKBAR",
//       payload: {
//         messageType: "success",
//         feedback: "Successfully Updated Password",
//         openSnackbar: true,
//       },
//     });
//   } catch (err) {
//     dispatch({
//       type: "UNBLOCK_MAIN",
//     });
//     dispatch({
//       type: "SHOW_SNACKBAR",
//       payload: {
//         messageType: "error",
//         feedback: "Wrong Current Password",
//         openSnackbar: true,
//       },
//     });
//   }
// };
export const resetPassword =
  ({ token, password }: { token: string; password: string }, navigate: NavigateFunction) =>
    async () => {
      try {
        console.log("Reset Password Request:", { token, password }); //  Log request

        const response = await api.post("/auth/reset-password", { token, password });

        console.log("Reset Password Response:", response.data); // Log response

        message.success("Password reset successfully! Please log in.");
        navigate("/auth/login"); //  Redirect after success
      } catch (error: any) {
        console.error("Reset Password Error:", error.response?.data || error.message); // Log error
        message.error(error.response?.data?.message || "Password reset failed.");
      }
    };

export const resetPasswordRequest =
  (body: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(switchLoading());
      await api.post("/auth/forgot-password", body);
      dispatch(switchLoading());

      message.success(
        "Successfully Sent Reset password request to your email!"
      );
    } catch (err: any) {
      dispatch(switchLoading());
      message.error(err?.response?.data?.errors?.msg || err?.response?.data?.error);
    }
  };

// export const resetPassword =
//   (body: any, token: string) => async (dispatch: AppDispatch) => {
//     try {
//       dispatch(switchLoading());

//       await api.post(`/auth/resetpassword/${token}`, body);

//       dispatch(switchLoading());
//       message.success("Successfully Changed Password!");
//     } catch (err: any) {
//       dispatch(switchLoading());

//       message.error(err?.response?.data?.errors?.msg);
//     }
//   };

// export const logout = () => async (dispatch: AppDispatch) => {
//   try {
//     await api.post("/auth/logout");
//     dispatch(signOut());
//     // localStorage.removeItem("token");
//     // localStorage.removeItem("user_id");

//     message.success("Successfully Logged out!");
//   } catch (err: any) {
//     message.error(err?.response?.data?.error);
//   }
// };
// export const logout = () => async (dispatch: AppDispatch) => {
//   try {
//     await api.post("/auth/logout");

//     dispatch(signOut());

//     // Clear authentication-related data from localStorage
//     localStorage.removeItem("token");
//     localStorage.removeItem("user_id");
//     localStorage.removeItem("user_email"); // ✅ Remove user_email

//     message.success("Successfully Logged out!");
//   } catch (err: any) {
//     message.error(err?.response?.data?.error || "Logout failed.");
//   }
// };
// ✅ Reset Password Request (Forgot Password)
// export const resetPasswordRequest =
//   (email: string) => async () => {
//     try {
//       await api.post("/auth/forgot-password", { email });
//       message.success("Password reset link sent to your email!");
//     } catch (error: any) {
//       message.error(error.response?.data?.message || "Failed to send reset link.");
//     }
//   };

// Reset Password
// export const resetPassword =
//   (token: string, password: string, navigate: NavigateFunction) =>
//   async () => {
//     try {
//       await api.post("/auth/reset-password", { token, password });
//       message.success("Password reset successfully! Please log in.");
//       navigate("/auth/login");
//     } catch (error: any) {
//       message.error(error.response?.data?.message || "Password reset failed.");
//     }
//   };

export const logout = (navigate: NavigateFunction) => async (dispatch: AppDispatch) => {
  try {
    await api.post("/auth/logout");
    //  Ensure Redux state updates before navigation
    dispatch(signOut());

    //  Wait for state update before navigating
    setTimeout(() => {
      // Clear authentication-related data from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("admin-token");
      localStorage.removeItem("__paypal_storage__");
      localStorage.removeItem("user_id");
      localStorage.removeItem("user_email");

      message.success("Successfully Logged out!");

      //  Redirect to home page after state updates
      navigate("/");
    }, 500); // Delay to ensure proper state update
  } catch (err: any) {
    message.error(err?.response?.data?.error || "Logout failed.");
  }
};

