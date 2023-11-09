import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utility/api";
import { createToastify } from "../redux/modules/toastifySlice";
import { getCartItem } from "./getCartItem";

export const updateCartNum = createAsyncThunk(
  "cart",
  async (
    cartData: {
      cartId: string;
      type: string;
    },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const { cartId, type } = cartData;
      const response = await api.put("/cart/update", { cartId, type });

      if (response.status !== 200) {
        const errorMessage = response as any;
        throw errorMessage.error;
      }

      dispatch(getCartItem({}));
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
