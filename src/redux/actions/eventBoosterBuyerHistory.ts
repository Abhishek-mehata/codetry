/* eslint-disable @typescript-eslint/no-explicit-any */
import { switchLoading } from "../reducers/ui";
import { AppDispatch } from "../store";
import api from "../../api";
import { message } from "antd";
import {
  EventBoosterBuyerHistoryCreationBody,
  EventBoosterBuyerHistoryUpdateBody,
} from "../../types/eventBoosterBuyerHistory";

export const createEventBoosterBuyerHistory =
  (body: EventBoosterBuyerHistoryCreationBody) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(switchLoading());

      const { data } = await api.post("/v1/event-booster-buyer-history", body);
      console.log(data);

      dispatch(switchLoading());
    } catch (err: any) {
      dispatch(switchLoading());
      message.error(err.response.data?.message);
    }
  };

export const getEventBoosterBuyerHistory =
  () => async (dispatch: AppDispatch) => {
    try {
      dispatch(switchLoading());

      const { data } = await api.get("/v1/event-booster-buyer-history");
      console.log(data);

      dispatch(switchLoading());
    } catch (err: any) {
      dispatch(switchLoading());
      message.error(err.response.data?.message);
    }
  };

export const getEventBoosterBuyerHistoryById =
  (historyId: number) => async (dispatch: AppDispatch) => {
    try {
      dispatch(switchLoading());

      const { data } = await api.get(
        `/v1/event-booster-buyer-history/${historyId}`
      );
      console.log(data);

      dispatch(switchLoading());
    } catch (err: any) {
      dispatch(switchLoading());
      message.error(err.response.data?.message);
    }
  };

export const updateEventBoosterBuyerHistory =
  (historyId: number, body: EventBoosterBuyerHistoryUpdateBody) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(switchLoading());

      const { data } = await api.patch(
        `/v1/event-booster-buyer-history/${historyId}`,
        body
      );
      console.log(data);

      dispatch(switchLoading());
    } catch (err: any) {
      dispatch(switchLoading());
      message.error(err.response.data?.message);
    }
  };

export const deleteEventBoosterBuyerHistory =
  (historyId: number) => async (dispatch: AppDispatch) => {
    try {
      dispatch(switchLoading());

      const { data } = await api.delete(
        `/v1/event-booster-buyer-history/${historyId}`
      );
      console.log(data);

      dispatch(switchLoading());
    } catch (err: any) {
      dispatch(switchLoading());
      message.error(err.response.data?.message);
    }
  };
