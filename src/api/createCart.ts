import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utility/api";
import { createToastify } from "../redux/modules/toastifySlice";
import { getCartLengthFc } from "../redux/modules/cartSlice";
import { ErrorType, RejectedError } from "../models/error.types";
import { NavigateFunction } from "react-router-dom";
import { handleApiError } from "../utility/apiHelper";

export const createCart = createAsyncThunk(
  "cart",
  async (
    cartData: {
      productId: string | undefined;
      size: string;
      qty: number;
      navigate: NavigateFunction;
    },
    { dispatch }
  ) => {
    try {
      const { productId, size, qty } = cartData;

      const response = await api.post("/cart", { productId, size, qty });

      if (response.status !== 200) {
        throw response;
      }

      dispatch(getCartLengthFc(response.data.cartItemLength));
      dispatch(
        createToastify({
          status: "success",
          message: "카트에 상품이 추가됐습니다.",
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
