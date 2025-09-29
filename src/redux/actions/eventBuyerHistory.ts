/* eslint-disable @typescript-eslint/no-explicit-any */
import { switchLoading } from "../reducers/ui";
import { AppDispatch } from "../store";
import api from "../../api";
import { message } from "antd";
import {
  EventBuyerHistoryCreationBody,
  EventBuyerHistoryUpdateBody,
} from "../../types/eventBuyerHistory";

export const createEventBuyerHistory =
  (body: EventBuyerHistoryCreationBody) => async (dispatch: AppDispatch) => {
    try {
      dispatch(switchLoading());

      const { data } = await api.post("/event-buyer-history", body);
      console.log(data);

      dispatch(switchLoading());
    } catch (err: any) {
      dispatch(switchLoading());
      message.error(err.response.data?.message);
    }
  };

export const getEventBuyerHistory = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(switchLoading());

    const { data } = await api.get("/event-buyer-history");
    console.log(data);

    dispatch(switchLoading());
  } catch (err: any) {
    dispatch(switchLoading());
    message.error(err.response.data?.message);
  }
};

export const getEventBuyerHistoryById =
  (historyId: number) => async (dispatch: AppDispatch) => {
    try {
      dispatch(switchLoading());

      const { data } = await api.get(`/event-buyer-history/${historyId}`);
      console.log(data);

      dispatch(switchLoading());
    } catch (err: any) {
      dispatch(switchLoading());
      message.error(err.response.data?.message);
    }
  };

export const updateEventBuyerHistory =
  (historyId: number, body: EventBuyerHistoryUpdateBody) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(switchLoading());

      const { data } = await api.patch(
        `/event-buyer-history/${historyId}`,
        body
      );
      console.log(data);

      dispatch(switchLoading());
    } catch (err: any) {
      dispatch(switchLoading());
      message.error(err.response.data?.message);
    }
  };

export const deleteEventBuyerHistory =
  (historyId: number) => async (dispatch: AppDispatch) => {
    try {
      dispatch(switchLoading());

      const { data } = await api.delete(`/event-buyer-history/${historyId}`);
      console.log(data);

      dispatch(switchLoading());
    } catch (err: any) {
      dispatch(switchLoading());
      message.error(err.response.data?.message);
    }
  };
