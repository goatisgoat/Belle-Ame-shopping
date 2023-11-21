import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utility/api";
import { InitialNewProduct } from "../models/product.type";
import { createToastify } from "../redux/modules/toastifySlice";
import { getProductAdmin } from "./getProductAdmin";
import { NavigateFunction } from "react-router-dom";
import { ErrorType, RejectedError } from "../models/error.types";
import { handleApiError } from "../utility/apiHelper";

export const updateProduct = createAsyncThunk(
  "product",
  async (
    productData: {
      combined: InitialNewProduct;
      setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
      editProductId: string;
      searchQuery: { [key: string]: string };
      navigate: NavigateFunction;
    },
    { dispatch }
  ) => {
    try {
      const { combined, setIsModalOpen, editProductId, searchQuery } =
        productData;

      const response = await api.put(`/product/${editProductId}`, combined);

      if (response.status !== 200) {
        throw response;
      }

      dispatch(
        createToastify({ status: "success", message: "제품이 수정되었습니다." })
      );

      setIsModalOpen(false);
      dispatch(getProductAdmin({ ...searchQuery }));
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
