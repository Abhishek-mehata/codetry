/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppDispatch } from "../store";
import { switchLoading } from "../reducers/ui";
import { loginSuccess, signOut } from "../reducers/auth";
import { getUser } from "./user";
import { message } from "antd";
import api from "../../api";

// Define API Response Types
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
  isAuthenticated: boolean;
  token: string;
}

// Login Action
export const login =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(switchLoading());

      const res = await api.post<LoginResponse>("/auth/sign-in", { email, password });

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user_id", user.id.toString());

      // Dispatch loginSuccess with the correct payload structure
      const payload: LoginSuccessPayload = {
        user,
        isAuthenticated: true,
        token,
      };

      dispatch(loginSuccess(payload)); // Correctly dispatch the payload

      await dispatch(getUser(user.id));

      message.success("Login successful!");
    } catch (err: any) {
      message.error(err.response?.data?.error || "Login failed.");
    } finally {
      dispatch(switchLoading());
    }
  };


// Signup Action
export const signup = (body: Record<string, any>) => async (dispatch: AppDispatch) => {
  try {
    dispatch(switchLoading());

    await api.post("/auth/sign-up-email", body);

    message.success("Registration successful! Please check your email for confirmation.");
  } catch (err: any) {
    message.error(err.response?.data?.error || "Signup failed.");
  } finally {
    dispatch(switchLoading());
  }
};

// Google Sign-in
export const signinWithGoogle = (body: Record<string, any>) => async (dispatch: AppDispatch) => {
  try {
    dispatch(switchLoading());

    await api.post("/auth/sign-in-google", body);

    message.success("Google Sign-in successful!");
  } catch (err: any) {
    message.error(err.response?.data?.message || "Google Sign-in failed.");
  } finally {
    dispatch(switchLoading());
  }
};

// Resend Email Verification
export const resendEmailVerification = (email: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(switchLoading());

    await api.post("/auth/email-confirmation", { email });

    message.success("Verification email sent successfully!");
  } catch (err: any) {
    message.error(err.response?.data?.error || "Failed to send verification email.");
  } finally {
    dispatch(switchLoading());
  }
};

// Password Reset Request
export const resetPasswordRequest = (body: Record<string, any>) => async (dispatch: AppDispatch) => {
  try {
    dispatch(switchLoading());

    await api.post("/auth/forgot-password", body);

    message.success("Password reset request sent successfully!");
  } catch (err: any) {
    message.error(err.response?.data?.errors?.msg || "Failed to send password reset request.");
  } finally {
    dispatch(switchLoading());
  }
};

// Logout Action
export const logout = () => async (dispatch: AppDispatch) => {
  try {
    await api.post("/auth/logout");

    dispatch(signOut());
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");

    message.success("Successfully logged out!");
  } catch (err: any) {
    message.error(err.response?.data?.error || "Logout failed.");
  }
};

// Get All Users
export const getAllUsers = () => async () => {
  try {
    await api.get("/user/get-all-users");
    message.success("Users loaded successfully!");
  } catch (err: any) {
    message.error(err.response?.data?.message || "Failed to load users.");
  }
};
