import axios from "axios";
import { RejectedError } from "../models/error.types";

const LOCAL_BACKEND = process.env.REACT_APP_LOCAL_BACKEND;
const BACKEND_PROXY = process.env.REACT_APP_BACKEND_PROXY;

const api = axios.create({
  baseURL: BACKEND_PROXY,
  headers: {
    "Content-Type": "application/json",
    "access-token": `Bearer ${sessionStorage.getItem("accessToken")}`,
    "refresh-token": `Bearer ${sessionStorage.getItem("refreshToken")}`,
  },
});

api.interceptors.request.use(
  (request) => {
    console.log("Starting Request", request);
    request.headers["access-token"] = `Bearer ${sessionStorage.getItem(
      "accessToken"
    )}`;
    request.headers["refresh-token"] = `Bearer ${sessionStorage.getItem(
      "refreshToken"
    )}`;

    return request;
  },
  function (error) {
    console.log("REQUEST ERROR", error);
  }
);

api.interceptors.response.use(
  (response) => {
    if (response.data.newAccessToken) {
      sessionStorage.setItem("accessToken", response.data.newAccessToken);
    }
    return response;
  },
  function (error) {
    error = error.response.data;

    console.log(error?.code, error.status);

    if (error?.code === 401 || error?.code === 419) {
      console.log("interceptors");
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("refreshToken");

      return Promise.reject({
        specialError: true,
        error: error.error,
      } as RejectedError);
    }

    return error;
  }
);

export default api;
