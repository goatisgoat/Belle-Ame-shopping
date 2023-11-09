import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utility/api";
import { InitialNewProduct } from "../models/product.type";
import { createToastify } from "../redux/modules/toastifySlice";
import { getProductAdmin } from "./getProductAdmin";

export const updateProduct = createAsyncThunk(
  "product",
  async (
    productData: {
      combined: InitialNewProduct;
      setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
      editProductId: string;
      searchQuery: { [key: string]: string };
    },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const { combined, setIsModalOpen, editProductId, searchQuery } =
        productData;

      const response = await api.put(`/product/${editProductId}`, combined);

      if (response.status !== 200) {
        const errorMessage = response as any;
        throw errorMessage.error;
      }

      dispatch(
        createToastify({ status: "success", message: "제품이 수정되었습니다." })
      );

      setIsModalOpen(false);
      dispatch(getProductAdmin({ ...searchQuery }));
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
