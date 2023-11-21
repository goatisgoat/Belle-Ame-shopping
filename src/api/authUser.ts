import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utility/api";
import { userInfo } from "../redux/modules/userSlice";
import { createToastify } from "../redux/modules/toastifySlice";
import { ErrorType, RejectedError } from "../models/error.types";
import { Navigate, NavigateFunction } from "react-router-dom";
import { handleApiError } from "../utility/apiHelper";

export const authUser = createAsyncThunk(
  "auth",
  async (
    authData: {
      navigate: NavigateFunction;
    },
    { dispatch }
  ) => {
    try {
      const response = await api.get(`/user/auth/me`);

      if (response.status !== 200) {
        throw response;
      }

      dispatch(userInfo(response.data.user));
    } catch (error) {
      const { navigate } = authData;
      const typeError = error as ErrorType;

      if ((error as RejectedError).specialError) {
        const errorMessage = (error as RejectedError)?.error;
        handleApiError(errorMessage, dispatch, navigate);
        return;
      }

      //일반 에러
      dispatch(
        createToastify({
          status: "error",
          message: typeError.error,
        })
      );
    }
  }
);
