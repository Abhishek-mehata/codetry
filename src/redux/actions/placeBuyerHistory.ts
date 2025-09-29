/* eslint-disable @typescript-eslint/no-explicit-any */
import { switchLoading } from "../reducers/ui";
import { AppDispatch } from "../store";
import api from "../../api";
import { message } from "antd";
import {
  PlaceBuyerHistoryCreationBody,
  PlaceBuyerHistoryUpdateBody,
} from "../../types/placeBuyerHistory";

export const postPlaceBuyerHistory =
  (body: PlaceBuyerHistoryCreationBody) => async (dispatch: AppDispatch) => {
    try {
      dispatch(switchLoading());

      const { data } = await api.post("/v1/place-buyer-history", body);
      console.log(data);

      dispatch(switchLoading());
    } catch (err: any) {
      dispatch(switchLoading());
      message.error(err.response.data?.message);
    }
  };

export const getPlaceBuyerHistory = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(switchLoading());

    const { data } = await api.get("/v1/place-buyer-history");
    console.log(data);

    dispatch(switchLoading());
  } catch (err: any) {
    dispatch(switchLoading());
    message.error(err.response.data?.message);
  }
};

export const getPlaceBuyerHistoryById =
  (historyId: number) => async (dispatch: AppDispatch) => {
    try {
      dispatch(switchLoading());

      const { data } = await api.get(`/v1/place-buyer-history/${historyId}`);
      console.log(data);

      dispatch(switchLoading());
    } catch (err: any) {
      dispatch(switchLoading());
      message.error(err.response.data?.message);
    }
  };
export const patchPlaceBuyerHistory =
  (historyId: number, body: PlaceBuyerHistoryUpdateBody) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(switchLoading());

      const { data } = await api.patch(
        `/v1/place-buyer-history/${historyId}`,
        body
      );
      console.log(data);

      dispatch(switchLoading());
    } catch (err: any) {
      dispatch(switchLoading());
      message.error(err.response.data?.message);
    }
  };
export const deletePlaceBuyerHistory =
  (historyId: number) => async (dispatch: AppDispatch) => {
    try {
      dispatch(switchLoading());

      const { data } = await api.delete(`/v1/place-buyer-history/${historyId}`);
      console.log(data);

      dispatch(switchLoading());
    } catch (err: any) {
      dispatch(switchLoading());
      message.error(err.response.data?.message);
    }
  };
