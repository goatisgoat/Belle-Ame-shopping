import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utility/api";
import { createToastify } from "../redux/modules/toastifySlice";
import { getMyCart } from "./getMyCart";
import { NavigateFunction } from "react-router-dom";
import { ErrorType, RejectedError } from "../models/error.types";
import { handleApiError } from "../utility/apiHelper";

export const updateCartQty = createAsyncThunk(
  "cart",
  async (
    cartData: {
      cartId: string;
      type: string;
      navigate: NavigateFunction;
    },
    { dispatch }
  ) => {
    try {
      const { cartId, type, navigate } = cartData;
      const response = await api.put("/cart/update", { cartId, type });

      if (response.status !== 200) {
        throw response;
      }

      dispatch(getMyCart({ navigate }));
    } catch (error) {
      const { navigate } = cartData;
      const typeError = error as ErrorType;

      if ((error as RejectedError).specialError) {
        const errorMessage = (error as RejectedError)?.error;
        handleApiError(errorMessage, dispatch, navigate);
        return;
      }

      //일반에러
      dispatch(
        createToastify({
          status: "error",
          message: typeError.error,
        })
      );
    }
  }
);
