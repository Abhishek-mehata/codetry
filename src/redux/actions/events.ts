/* eslint-disable @typescript-eslint/no-explicit-any */
 

import { AppDispatch } from "../store";
import {
  addEventToStore,
  storeEvents,
  selectedRequestedEvent,
  storeEventsReservations,
  storeUpcomingEvents,
  setLoadingUpcomingEvents,
  setLoadingLatestEvents,
  storeLatestEvents,
  storeHostedEvents,
  removeEventsFromStore,
  updateEventInStore,
  storeAdminEvents,
  storeEventPageDetails,
} from "../reducers/events";
import { message } from "antd";
import api, { multipartHeader } from "../../api";
import { storePageDetails, switchLoading } from "../reducers/ui";

export const createEvent = (body: any) => async (dispatch: AppDispatch) => {
  try {
    dispatch(switchLoading());

    const {
      data: { success, data },
    } = await api.post("/events", body, {
      headers: multipartHeader(),
    });
    dispatch(switchLoading());

    dispatch(addEventToStore(data));
    message.success("Successfully created Event!");

    return success;
  } catch (err: any) {
    dispatch(switchLoading());
    message.error(err.response.data?.message);
  }
};

export const getEventsById =
  (eventId: string) => async (dispatch: AppDispatch) => {
    try {
      const {
        data: { data },
      } = await api.get(`/events/${eventId}`);
      console.log(data, "dataeee");

      dispatch(storePageDetails(data));
      dispatch(storeEventPageDetails(data));
      return data;
    } catch (err: any) {
      message.error(err.response.data?.message);
      throw err;
    }
  };

export const getAllEvents = () => async (dispatch: AppDispatch) => {
  try {
    const {
      data: { data },
    } = await api.get("/events");
    dispatch(storeEvents(data));
  } catch (err: any) {
    console.log(err, "errrrrroor");
    message.error(err.response.data?.message);
  }
};

export const getAllHostedEvents = () => async (dispatch:AppDispatch) => {
  try {
    const { data } = await api.get("/events/hosted");

    dispatch(storeHostedEvents(data.data));

    return data;
  } catch (err: any) {
    message.error(err.response.data?.message);
  }
};

export const getEventReservations = () => async (dispatch: AppDispatch) => {
  try {
    const {
      data: { data },
    } = await api.get("/events/reservations");

    dispatch(storeEventsReservations(data));
  } catch (err: any) {
    message.error(err.response.data?.message);
  }
};

export const getEventRequestById = (requestId: number) => async () => {
  try {
    const { data } = await api.get(`/events/request/${requestId}`);
    console.log(data);
  } catch (err: any) {
    message.error(err.response.data?.message);
  }
};

export const deleteEvent = (eventId: number) => async (dispatch: AppDispatch) => {
  try {
    await api.delete(`/events/${eventId}`);
   dispatch(removeEventsFromStore(eventId));
    message.success("Successfully deleted a Event!");
  } catch (err: any) {
    message.error(err.response.data?.message);
  }
};

export const requestAEvent = (eventListingId: string) => async () => {
  try {
    await api.post(`/events/request`, { eventListingId });

    message.success("Successfully requested a Event!");
  } catch (err: any) {
    message.error(err.response.data?.message);
  }
};

export const getrequestedEvent =
  (eventListingId: string) => async (dispatch: AppDispatch) => {
    try {
      const { data } = await api.get(`/events/request/${eventListingId}`);
      dispatch(selectedRequestedEvent(data));
    } catch (err: any) {
      message.error(err.response.data?.message);
    }
  };

export const approveRequestedEvent =
  (eventListingId: string, eventRequestId: string, status: string) =>
  async () => {
    try {
      await api.put(`/events/request/approve`, {
        eventListingId,
        eventRequestId,
        status,
      });

      message.success("Successfully approved the request!");
    } catch (err: any) {
      message.error(err.response.data?.message);
    }
  };
  export const getUpcomingEvents = () => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoadingUpcomingEvents(true));
      const response = await api.get("/explore/eventsupcoming");
      console.log("📦 Full API Response:", response);
  
      const events = response.data?.data || response.data; // Safe fallback
      dispatch(storeUpcomingEvents(events));
    } catch (err: any) {
      console.error("API Error:", err);
      message.error(err.response?.data?.message || "Failed to fetch upcoming events");
    } finally {
      dispatch(setLoadingUpcomingEvents(false));
    }
  };
  export const getLatestEvents = () => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoadingLatestEvents(true));
  
      // No need for Promise.all with only one request
      const response = await api.get("/explore/latestevents");  
      const latestEvents = response.data?.data || response.data;
      dispatch(storeLatestEvents(latestEvents));
    } catch (err: any) {
      console.error("API Error:", err);
      message.error(err.response?.data?.message || "Failed to fetch latest events");
    } finally {
      dispatch(setLoadingLatestEvents(false));
    }
  };

