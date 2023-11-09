import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utility/api";
import { createToastify } from "../redux/modules/toastifySlice";

export const createOrder = createAsyncThunk(
  "order",
  async (orderData: {}, { rejectWithValue, dispatch }) => {
    try {
      const {} = orderData;

      // const response = await api.post("/order", {  });

      // if (response.status !== 200) {
      //   const errorMessage = response as any;
      //   throw errorMessage.error;
      // }

      // dispatch(getCartLength(response.data.cartItemLength));

      dispatch(
        createToastify({
          status: "success",
          message: "주문이 완료되었습니다.",
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
