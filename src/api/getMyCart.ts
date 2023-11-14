import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utility/api";
import { createToastify } from "../redux/modules/toastifySlice";
import { getMyCartFc } from "../redux/modules/cartSlice";

export const getMyCart = createAsyncThunk(
  "cart",
  async (cartData: {}, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.get("/cart");

      if (response.status !== 200) {
        const errorMessage = response as any;
        throw errorMessage.error;
      }

      dispatch(
        getMyCartFc({
          cartList: response.data.cart.items,
          cartLength: response.data.cart.items.length,
        })
      );
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
