import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utility/api";
import { userInfo } from "../redux/modules/userSlice";

export const authUser = createAsyncThunk(
  "auth",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.get(`/user/auth/me`);
      if (response.status !== 200) {
        const errorMessage = response as any;
        //임시
        alert(errorMessage.error);
        throw errorMessage.error;
      }
      dispatch(userInfo(response.data.user));
    } catch (error) {
      const err = error as string;

      return rejectWithValue(error);
    }
  }
);
