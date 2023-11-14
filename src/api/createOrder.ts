import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utility/api";
import { createToastify } from "../redux/modules/toastifySlice";
import { NavigateFunction } from "react-router-dom";
import { getOrderSucessString } from "../redux/modules/orderSlice";
import { CreateOrder } from "../models/order.types";

export const createOrder = createAsyncThunk(
  "order",
  async (
    orderData: {
      totalData: CreateOrder;
      navigate: NavigateFunction;
    },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const { totalData, navigate } = orderData;

      const response = await api.post("/order", totalData);

      if (response.status !== 200) {
        const errorMessage = response as any;

        throw new Error(JSON.stringify(errorMessage.error));
      }

      dispatch(
        createToastify({
          status: "success",
          message: "주문이 완료되었습니다.",
        })
      );

      dispatch(getOrderSucessString(response.data.orderNum));

      navigate("/order/sucess");
    } catch (error) {
      const err = error as string;

      if (error instanceof Error) {
        const errorMessageParse = JSON.parse(error.message);
        const convertErrorArray = JSON.parse(errorMessageParse);

        const dispatchSequentially = async () => {
          for (const err of convertErrorArray) {
            await dispatch(
              createToastify({
                status: "error",
                message: err.message,
              })
            );
          }
        };

        await dispatchSequentially();
      }
      return rejectWithValue(error);
    }
  }
);
