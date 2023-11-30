import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utility/api";
import { isLoadingFalse, isLoadingTrue } from "../redux/modules/productSlice";
import { Product } from "../models/product.type";
import { ErrorType } from "../models/error.types";

export const getProductSearch = createAsyncThunk(
  "product",
  async (
    searchQuery: {
      page: string;
      name?: string;
      category?: string;
      setProductsList: React.Dispatch<React.SetStateAction<Product[] | []>>;
      setTotalPageNum: React.Dispatch<React.SetStateAction<number | null>>;
    },
    { dispatch }
  ) => {
    try {
      dispatch(isLoadingTrue());

      const { page, name, category, setProductsList, setTotalPageNum } =
        searchQuery;

      const response = await api.get(`/product`, {
        params: { page, name, category, PAGE_SIZE: 3 },
      });

      if (response?.status !== 200) {
        throw response;
      }
      setProductsList((pre) => pre && [...pre, ...response.data.products]);

      setTotalPageNum(response.data.totalPageNum);
      dispatch(isLoadingFalse());
    } catch (error) {
      const typeError = error as ErrorType;
    }
  }
);
