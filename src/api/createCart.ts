import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utility/api";
import { createToastify } from "../redux/modules/toastifySlice";
import { getCartLengthFc } from "../redux/modules/cartSlice";

export const createCart = createAsyncThunk(
  "cart",
  async (
    cartData: {
      productId: string | undefined;
      size: string;
      qty: number;
    },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const { productId, size, qty } = cartData;

      const response = await api.post("/cart", { productId, size, qty });

      if (response.status !== 200) {
        const errorMessage = response as any;
        throw errorMessage.error;
      }

      dispatch(getCartLengthFc(response.data.cartItemLength));
      dispatch(
        createToastify({
          status: "success",
          message: "카트에 상품이 추가됐습니다.",
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
