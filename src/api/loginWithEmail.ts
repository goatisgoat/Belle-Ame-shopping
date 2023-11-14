import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utility/api";
import { useNavigate } from "react-router-dom";
import { userInfo } from "../redux/modules/userSlice";
import { createToastify } from "../redux/modules/toastifySlice";

export const loginWithEmail = createAsyncThunk(
  "login",
  async (
    loginData: {
      email: string;
      password: string;
      navigate: ReturnType<typeof useNavigate>;
    },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const { email, password, navigate } = loginData;

      const response = await api.post("/user/login", { email, password });

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
