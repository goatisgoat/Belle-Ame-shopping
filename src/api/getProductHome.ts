import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utility/api";
import { isLoadingFalse, isLoadingTrue } from "../redux/modules/productSlice";
import { Product } from "../models/product.type";
import { ErrorType } from "../models/error.types";

export const getProductHome = createAsyncThunk(
  "product",
  async (
    searchQuery: {
      page: number;
      setSliceProduct: React.Dispatch<React.SetStateAction<Product[]>>;
    },
    { dispatch }
  ) => {
    try {
      dispatch(isLoadingTrue());
      const { page, setSliceProduct } = searchQuery;

      const response = await api.get(`/product`, {
        params: { page, PAGE_SIZE: 6 },
      });

      if (response?.status !== 200) {
        throw response;
      }
      setSliceProduct(response.data.products);
      dispatch(isLoadingFalse());
    } catch (error) {
      const typeError = error as ErrorType;
    }
  }
);