export const getEventById = (eventId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(switchLoading());
    const response = await api.get(`/events/${eventId}`);
    console.log(response.data.data, "responsesssss");

    dispatch(switchLoading());
    return response;
  } catch (err: any) {
    dispatch(switchLoading());
    throw err;
  }
};

// Utility to recursively append nested fields to FormData using bracket notation
function appendFormData(formData: FormData, data: any, parentKey: string = '') {
  if (data && typeof data === 'object' && !(data instanceof File)) {
    Object.keys(data).forEach(key => {
      const value = data[key];
      const formKey = parentKey ? `${parentKey}[${key}]` : key;
      if (Array.isArray(value)) {
        // Special case for 'files' key: append each file as 'files'
        if (formKey === 'files') {
          value.forEach((item) => {
            formData.append('files', item);
          });
        } else {
          value.forEach((item, idx) => {
            appendFormData(formData, item, `${formKey}[${idx}]`);
          });
        }
      } else if (value instanceof File) {
        formData.append(formKey, value);
      } else if (typeof value === 'object' && value !== null) {
        appendFormData(formData, value, formKey);
      } else if (value !== undefined) {
        formData.append(formKey, value);
      }
    });
  } else if (data !== undefined) {
    formData.append(parentKey, data);
  }
}

export const updateEvent = (body: any, eventId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(switchLoading());
    
    // Build FormData from the diff object using bracket notation for nested fields
    const formData = new FormData();
    appendFormData(formData, body);
  

    console.log('Updating event with body:', body);
    console.log('Updating event with body:', formData);
    
    const { data: { success, data } } = await api.patch(`/events/${eventId}`, formData);
    dispatch(switchLoading());
    
    // Ensure we have valid data before updating the store
    if (data && typeof data === 'object') {
      const updatePayload = {
        id: parseInt(eventId),
        ...data
      };
      console.log('Updating event in store with payload:', updatePayload);
      dispatch(updateEventInStore(updatePayload));
    } else {
      console.warn('Invalid data received from API:', data);
      // Still update with just the ID to mark as updated
      dispatch(updateEventInStore({ id: parseInt(eventId) }));
    }
    
    message.success("Successfully updated Event!");

    return success;
  } catch (err: any) {
    dispatch(switchLoading());
    message.error(err.response?.data?.message || "Failed to update event.");
    console.log(err, "errrrrr");
    return false;
  }
};

// Verify event action
export const verifyEvent = async (eventId: string, verifyMessage: string, isVerified: boolean) => {
  try {
    const { data } = await api.patch(`/events/admin/verify/${eventId}`, {
      isVerified,
      message: verifyMessage,
    });
    message.success("Event verified successfully");
    return { success: true, data };
  } catch (err: any) {
    message.error(err.response?.data?.message || "Failed to verify event");
    return { success: false, error: err.response?.data?.message || err.message };
  }
};

// New action to fetch all admin events with pagination
export const getAllAdminEvents = (page = 1, limit = 10) => async (dispatch: AppDispatch) => {
  try {
    const response = await api.get(`/events/admin/all-events?page=${page}&limit=${limit}`);
    const { events, pagination } = response.data.data;
    dispatch(storeAdminEvents({ events, pagination }));
  } catch (err: any) {
    message.error(err.response?.data?.message || "Failed to fetch admin events");
  }
};

// Action to update event status
export const updateEventStatus = (eventId: string, status: string) => async (dispatch: AppDispatch) => {
  try {
    console.log('Updating event status:', eventId, status);
    
    const response = await api.patch(`/events/${eventId}`, { status });
    console.log('API response:', response);
    
    // Handle different possible response structures
    const responseData = response.data;
    const success = responseData?.success || responseData?.data?.success || true;
    
    if (success) {
      const updatePayload = {
        id: parseInt(eventId),
        status: status // Use the status we sent, not from response
      };
      console.log('Updating store with payload:', updatePayload);
      dispatch(updateEventInStore(updatePayload));
      message.success("Event status updated successfully!");
      return true;
    }
    
    return false;
  } catch (err: any) {
    console.error('Error updating event status:', err);
    message.error(err.response?.data?.message || "Failed to update event status");
    return false;
  }
};