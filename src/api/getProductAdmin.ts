import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utility/api";
import { getProductListAdmin } from "../redux/modules/productSlice";

export const getProductAdmin = createAsyncThunk(
  "product",
  async (
    searchQuery: {
      page?: string;
      name?: string;
    },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const response = await api.get(`/product`, {
        params: { ...searchQuery, PAGE_SIZE: 3 },
      });

      if (response?.status !== 200) {
        const errorMessage = response as any;
        throw errorMessage.error;
      }

      dispatch(
        getProductListAdmin({
          products: response.data.products,
          totalPageNum: response.data.totalPageNum,
        })
      );
    } catch (error) {
      const err = error as string;
      return rejectWithValue(error);
    }
  }
);
