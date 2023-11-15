import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utility/api";
import { createToastify } from "../redux/modules/toastifySlice";
import { getAllUsersOrder } from "./getAllUsersOrder";

export const updateOrderStatus = createAsyncThunk(
  "order",
  async (
    orderData: {
      orderId: string | undefined;
      status: string | undefined;
      setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
      searchQuery: { [key: string]: string };
    },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const { orderId, status, setIsModalOpen, searchQuery } = orderData;

      const response = await api.put("/order", { orderId, status });

      if (response.status !== 200) {
        const errorMessage = response as any;
        throw errorMessage.error;
      }

      dispatch(
        createToastify({ status: "success", message: "제품이 수정되었습니다." })
      );

      setIsModalOpen(false);
      dispatch(getAllUsersOrder({ ...searchQuery }));
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
