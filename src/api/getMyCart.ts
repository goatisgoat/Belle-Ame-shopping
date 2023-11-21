import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utility/api";
import { createToastify } from "../redux/modules/toastifySlice";
import { getMyCartFc } from "../redux/modules/cartSlice";
import { NavigateFunction } from "react-router-dom";
import { ErrorType, RejectedError } from "../models/error.types";
import { handleApiError } from "../utility/apiHelper";

export const getMyCart = createAsyncThunk(
  "cart",
  async (cartData: { navigate: NavigateFunction }, { dispatch }) => {
    try {
      const response = await api.get(`/cart`);

      if (response.status !== 200) {
        throw response;
      }

      dispatch(
        getMyCartFc({
          cartList: response.data.cart.items,
          cartLength: response.data.cart.items.length,
        })
      );
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
