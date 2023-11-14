import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utility/api";
import { createToastify } from "../redux/modules/toastifySlice";
import { getCartLengthFc } from "../redux/modules/cartSlice";

export const getCartLength = createAsyncThunk(
  "cart",
  async (cartData: {}, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.get("/cart/qty");

      if (response.status !== 200) {
        const errorMessage = response as any;
        throw errorMessage.error;
      }

      dispatch(getCartLengthFc(response.data.cartLength));
    } catch (error) {
      const err = error as string;
      return rejectWithValue(error);
    }
  }
);
