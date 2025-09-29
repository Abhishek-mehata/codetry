 
import { createSlice } from "@reduxjs/toolkit";
import { UserModel } from "../../types/user";

interface IinitialState {
  user: UserModel;
  loading: boolean;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isWhatsappCodeSend: boolean;
  redirectToLogin: boolean | null;
  isOtpVerified: boolean|null, // New state for OTP verification

}

const userInitState: UserModel = {
  id: 0,
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  country: "",
  role: "SELLER",
  isSeller: false,
  password: "",
  isEmailConfirmed: false,
  emailVerifyToken: "",
  passwordResetToken: "",
  isPhoneNumberConfirmed: false,
  isCountryConfirmed: false,
  status: "ACTIVE",
  createdAt: "",
  updatedAt: "",
};

const initialState: IinitialState = {
  token: localStorage.getItem("token") || localStorage.getItem("admin-token"),
  // isAuthenticated: false,
  isAuthenticated: !!localStorage.getItem("token"),
  isAdmin: !!localStorage.getItem("admin-token"),
  loading: false,
  user: userInitState || {}, //  Ensures `user` is always an object
  isWhatsappCodeSend: false,
  redirectToLogin: false,
  isOtpVerified: false, // New state for OTP verification

};

const AuthSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    userLoaded: (state, { payload }) => {
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        loading: false,
      };
    },
    otpVerified: (state) => {
      state.isOtpVerified = true;
    },
    setUser: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        user: payload,
      };
    },
    toggleWhatsappCode: (state) => {
      state.isWhatsappCodeSend = !state.isWhatsappCodeSend;
    },
    // loginSuccess: (state, { payload }) => {
    //   return {
    //     ...state,
    //     ...payload,
    //     isAuthenticated: payload.isAuthenticated ?? state.isAuthenticated, // Keep it false until OTP is verified
    //     loading: false,
    //   };
    // },
    loginSuccess: (state, { payload }) => {
      state.user = payload.user;
      state.isAuthenticated = payload.isAuthenticated;
      state.isAdmin = payload.isAdmin;
      state.token = payload.token;
      state.loading = false;
    },
    signOut: (state) => {
      return {
        ...state,
        token: null,
        loading: false,
        user: userInitState,
        isAuthenticated: false,
        isAdmin: false,
        isOtpVerified: false, // ✅ Ensure OTP verification resets on logout
      };
    // signOut: (state) => {
    //   state.token = null;
    //   state.isAuthenticated = false;
    //   state.isOtpVerified= false, // ✅ Ensure OTP verification resets on logout

    //   state.user = {} as UserModel;
    // // },
    },
  },
});

export const {
  loginSuccess,
  signOut,
  setUser,
  userLoaded,
  toggleWhatsappCode,
  otpVerified,
} = AuthSlice.actions;

export default AuthSlice.reducer;
