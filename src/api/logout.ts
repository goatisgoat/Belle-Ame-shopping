import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utility/api";
import { NavigateFunction } from "react-router-dom";
import { userInfo } from "../redux/modules/userSlice";
import { createToastify } from "../redux/modules/toastifySlice";
import { ErrorType } from "../models/error.types";

export const logout = createAsyncThunk(
  "logout",
  async (
    loginData: {
      navigate: NavigateFunction;
    },
    { dispatch }
  ) => {
    try {
      const { navigate } = loginData;

      const response = await api.get("/user/token");

      if (response.status !== 200) {
        throw response;
      }

      dispatch(userInfo({ name: null, email: null, _id: null, level: null }));
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("refreshToken");
    } catch (error) {
      const typeError = error as ErrorType;

      dispatch(
        createToastify({
          status: "error",
          message: typeError.error,
        })
      );
    }
  }
);
