import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utility/api";
import { createToastify } from "../redux/modules/toastifySlice";
import { minusCartLength } from "../redux/modules/cartSlice";
import { getCartItem } from "./getCartItem";

export const deleteCartItem = createAsyncThunk(
  "cart",
  async (
    cartData: {
      cartId: string;
    },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const { cartId } = cartData;
      const response = await api.put("/cart/delete", { cartId });

      if (response.status !== 200) {
        const errorMessage = response as any;
        throw errorMessage.error;
      }
      dispatch(minusCartLength());
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
