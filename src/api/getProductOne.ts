import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utility/api";
import { getProductOneFc } from "../redux/modules/productSlice";

export const getProductOne = createAsyncThunk(
  "product",
  async (
    detail: {
      id: string;
    },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const { id } = detail;
      const response = await api.get(`/product/${id}`);

      if (response?.status !== 200) {
        const errorMessage = response as any;
        throw errorMessage.error;
      }

      dispatch(
        getProductOneFc({
          productOne: response.data.productOne,
        })
      );
    } catch (error) {
      const err = error as string;
      return rejectWithValue(error);
    }
  }
);
