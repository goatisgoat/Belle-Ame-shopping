import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utility/api";
import { createToastify } from "../redux/modules/toastifySlice";

export const deleteProduct = createAsyncThunk(
  "product",
  async (
    productData: {
      deleteProductId: string;
    },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const { deleteProductId } = productData;
      const response = await api.delete(`/product/${deleteProductId}`);

      if (response.status !== 200) {
        const errorMessage = response as any;
        throw errorMessage.error;
      }

      dispatch(
        createToastify({ status: "success", message: "제품이 삭제되었습니다." })
      );
    } catch (error) {
      const err = error as string;
      dispatch(
        createToastify({
          status: "error",
          message: err,
        })
      );
      return rejectWithValue(error);
    }
  }
);
