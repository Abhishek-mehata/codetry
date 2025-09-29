import React from "react";
import App from "./App.tsx";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { persistor, store } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";

import "swiper/css";
import "./index.css";
import "leaflet/dist/leaflet.css";
import "react-phone-number-input/style.css";


// import "leaflet-geosearch/dist/geosearch.css";

// import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <GoogleOAuthProvider clientId="109121674626-kt5jcudc4dojra65ka00o1tndo1bgu3r.apps.googleusercontent.com"> */}
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
    {/* </GoogleOAuthProvider> */}
  </React.StrictMode>
);
