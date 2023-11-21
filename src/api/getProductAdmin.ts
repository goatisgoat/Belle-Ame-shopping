import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utility/api";
import { getProductListAdmin } from "../redux/modules/productSlice";
import { ErrorType } from "../models/error.types";

export const getProductAdmin = createAsyncThunk(
  "product",
  async (
    searchQuery: {
      page?: string;
      name?: string;
    },
    { dispatch }
  ) => {
    try {
      const response = await api.get(`/product`, {
        params: { ...searchQuery, PAGE_SIZE: 3 },
      });

      if (response?.status !== 200) {
        throw response;
      }

      dispatch(
        getProductListAdmin({
          products: response.data.products,
          totalPageNum: response.data.totalPageNum,
        })
      );
    } catch (error) {
      const typeError = error as ErrorType;
    }
  }
);
