import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { register } from "../../api/register";
import { Order } from "../../models/order.types";

type InitialState = {
  orderSucessString: string;
  myOrderList: Order[] | null;
  adminOrderList: Order[] | null;
  totalPageNum: number | null;
};

const initialState: InitialState = {
  orderSucessString: "",
  myOrderList: null,
  adminOrderList: null,
  totalPageNum: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    getOrderSucessString: (state, action: PayloadAction<string>) => {
      state.orderSucessString = action.payload;
    },
    getMyOrderFc: (state, action: PayloadAction<Order[]>) => {
      state.myOrderList = action.payload;
    },
    getAllUsersOrderListFc: (
      state,
      action: PayloadAction<{
        allUsersOrder: Order[];
        totalPageNum: number;
      }>
    ) => {
      state.adminOrderList = action.payload.allUsersOrder;
      state.totalPageNum = action.payload.totalPageNum;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.rejected, (state, action) => {});
  },
});

export default orderSlice.reducer;
export const { getOrderSucessString, getMyOrderFc, getAllUsersOrderListFc } =
  orderSlice.actions;
