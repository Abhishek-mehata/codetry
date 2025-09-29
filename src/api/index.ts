import axios from "axios";

// 🔁 Dynamic headers that always fetch the latest values
export const getHttpHeader = () => {
  const token = localStorage.getItem("token") || localStorage.getItem("admin-token");
  return {
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`,
  };
};

export const multipartHeader  = () => {
  const token = localStorage.getItem("token") || localStorage.getItem("admin-token");
  return {
    "Content-Type": "multipart/form-data",
    authorization: `Bearer ${token}`,
  };
};

// 📦 Image storage endpoint
export const ImageAPI: string = "https://eu2.contabostorage.com/2e1511f8f62f49e3916647606460a786:dmt";

// 🚀 Axios instance with baseURL only
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_API,
});

// 🔐 Interceptor to inject fresh token/user_id into each request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token") || localStorage.getItem("admin-token");
    if (token && !["undefined", "null"].includes(token)) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const userId = localStorage.getItem("user_id");
    if (userId) {
      config.headers.User_id = userId;
    }

    // Debug logging
    console.log("API Request:", {
      method: config.method,
      url: config.url,
      baseURL: config.baseURL,
      fullURL: `${config.baseURL}${config.url}`,
      hasToken: !!token,
      userId: userId
    });

    return config;
  },
  (error) => Promise.reject(error)
);

// 🧹 Handle expired tokens and redirect on 401
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       console.error("Token expired! Logging out...");
//       localStorage.removeItem("token");
//       localStorage.removeItem("user_id");
//       window.location.href = "/auth/login";
//     }
//     return Promise.reject(error);
//   }
// );

// Add response logging
api.interceptors.response.use(
  (response) => {
    console.log("API Response:", {
      status: response.status,
      url: response.config.url,
      data: response.data
    });
    return response;
  },
  (error) => {
    console.error("API Error Response:", {
      status: error.response?.status,
      url: error.config?.url,
      data: error.response?.data,
      message: error.message
    });
    
    if (error.response?.status === 401) {
      console.log(error.response, "error.response");
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      // window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);

export default api;
