import api from "../api";

const setAuthToken = (token: string | undefined) => {
  if (token) {
    api.defaults.headers.common["authorization"] = `Bearer ${token}`;
    localStorage.setItem("token", token);
  } else {
    delete api.defaults.headers.common["authorization"];
    localStorage.removeItem("token");
  }
};

export default setAuthToken;
