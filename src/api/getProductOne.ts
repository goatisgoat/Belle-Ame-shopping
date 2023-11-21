import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utility/api";
import { getProductOneFc } from "../redux/modules/productSlice";
import { ErrorType } from "../models/error.types";

export const getProductOne = createAsyncThunk(
  "product",
  async (
    detail: {
      id: string;
    },
    { dispatch }
  ) => {
    try {
      const { id } = detail;
      const response = await api.get(`/product/${id}`);

      if (response?.status !== 200) {
        throw response;
      }

      dispatch(
        getProductOneFc({
          productOne: response.data.productOne,
        })
      );
    } catch (error) {
      const typeError = error as ErrorType;
    }
  }
);
