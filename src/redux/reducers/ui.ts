/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

interface Iinterface {
  OpenModalInput: boolean;
  detailsPage: any;
  SnackBar: { messageType: "success"; feedback: ""; openSnackbar: false };
  Block: { blockFlag: false; blockMessage: string; spinner: string };
  loading: boolean;
}

const initialState: Iinterface = {
  OpenModalInput: false,
  detailsPage: null,
  SnackBar: { messageType: "success", feedback: "", openSnackbar: false },
  Block: { blockFlag: false, blockMessage: "Loading", spinner: "loader" },
  loading: false,
};

const UiSlice = createSlice({
  initialState,
  name: "ui",
  reducers: {
    switchLoading: (state) => {
      return {
        ...state,
        loading: !state.loading,
      };
    },
    storePageDetails: (state, { payload }) => {
      state.detailsPage = payload;
    },
  },
});

export const { switchLoading, storePageDetails } = UiSlice.actions;
export default UiSlice.reducer;
