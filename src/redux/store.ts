import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./reducers/auth";
import uiReducer from "./reducers/ui";
import placeReducer from "./reducers/places";
import eventsReducer from "./reducers/events";
import userReducer from "./reducers/users";
import paymentReducer from "./reducers/payment";
import reservationCache from "./reducers/reservationCache";
import { transactionsApi } from './features/transactionsApi';
import { getPaymentPrices } from './features/paymentSettingsApi';
import { usersApi } from './features/usersApi';
import { messageApi } from './features/messageApi';
import { payoutsApi } from './features/payoutsApi';

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "events"], // Persist auth and events state
};

const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  events: eventsReducer,
  places: placeReducer,
  users: userReducer,
  payment: paymentReducer,
  reservationCache, // <-- added
  [transactionsApi.reducerPath]: transactionsApi.reducer,
  [getPaymentPrices.reducerPath]: getPaymentPrices.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [messageApi.reducerPath]: messageApi.reducer,
  [payoutsApi.reducerPath]: payoutsApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      transactionsApi.middleware,
      getPaymentPrices.middleware,
      usersApi.middleware,
      messageApi.middleware,
      payoutsApi.middleware
    ),
});

export const persistor = persistStore(store);

export type RootAppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
