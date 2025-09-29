/* eslint-disable @typescript-eslint/no-explicit-any */
import { switchLoading } from "../reducers/ui";
import { AppDispatch } from "../store";
import api from "../../api";
import { message } from "antd";
import {
  PaymentServicePayoutBody,
  PaymentOrderEventBody,
  PaymentOrderBoostingEventBody,
  PaymentOrderPlaceBody,
  UpdatePaymentSettingsBody,
} from "../../types/payment";
import { 
  storePaymentSettings, 
  setPaymentSettingsLoading, 
  setPaymentSettingsSaving 
} from "../reducers/payment";

export const getPaymentById =
  (paymentId: number) => async (dispatch: AppDispatch) => {
    try {
      dispatch(switchLoading());

      const { data } = await api.get(`/payment/${paymentId}`);
      console.log(data);

      dispatch(switchLoading());
    } catch (err: any) {
      dispatch(switchLoading());
      console.log(err);
      message.error(err.response.data?.message);
    }
  };

export const postPaymentServicePayout =
  (payout: PaymentServicePayoutBody) => async (dispatch: AppDispatch) => {
    try {
      dispatch(switchLoading());

      const { data } = await api.post(`/payment/service/payout`, payout);
      console.log(data);

      dispatch(switchLoading());
    } catch (err: any) {
      dispatch(switchLoading());
      console.log(err);
      message.error(err.response.data?.message);
    }
  };

export const postPaymentOrderEvent =
  (order: PaymentOrderEventBody) => async (dispatch: AppDispatch) => {
    try {
      dispatch(switchLoading());

      const { data } = await api.post(`/payment/order/event`, order);
      console.log(data);

      dispatch(switchLoading());
    } catch (err: any) {
      dispatch(switchLoading());
      console.log(err);
      message.error(err.response.data?.message);
    }
  };

export const postPaymentOrderBoostingEvent =
  (order: PaymentOrderBoostingEventBody) => async (dispatch: AppDispatch) => {
    try {
      dispatch(switchLoading());

      const { data } = await api.post(`/payment/order/boosting-event`, order);
      console.log(data);

      dispatch(switchLoading());
    } catch (err: any) {
      dispatch(switchLoading());
      console.log(err);
      message.error(err.response.data?.message);
    }
  };

export const postPaymentOrderPlace =
  (order: PaymentOrderPlaceBody) => async (dispatch: AppDispatch) => {
    try {
      dispatch(switchLoading());

      const { data } = await api.post(`/payment/order/place`, order);
      console.log(data);

      dispatch(switchLoading());
    } catch (err: any) {
      dispatch(switchLoading());
      console.log(err);
      message.error(err.response.data?.message);
    }
  };

export const postCaptureOrder =
  (orderId: number) => async (dispatch: AppDispatch) => {
    try {
      dispatch(switchLoading());

      const { data } = await api.post(`/payment/capture-order/${orderId}`);
      console.log(data);

      dispatch(switchLoading());
    } catch (err: any) {
      dispatch(switchLoading());
      console.log(err);
      message.error(err.response.data?.message);
    }
  };

// Payment Settings Actions
export const getPaymentSettings = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setPaymentSettingsLoading(true));
    
    const token = localStorage.getItem("admin-token");
    if (!token) {
      message.error('No admin token found. Please log in as admin.');
      dispatch(setPaymentSettingsLoading(false));
      return;
    }

    const { data } = await api.get('/payment/settings');
    
    if (data && Array.isArray(data) && data.length > 0) {
      dispatch(storePaymentSettings(data));
      console.log('Payment settings loaded successfully');
    } else {
      message.error('No payment settings found. Please create settings first.');
    }
  } catch (err: any) {
    console.error('Error fetching payment settings:', err);
    
    if (err.response?.status === 401) {
      message.error('Authentication failed. Please log in again.');
    } else if (err.response?.status === 404) {
      message.error('No payment settings found. Please create settings first.');
    } else if (err.code === 'NETWORK_ERROR' || err.message?.includes('Network Error')) {
      message.error('Network error: Unable to connect to the server. Please check your connection.');
    } else {
      message.error(`Error fetching payment settings: ${err.response?.data?.message || err.message || 'Unknown error'}`);
    }
  } finally {
    dispatch(setPaymentSettingsLoading(false));
  }
};

export const updatePaymentSettings = (settingsId: number, updateData: UpdatePaymentSettingsBody) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setPaymentSettingsSaving(true));
    
    const token = localStorage.getItem("admin-token");
    if (!token) {
      message.error('No admin token found. Please log in as admin.');
      dispatch(setPaymentSettingsSaving(false));
      return;
    }

    const { data } = await api.put(`/payment/settings/${settingsId}`, updateData);
    
    if (data) {
      message.success('Payment settings updated successfully');
      // Refresh the settings after update
      dispatch(getPaymentSettings());
    }
  } catch (err: any) {
    console.error('Error updating payment settings:', err);
    message.error(err.response?.data?.message || 'Error updating payment settings');
  } finally {
    dispatch(setPaymentSettingsSaving(false));
  }
};
