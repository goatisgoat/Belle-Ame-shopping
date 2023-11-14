import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utility/api";
import { isLoadingFalse, isLoadingTrue } from "../redux/modules/productSlice";
import { Product } from "../models/product.type";

export const getProductHome = createAsyncThunk(
  "product",
  async (
    searchQuery: {
      page: string;
      name?: string;
      setProductsList: React.Dispatch<React.SetStateAction<Product[] | []>>;
      setTotalPageNum: React.Dispatch<React.SetStateAction<number | null>>;
    },
    { rejectWithValue, dispatch }
  ) => {
    try {
      dispatch(isLoadingTrue());

      const { page, name, setProductsList, setTotalPageNum } = searchQuery;

      const response = await api.get(`/product`, {
        params: { page, name, PAGE_SIZE: 3 },
      });

      if (response?.status !== 200) {
        const errorMessage = response as any;
        throw errorMessage.error;
      }
      setProductsList((pre) => pre && [...pre, ...response.data.products]);

      setTotalPageNum(response.data.totalPageNum);
      dispatch(isLoadingFalse());
    } catch (error) {
      const err = error as string;
      return rejectWithValue(error);
    }
  }
);
