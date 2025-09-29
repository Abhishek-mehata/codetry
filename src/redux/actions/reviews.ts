/* eslint-disable @typescript-eslint/no-explicit-any */

import { message } from "antd";
import api from "../../api";
import {
  PlaceReviewBody,
  EventOnlineReviewBody,
  EventOnsiteReviewBody,
} from "../../types/reviews";
import { switchLoading } from "../reducers/ui";
import { AppDispatch } from "../store";
import { storePlaceReviews } from "../reducers/places";

export const postPlaceReview =
  (placeId: number, review: PlaceReviewBody) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(switchLoading());

      const { data } = await api.post(`/places/${placeId}/reviews`, review);
      console.log(data);

      dispatch(switchLoading());
    } catch (err: any) {
      dispatch(switchLoading());
      message.error(err.response.data?.message);
    }
  };

export const getPlaceReviews =
  (placeId: number) => async (dispatch: AppDispatch) => {
    try {
      const { data } = await api.get(`/places/${placeId}/reviews`);

      console.log(data);
      dispatch(storePlaceReviews(data));
    } catch (err: any) {
      message.error(err.response.data?.message);
    }
  };

export const getPlaceReviewById =
  (reviewId: number) => async (dispatch: AppDispatch) => {
    try {
      dispatch(switchLoading());

      const { data } = await api.get(`/places/reviews/${reviewId}`);
      console.log(data);

      dispatch(switchLoading());
    } catch (err: any) {
      dispatch(switchLoading());
      message.error(err.response.data?.message);
    }
  };

export const deletePlaceReview =
  (placeId: number, reviewId: number) => async (dispatch: AppDispatch) => {
    try {
      dispatch(switchLoading());

      const { data } = await api.delete(
        `/places/${placeId}/reviews/${reviewId}`
      );
      console.log(data);

      dispatch(switchLoading());
    } catch (err: any) {
      dispatch(switchLoading());
      message.error(err.response.data?.message);
    }
  };

export const postOnlineEventReview =
  (review: EventOnlineReviewBody) => async (dispatch: AppDispatch) => {
    try {
      dispatch(switchLoading());

      const { data } = await api.post(`/event-reviews/online`, review);
      console.log(data);

      dispatch(switchLoading());
    } catch (err: any) {
      dispatch(switchLoading());
      message.error(err.response.data?.message);
    }
  };

export const postOnsiteEventReview =
  (review: EventOnsiteReviewBody) => async (dispatch: AppDispatch) => {
    try {
      dispatch(switchLoading());

      const { data } = await api.post(`/event-reviews/onsite`, review);
      console.log(data);

      dispatch(switchLoading());
    } catch (err: any) {
      dispatch(switchLoading());
      message.error(err.response.data?.message);
    }
  };

export const getEventReviewById =
  (reviewId: number) => async (dispatch: AppDispatch) => {
    try {
      dispatch(switchLoading());

      const { data } = await api.get(`/event-reviews/${reviewId}`);
      console.log(data);

      dispatch(switchLoading());
    } catch (err: any) {
      dispatch(switchLoading());
      message.error(err.response.data?.message);
    }
  };

export const deleteEventReview =
  (reviewId: number) => async (dispatch: AppDispatch) => {
    try {
      dispatch(switchLoading());

      const { data } = await api.delete(
        `/event-reviews/${reviewId}/${reviewId}`
      );
      console.log(data);

      dispatch(switchLoading());
    } catch (err: any) {
      dispatch(switchLoading());
      message.error(err.response.data?.message);
    }
  };
