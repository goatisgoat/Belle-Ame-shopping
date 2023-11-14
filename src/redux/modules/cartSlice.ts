import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { register } from "../../api/register";
import { Cart } from "../../models/cart.types";

type InitialState = {
  cartLength: number;
  cartList: Cart[] | null;
};

const initialState: InitialState = {
  cartLength: 0,
  cartList: null,
};

const cartSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    getCartLengthFc: (state, action: PayloadAction<number>) => {
      state.cartLength = action.payload;
    },
    plusCartLength: (state) => {
      state.cartLength = state.cartLength + 1;
    },
    minusCartLength: (state) => {
      state.cartLength = state.cartLength - 1;
    },
    getMyCartFc: (
      state,
      action: PayloadAction<{
        cartList: Cart[];
        cartLength: number;
      }>
    ) => {
      state.cartList = action.payload.cartList;
      state.cartLength = action.payload.cartLength;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.rejected, (state, action) => {});
  },
});

export default cartSlice.reducer;
export const { getCartLengthFc, plusCartLength, minusCartLength, getMyCartFc } =
  cartSlice.actions;
