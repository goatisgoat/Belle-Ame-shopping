import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utility/api";
import { InitialNewProduct } from "../models/product.type";
import { createToastify } from "../redux/modules/toastifySlice";

export const createProduct = createAsyncThunk(
  "product",
  async (
    productData: {
      combined: InitialNewProduct;
      setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const { combined, setIsModalOpen } = productData;

      const response = await api.post("/product", combined);

      if (response.status !== 200) {
        const errorMessage = response as any;
        throw errorMessage.error;
      }

      dispatch(
        createToastify({ status: "success", message: "제품이 생성되었습니다." })
      );

      setIsModalOpen(false);
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
