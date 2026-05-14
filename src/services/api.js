import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json"
  }
});


// REQUEST INTERCEPTOR
api.interceptors.request.use((config) => {
  console.log(
    `${config.method.toUpperCase()} ${config.url}`
  );

  return config;
});


// RESPONSE INTERCEPTOR
api.interceptors.response.use(

  (response) => response,

  (error) => {

    let message = "Something went wrong";

    if (error.response) {
      message = error.response.data.message;
    } else if (error.request) {
      message = "Server not responding";
    }

    return Promise.reject(message);
  }
);

export default api;