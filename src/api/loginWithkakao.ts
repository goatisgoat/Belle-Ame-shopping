import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utility/api";
import { useNavigate } from "react-router-dom";
import { userInfo } from "../redux/modules/userSlice";
import { createToastify } from "../redux/modules/toastifySlice";

export const loginWithKakao = createAsyncThunk(
  "login",
  async (
    loginData: {
      code: string;
      navigate: ReturnType<typeof useNavigate>;
    },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const { code, navigate } = loginData;

      const response = await api.post("/user/kakao", { code });

      if (response.status !== 200) {
        const errorMessage = response as any;
        throw errorMessage.error;
      }

      dispatch(userInfo(response.data.user));
      sessionStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error) {
      const err = error as string;
      dispatch(
        createToastify({
          status: "error",
          message: err,
        })
      );
      return rejectWithValue(error);
    }
  }
);
