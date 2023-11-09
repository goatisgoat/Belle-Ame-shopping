import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { resister } from "../../api/resister";
import { Product } from "../../models/product.type";

type InitialState = {
  cartLength: number;
  cartList:
    | { productId: Product; qty: number; size: string; _id: string }[]
    | null;
};

const initialState: InitialState = {
  cartLength: 0,
  cartList: null,
};

const cartSlice = createSlice({
  name: "resister",
  initialState,
  reducers: {
    getCartLength: (state, action: PayloadAction<number>) => {
      state.cartLength = action.payload;
    },
    plusCartLength: (state) => {
      state.cartLength = state.cartLength + 1;
    },
    minusCartLength: (state) => {
      state.cartLength = state.cartLength - 1;
    },
    getCartList: (
      state,
      action: PayloadAction<{
        cartList: {
          productId: Product;
          qty: number;
          size: string;
          _id: string;
        }[];
        cartLength: number;
      }>
    ) => {
      state.cartList = action.payload.cartList;
      state.cartLength = action.payload.cartLength;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resister.rejected, (state, action) => {});
  },
});

export default cartSlice.reducer;
export const { getCartLength, plusCartLength, minusCartLength, getCartList } =
  cartSlice.actions;
