/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { EventTypes } from "../../lib/types/events";
import { initEventDetailsState } from "../../lib/constants/events";
import { EventModel } from "../../types/event";

interface IinitialState {
  hosted?: EventTypes[];
  events: EventModel[];
  reservations: any[];
  eventsReviews: any[];
  addEventsDetails: EventModel;
  selectedRequestedEvent?: any;
  upcomingEvents: EventModel[]; // <-- Correct type
  loadingUpcomingEvents: boolean;
  latestEvents: any[];
  loadingLatestEvents: boolean;
  // New admin events state
  adminEvents?: EventModel[];
  adminEventsPagination?: any;
  selectedDates: import("../../types/event").DateRangeModel[]; // <-- Add this line
}

const initialState: IinitialState = {
  hosted: [],
  events: [],
  reservations: [],
  eventsReviews: [],
  latestEvents: [],
  addEventsDetails: initEventDetailsState,
  selectedRequestedEvent: [],
  upcomingEvents: [],
  loadingUpcomingEvents: false,
  loadingLatestEvents: false,
  // New admin events state
  adminEvents: [],
  adminEventsPagination: {},
  selectedDates: [], // <-- Add this line
};

const eventSlice = createSlice({
  initialState,
  name: "events",
  reducers: {
    storeHostedEvents: (state, { payload }) => {
      return {
        ...state,
        hosted: payload,
      };
    },

    // Add to reducers
    setLoadingUpcomingEvents: (state, action: PayloadAction<boolean>) => {
      state.loadingUpcomingEvents = action.payload;
    },
    storeUpcomingEvents: (state, action: PayloadAction<EventModel[]>) => {
      state.upcomingEvents = action.payload;
    },
    setLoadingLatestEvents(state, action: PayloadAction<boolean>) {
      state.loadingLatestEvents = action.payload;
    },
    storeLatestEvents(state, action: PayloadAction<any[]>) {
      state.latestEvents = action.payload;
    },
    storeEventsReservations: (state, { payload }) => {
      return {
        ...state,
        reservations: payload,
      };
    },
    storeEvents: (state, { payload }: PayloadAction<EventModel[]>) => {
      // Ensure payload is an array
      if (Array.isArray(payload)) {
        state.events = payload;
      } else {
        console.warn('storeEvents received non-array payload:', payload);
        state.events = [];
      }
    },
    addEventToStore: (state, { payload }) => {
      // Ensure state.events is an array before spreading
      if (Array.isArray(state.events)) {
        const updatedPlaces = [...state.events, payload];
        state.events = updatedPlaces;
      } else {
        console.warn('state.events is not an array in addEventToStore, resetting');
        state.events = [payload];
      }
    },
    removeEventsFromStore: (state, { payload }) => {
      // Ensure state.events is an array before filtering
      if (Array.isArray(state.events)) {
        const updatedPlaces = state.events.filter(({ id }) => id !== payload);
        state.events = updatedPlaces;
      } else {
        console.warn('state.events is not an array in removeEventsFromStore, resetting');
        state.events = [];
      }
    },
    updateEventInStore: (state, { payload }) => {
      console.log('updateEventInStore called with payload:', payload);
      console.log('Current state.events:', state.events);
      console.log('Current state.hosted:', state.hosted);
      
      // Update event in hosted events list
      if (state.hosted && Array.isArray(state.hosted)) {
        const eventIndex = state.hosted.findIndex((event: any) => event.id === payload.id);
        if (eventIndex !== -1) {
          state.hosted[eventIndex] = { ...state.hosted[eventIndex], ...payload };
        }
      }
      
      // Update event in events list - ensure it's an array
      if (Array.isArray(state.events)) {
        const eventIndex = state.events.findIndex((event) => event.id === payload.id);
        if (eventIndex !== -1) {
          state.events[eventIndex] = { ...state.events[eventIndex], ...payload };
        }
      } else {
        // If state.events is not an array, reset it to an empty array
        console.warn('state.events is not an array, resetting to empty array. Current value:', state.events);
        state.events = [];
      }
    },
    storeEventsReviews: (state, { payload }) => {
      state.eventsReviews = [...state.eventsReviews, payload];
    },
    removeEventsReviews: (state, { payload }) => {
      const updatedPlaces = state.eventsReviews.filter(
        (id: any) => id !== payload
      );
      state.eventsReviews = updatedPlaces;
    },
    storeEventPageDetails: (state, { payload }) => {
      state.addEventsDetails = payload;
    },
    storeNewEventDetails: (
      state,
      { payload }: PayloadAction<typeof initialState.addEventsDetails>
    ) => {
      if (payload.id !== undefined) {
        // Preserve location if payload.location is "" but previous state has a value
        const preserveLocation =
          payload.location === "" && state.addEventsDetails.location !== ""
            ? state.addEventsDetails.location
            : payload.location;

        state.addEventsDetails = {
          ...payload,
          location: preserveLocation,
          // Ensure nested objects are properly set
          onlineEvent: {
            ...initEventDetailsState.onlineEvent,
            ...(payload.onlineEvent || {}),
          },
          onsiteEvent: {
            ...initEventDetailsState.onsiteEvent,
            ...(payload.onsiteEvent || {}),
          },
        };
      }
    },
    selectedRequestedEvent: (state, { payload }) => {
      return {
        ...state,
        selectedRequestedEvent: payload,
      };
    },
    clearEvents: (state) => {
      state.hosted = [];
      state.events = [];
      state.selectedRequestedEvent = [];
      state.addEventsDetails = initEventDetailsState;
    },
    storeAdminEvents: (state, { payload }) => {
      state.adminEvents = payload.events;
      state.adminEventsPagination = payload.pagination;
    },
    storeSelectedDates: (state, action: PayloadAction<import("../../types/event").DateRangeModel[]>) => {
      state.selectedDates = action.payload;
    },
    clearSelectedDates: (state) => {
      state.selectedDates = [];
    },
  },
});

export const {
  clearEvents,
  storeEvents,
  addEventToStore,
  storeHostedEvents,
  storeEventsReviews,
  removeEventsReviews,
  storeNewEventDetails,
  removeEventsFromStore,
  selectedRequestedEvent,
  storeEventsReservations,
  storeUpcomingEvents,
  setLoadingUpcomingEvents, //  new export
  setLoadingLatestEvents,
  storeLatestEvents,
  updateEventInStore,
  storeAdminEvents, // <-- Export new action
  storeEventPageDetails,
  storeSelectedDates,
  clearSelectedDates,
} = eventSlice.actions;

export default eventSlice.reducer;
