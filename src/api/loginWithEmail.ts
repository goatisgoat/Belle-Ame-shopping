import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utility/api";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { userInfo } from "../redux/modules/userSlice";
import { createToastify } from "../redux/modules/toastifySlice";
import { ErrorType } from "../models/error.types";

export const loginWithEmail = createAsyncThunk(
  "login",
  async (
    loginData: {
      email: string;
      password: string;
      navigate: NavigateFunction;
    },
    { dispatch }
  ) => {
    try {
      const { email, password, navigate } = loginData;

      const response = await api.post("/user/login", { email, password });

      if (response.status !== 200) {
        throw response;
      }

      dispatch(userInfo(response.data.user));
      sessionStorage.setItem("accessToken", response.data.accessToken);
      sessionStorage.setItem("refreshToken", response.data.refreshToken);

      navigate("/");
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
