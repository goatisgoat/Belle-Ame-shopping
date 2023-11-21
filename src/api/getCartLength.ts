import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utility/api";
import { getCartLengthFc } from "../redux/modules/cartSlice";
import { ErrorType, RejectedError } from "../models/error.types";
import { handleApiError } from "../utility/apiHelper";
import { NavigateFunction } from "react-router-dom";

export const getCartLength = createAsyncThunk(
  "cart",
  async (
    cartData: {
      navigate: NavigateFunction;
    },
    { dispatch }
  ) => {
    try {
      const response = await api.get("/cart/qty");

      if (response.status !== 200) {
        throw response;
      }

      dispatch(getCartLengthFc(response.data.cartLength));
    } catch (error) {
      const { navigate } = cartData;
      const typeError = error as ErrorType;

      if ((error as RejectedError).specialError) {
        const errorMessage = (error as RejectedError)?.error;
        handleApiError(errorMessage, dispatch, navigate);
        return;
      }
    }
  }
);
