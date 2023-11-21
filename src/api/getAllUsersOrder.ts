import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utility/api";
import { createToastify } from "../redux/modules/toastifySlice";
import { getAllUsersOrderListFc } from "../redux/modules/orderSlice";
import { ErrorType, RejectedError } from "../models/error.types";
import { NavigateFunction } from "react-router-dom";
import { handleApiError } from "../utility/apiHelper";

export const getAllUsersOrder = createAsyncThunk(
  "order",
  async (
    searchQuery: {
      search: {
        page?: string;
        name?: string;
      };
      navigate: NavigateFunction;
    },
    { dispatch }
  ) => {
    try {
      const response = await api.get("/order/total", {
        params: { ...searchQuery.search, PAGE_SIZE: 3 },
      });

      if (response.status !== 200) {
        throw response;
      }

      dispatch(
        getAllUsersOrderListFc({
          allUsersOrder: response.data.allUsersOrder,
          totalPageNum: response.data.totalPageNum,
        })
      );
    } catch (error) {
      const { navigate } = searchQuery;
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
