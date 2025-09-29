/* eslint-disable @typescript-eslint/no-explicit-any */
import { switchLoading } from "../reducers/ui";
import { AppDispatch } from "../store";
import api from "../../api";
import { message } from "antd";
import { setUser } from "../reducers/auth";
import { RootAppState } from "../../redux/store";
import { setUsers } from "../reducers/users";

const user_id = localStorage.getItem("user_id");

export const AllUsers = () => async (dispatch: AppDispatch) => {
  try {
    const {
      data: { data: users },
    } = await api.get(`/users`);
    console.log(users,"users");

    dispatch(setUsers(users)); // set it in state
  } catch (err: any) {
    message.error(
      err.response?.data?.message || "Something went wrong while getting users"
    );
  }
};

export const getUser = (userId: number) => async (dispatch: AppDispatch) => {
  try {
    const {
      data: { data: user },
    } = await api.get(`/users/${userId}`); 
    dispatch(setUser(user));
  } catch (err: any) {
    message.error(
      err.response.data?.message || "Something went wrong while getting user"
    );
  }
};

export const updateUser = (body: any) => async (dispatch: AppDispatch) => {
  try {
    let res;

    if (body instanceof FormData) {
      res = await api.patch(`/users/`, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } else {
      const { firstName, lastName, phoneNumber } = body;
      res = await api.patch(`/users`, {
        firstName,
        lastName,
        phoneNumber,
      });
    }

    const {
      data: { data: user },
    } = res;

    dispatch(setUser(user));
    return user;
  } catch (err: any) {
    message.error(err.response?.data?.message || "Update User Failed!");
  }
};


export const updateUserByAdmin = (body: any) => async (dispatch: AppDispatch) => {
  try {
    let res;

    if (body instanceof FormData) {
      res = await api.patch(`/users/${user_id}`, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } else {
      const { firstName, lastName, phoneNumber } = body;
      res = await api.patch(`/users/${user_id}`, {
        firstName,
        lastName,
        phoneNumber,
      });
    }

    const {
      data: { data: user },
    } = res;

    dispatch(setUser(user));
    return user;
  } catch (err: any) {
    message.error(err.response?.data?.message || "Update User Failed!");
  }
};

export const updateUserRole = () => async (dispatch: AppDispatch, getState: () => RootAppState) => {
  try {
    // Get user ID from Redux state instead of localStorage
    const user_id = getState().auth.user?.id;

    if (!user_id) {
      message.error("User ID not found. Please log in again.");
      return null;
    }

    console.log(`Switching role for user: ${user_id}`);

    // API request to switch role
    const response: any = await api.get(`/users/switch/${user_id}`);

    console.log("API Response:", response); // ✅ Log full response

    const updatedUser = response?.data?.data?.user;

    if (!updatedUser) {
      message.error("Failed to switch user role.");
      return null;
    }

    console.log(`Updated Role: ${updatedUser.role}`); // ✅ Log new role

    dispatch(setUser(updatedUser));

    // Refresh user details
    await dispatch(getUser(user_id));

    return updatedUser;
  } catch (err: any) {
    console.error("Error switching role:", err);
    message.error(err.response?.data?.message || "Failed to switch role.");
    return null;
  }
};

export const updateUserCountry =
  (body: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(switchLoading());
      const res: any = await api.post("/users/send-whatsapp-code", body);

      message.success(res.data || "Successfully updated profile!");

      dispatch(switchLoading());
    } catch (err: any) {
      dispatch(switchLoading());
      message.error(err.response.data?.message || "Login Failed!");
    }
  };

export const sendWhatsAppCode =
  (body: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(switchLoading());
      console.log(body);
      const res: any = await api.post("/users/send-whatsapp-code", body);
      console.log(res)
      message.success(res.data || "Successfully updated profile!");

      dispatch(switchLoading());
    } catch (err: any) {
      dispatch(switchLoading());

      message.error(
        err.response.data?.message ===
          "Forbidden! Provided Role : BUYER. Allowed Roles : SELLER."
          ? `Switch to SELLER`
          : err.response.data?.error
      );
    }
  };

export const updateUserTransactions =
  (body: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(switchLoading());

      await api.post("/user", body);
    } catch (err: any) {
      message.error(err.response.data?.message || "Login Failed!");
    }
  };

export const deleteUser = (userId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(switchLoading());

    const { data } = await api.delete(`/users/${userId}`);
    console.log(data);

    dispatch(switchLoading());
  } catch (err: any) {
    dispatch(switchLoading());
    message.error(err.response.data?.message);
  }
};
