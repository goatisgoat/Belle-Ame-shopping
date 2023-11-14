import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utility/api";
import { createToastify } from "../redux/modules/toastifySlice";
import { getMyOrderFc } from "../redux/modules/orderSlice";

export const getMyOrder = createAsyncThunk(
  "order",
  async (cartData: {}, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.get("/order");

      console.log(response.data.order, "response");
      if (response.status !== 200) {
        const errorMessage = response as any;
        throw errorMessage.error;
      }

      dispatch(getMyOrderFc(response.data.order));
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
