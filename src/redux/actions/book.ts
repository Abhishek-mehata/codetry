/* eslint-disable @typescript-eslint/no-explicit-any */

import { message } from "antd";
import api from "../../api";
import { switchLoading } from "../reducers/ui";
import { AppDispatch } from "../store";
import { storeBookedRooms } from "../reducers/places";

export const createBook =
  (bookId: string, body: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(switchLoading());

      const data = await api.post(`/book/${bookId}`, body);
      console.log(data);

      message.success("Rooms booked successfully");
      dispatch(switchLoading());
    } catch (err: any) {
      dispatch(switchLoading());
      message.error(err.response.data?.message);
    }
  };

export const getBook = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(switchLoading());

    const { data } = await api.get("/book");
    console.log(data);

    dispatch(storeBookedRooms(data));
    dispatch(switchLoading());
  } catch (err: any) {
    dispatch(switchLoading());
    console.log(err);
    // message.error(err.response.data?.message);
  }
};

export const postConfirmBook =
  (bookId: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(switchLoading());

      const { data } = await api.post(`/book/confirm/${bookId}`, {});
      console.log(data);

      dispatch(switchLoading());
    } catch (err: any) {
      dispatch(switchLoading());
      console.log(err);
      message.error(err.response.data?.message);
    }
  };

export const postCancelBook =
  (bookId: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(switchLoading());

      const { data } = await api.post(`/book/cancel/${bookId}`, {});
      console.log(data);

      dispatch(switchLoading());
    } catch (err: any) {
      dispatch(switchLoading());
      console.log(err);
      message.error(err.response.data?.message);
    }
  };

export const getBookPayment = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(switchLoading());

    const { data } = await api.get("/book/payment");
    console.log(data);

    dispatch(switchLoading());
  } catch (err: any) {
    dispatch(switchLoading());
    console.log(err);
    message.error(err.response.data?.message);
  }
};
