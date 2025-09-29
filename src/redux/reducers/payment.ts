import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PaymentSettings } from "../../types/payment";

interface PaymentState {
  settings: PaymentSettings[];
  selectedSettingType: string;
  loading: boolean;
  saving: boolean;
}

const initialState: PaymentState = {
  settings: [],
  selectedSettingType: 'room',
  loading: false,
  saving: false,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    storePaymentSettings: (state, action: PayloadAction<PaymentSettings[]>) => {
      state.settings = action.payload;
    },
    setSelectedSettingType: (state, action: PayloadAction<string>) => {
      state.selectedSettingType = action.payload;
    },
    setPaymentSettingsLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setPaymentSettingsSaving: (state, action: PayloadAction<boolean>) => {
      state.saving = action.payload;
    },
    clearPaymentSettings: (state) => {
      state.settings = [];
      state.selectedSettingType = 'room';
    },
  },
});

export const {
  storePaymentSettings,
  setSelectedSettingType,
  setPaymentSettingsLoading,
  setPaymentSettingsSaving,
  clearPaymentSettings,
} = paymentSlice.actions;

export default paymentSlice.reducer; 