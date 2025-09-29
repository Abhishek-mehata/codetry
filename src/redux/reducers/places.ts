/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IinitialState,
  MarkedLocation,
  RoomModel,
  Place,
} from "../../types/places";
import { placeInitState } from "../../lib/constants/stays";

const initialState: IinitialState = {
  places: [],
  sellerPlaces: [],
  rooms: [],
  bookedRooms: [],
  bookRoomsIds: [],
  placeReviews: [],
  addPlaceDetails: placeInitState,
  mapMarkedLocation: {
    continent: "",
    country: "",
    district: "",
    state: "",
    city: "",
    address: "",
    postalCode: 0,
    geometry: {
      lat: 0,
      lng: 0,
    },
  },
  activePlaces: [],
  latestPlaces: [],                // ✅ Add this
  loadingLatestPlaces: false, 
  reservedRooms: [],
  incompleteStay: null
};

const placeSlice = createSlice({
  initialState,
  name: "places",
  reducers: {
    setIncompleteStay: (state, { payload }: PayloadAction<{ placeId: number; incomplete: boolean }>) => {
      state.incompleteStay = payload;
    },
    storePlaces: (state, action: PayloadAction<Place[]>) => {
      state.loadingLatestPlaces = false; 
      state.places = action.payload; // ✅ Update state correctly
    },
    storeSellerPlaces: (state, { payload }: PayloadAction<Place[]>) => {
      state.loadingLatestPlaces = false;
      state.sellerPlaces = payload;
    },
    storeActivePlaces: (state, { payload }) => {
      state.activePlaces = payload;
    },
    setMapMarkedLocation: (
      state,
      { payload }: PayloadAction<MarkedLocation>
    ) => {
      state.mapMarkedLocation = payload;
    },
    storeLatestPlaces: (state, action: PayloadAction<Place[]>) => {
      state.latestPlaces = action.payload;
    },
    setLoadingLatestPlaces: (state, action: PayloadAction<boolean>) => {
      state.loadingLatestPlaces = action.payload;
    },
    storeNewPlaceDetails: (
      state,
      { payload }: PayloadAction<typeof initialState.addPlaceDetails>
    ) => {
      state.addPlaceDetails = { ...state.addPlaceDetails, ...payload };
    },
    storeBookedRooms: (state, { payload }) => {
      state.bookedRooms = [...state.bookedRooms, payload];
    },
    clearBookedRooms: (state) => {
      state.bookedRooms = [];
    },
    storeBookRoomsIds: (state, { payload }) => {
      const doesExists = state.bookRoomsIds.filter((id) => id === payload);

      if (doesExists.length) return;
      const updatedBookedRoomsIds = [...state.bookRoomsIds, payload];
      state.bookRoomsIds = updatedBookedRoomsIds;
    },
    removeBookRooms: (state, { payload }) => {
      const updatedPlaces = state.bookRoomsIds.filter((id) => id !== payload);
      state.bookRoomsIds = updatedPlaces;
    },
    clearBookRoomsIds: (state) => {
      state.bookRoomsIds = [];
    },
    storePlaceReviews: (state, { payload }) => {
      state.placeReviews = [...state.placeReviews, payload];
    },
    removePlaceReviews: (state, { payload }) => {
      const updatedPlaces = state.placeReviews.filter(
        (id: any) => id !== payload
      );
      state.placeReviews = updatedPlaces;
    },
    addPlaceToStore: (state, { payload }) => {
      const updatedPlaces = [...state.places, payload];
      const updatedSellerPlaces = [...state.sellerPlaces, payload];

      state.places = updatedPlaces;
      state.sellerPlaces = updatedSellerPlaces;
    },
    removeSellerPlacesFromStore: (state, { payload }) => {
      const updatedPlaces = state.sellerPlaces.filter(
        ({ id }) => id !== payload
      );
      state.sellerPlaces = updatedPlaces;
    },
    storeRooms: (state, { payload }: PayloadAction<RoomModel[]>) => {
      state.rooms = payload;
    },
    updateRoomInStore: (state, { payload }: PayloadAction<RoomModel>) => {
      const roomIndex = state.rooms.findIndex(room => room.id === payload.id);
      if (roomIndex !== -1) {
        state.rooms[roomIndex] = { ...state.rooms[roomIndex], ...payload };
      }
    },
    clearAddPlaceDetails: (state) => {
      state.addPlaceDetails = placeInitState;
    },
    clearMapMarkedLocation: (state) => {
      state.mapMarkedLocation = {
        continent: "",
        country: "",
        district: "",
        state: "",
        city: "",
        address: "",
        postalCode: 0,
        geometry: {
          lat: 0,
          lng: 0,
        },
      };
    },
    clearPlaces: (state) => {
      state.activePlaces = [];
      state.places = [];
      state.bookRoomsIds = [];
      state.placeReviews = [];
      state.addPlaceDetails = placeInitState;
    },
    reservedRoom:(state,{payload})=>{
      console.log('reservedRoom reducer payload:', payload);
      state.reservedRooms = [...payload];
    }
  },
});

export const {
  storePlaces,
  storeRooms,
  addPlaceToStore,
  storeNewPlaceDetails,
  storeSellerPlaces,
  storeBookRoomsIds,
  removeBookRooms,
  clearBookedRooms,
  storeBookedRooms,
  clearBookRoomsIds,
  clearPlaces,
  storePlaceReviews,
  removePlaceReviews,
  removeSellerPlacesFromStore,
  storeActivePlaces,
  clearAddPlaceDetails,
  clearMapMarkedLocation,
  setMapMarkedLocation,
  storeLatestPlaces,           
  setLoadingLatestPlaces,
  reservedRoom,
  setIncompleteStay,
  updateRoomInStore
} = placeSlice.actions;

export default placeSlice.reducer;
