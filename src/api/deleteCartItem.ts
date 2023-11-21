import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utility/api";
import { createToastify } from "../redux/modules/toastifySlice";
import { minusCartLength } from "../redux/modules/cartSlice";
import { getMyCart } from "./getMyCart";
import { NavigateFunction } from "react-router-dom";
import { ErrorType, RejectedError } from "../models/error.types";
import { handleApiError } from "../utility/apiHelper";

export const deleteCartItem = createAsyncThunk(
  "cart",
  async (
    cartData: {
      cartId: string;
      navigate: NavigateFunction;
    },
    { dispatch }
  ) => {
    try {
      const { cartId, navigate } = cartData;
      const response = await api.put("/cart/delete", { cartId });

      if (response.status !== 200) {
        throw response;
      }

      dispatch(minusCartLength());
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
