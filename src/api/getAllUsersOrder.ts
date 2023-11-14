import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utility/api";
import { createToastify } from "../redux/modules/toastifySlice";
import { getAllUsersOrderListFc } from "../redux/modules/orderSlice";

export const getAllUsersOrder = createAsyncThunk(
  "order",
  async (
    searchQuery: {
      page?: string;
      name?: string;
    },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const response = await api.get("/order/total", {
        params: { ...searchQuery, PAGE_SIZE: 3 },
      });

      if (response.status !== 200) {
        const errorMessage = response as any;
        throw errorMessage.error;
      }

      console.log(response.data.allUsersOrder);
      dispatch(
        getAllUsersOrderListFc({
          allUsersOrder: response.data.allUsersOrder,
          totalPageNum: response.data.totalPageNum,
        })
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
