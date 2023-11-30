import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utility/api";
import { InitialNewProduct } from "../models/product.type";
import { createToastify } from "../redux/modules/toastifySlice";
import { NavigateFunction } from "react-router-dom";
import { ErrorType, RejectedError } from "../models/error.types";
import { handleApiError } from "../utility/apiHelper";

export const createProduct = createAsyncThunk(
  "product",
  async (
    productData: {
      combined: InitialNewProduct;
      navigate: NavigateFunction;
    },
    { dispatch }
  ) => {
    try {
      const { combined } = productData;

      const response = await api.post("/product", combined);

      if (response.status !== 200) {
        throw response;
      }

      dispatch(
        createToastify({ status: "success", message: "제품이 생성되었습니다." })
      );
    } catch (error) {
      const { navigate } = productData;
      const typeError = error as ErrorType;

      if ((error as RejectedError).specialError) {
        const errorMessage = (error as RejectedError)?.error;
        handleApiError(errorMessage, dispatch, navigate);
        return;
      }

      //일반에러
      dispatch(
        createToastify({
          status: "error",
          message: typeError.error,
        })
      );
    }
  }
);
