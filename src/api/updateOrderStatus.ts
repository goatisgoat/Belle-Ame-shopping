import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utility/api";
import { createToastify } from "../redux/modules/toastifySlice";
import { getAllUsersOrder } from "./getAllUsersOrder";
import { NavigateFunction } from "react-router-dom";
import { ErrorType, RejectedError } from "../models/error.types";
import { handleApiError } from "../utility/apiHelper";

export const updateOrderStatus = createAsyncThunk(
  "order",
  async (
    orderData: {
      orderId: string | undefined;
      status: string | undefined;
      setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
      searchQuery: { [key: string]: string };
      navigate: NavigateFunction;
    },
    { dispatch }
  ) => {
    try {
      const { orderId, status, setIsModalOpen, searchQuery, navigate } =
        orderData;

      const response = await api.put("/order", { orderId, status });

      if (response.status !== 200) {
        throw response;
      }

      dispatch(
        createToastify({ status: "success", message: "제품이 수정되었습니다." })
      );

      setIsModalOpen(false);
      dispatch(getAllUsersOrder({ search: { ...searchQuery }, navigate }));
    } catch (error) {
      const { navigate } = orderData;
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
