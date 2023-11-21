import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utility/api";
import { createToastify } from "../redux/modules/toastifySlice";
import { ErrorType, RejectedError } from "../models/error.types";
import { handleApiError } from "../utility/apiHelper";
import { NavigateFunction } from "react-router-dom";

export const deleteProduct = createAsyncThunk(
  "product",
  async (
    productData: {
      deleteProductId: string;
      navigate: NavigateFunction;
    },
    { dispatch }
  ) => {
    try {
      const { deleteProductId } = productData;
      const response = await api.delete(`/product/${deleteProductId}`);

      if (response.status !== 200) {
        throw response;
      }

      dispatch(
        createToastify({ status: "success", message: "제품이 삭제되었습니다." })
      );
    } catch (error) {
      const { navigate } = productData;
      const typeError = error as ErrorType;

      if ((error as RejectedError).specialError) {
        const errorMessage = (error as RejectedError)?.error;
        handleApiError(errorMessage, dispatch, navigate);
        return;
      }

      dispatch(
        createToastify({
          status: "error",
          message: typeError.error,
        })
      );
    }
  }
);
