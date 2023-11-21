import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utility/api";
import { useNavigate } from "react-router-dom";
import { userInfo } from "../redux/modules/userSlice";
import { createToastify } from "../redux/modules/toastifySlice";
import { ErrorType } from "../models/error.types";

export const loginWithKakao = createAsyncThunk(
  "login",
  async (
    loginData: {
      code: string;
      navigate: ReturnType<typeof useNavigate>;
    },
    { dispatch }
  ) => {
    try {
      const { code, navigate } = loginData;

      const response = await api.post("/user/kakao", { code });

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
