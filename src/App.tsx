import { Toaster } from "react-hot-toast";
import Router from "./routes";
import "./styles/swiper.css";

import { RootAppState } from "./redux/store";
import { useSelector } from "react-redux";
import { Loader } from "./components";
import { persistor } from "../src/redux/store"
import { useEffect } from "react";
import ScrollToTop from "./components/ScrollToTop";


function App() {
  const loading = useSelector((state: RootAppState) => state.ui.loading);
  const token = useSelector((state: RootAppState) => state.auth.token);

  useEffect(() => {
    if (!token || token === "undefined" || token === "null") {
      persistor.purge(); // Purge auth state only
      localStorage.removeItem("persist:auth");
    }
  }, [token]);

  return (
    <>
      <ScrollToTop />
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{ duration: 5000 }}
        containerClassName="z-999999"
      />
      <Loader className="h-screen" fullWidthLoader={true} loading={loading} />
      <Router />

    </>
  );
}

export default App;
