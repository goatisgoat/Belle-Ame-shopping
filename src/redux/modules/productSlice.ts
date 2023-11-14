import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createProduct } from "../../api/createProduct";
import { Product } from "../../models/product.type";

type InitialState = {
  error: null | string | unknown;
  productsList: Product[] | [];
  totalPageNum: number | null;
  isLoading: boolean;
  productOne: Product | null;
};

const initialState: InitialState = {
  error: null,
  productsList: [],
  totalPageNum: null,
  isLoading: false,
  productOne: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getProductListAdmin: (
      state,
      action: PayloadAction<{ products: Product[]; totalPageNum: number }>
    ) => {
      state.productsList = [...action.payload.products];
      state.totalPageNum = action.payload.totalPageNum;
    },

    deleteProductListMain: (state) => {
      state.productsList = [];
    },
    isLoadingTrue: (state) => {
      state.isLoading = true;
    },
    isLoadingFalse: (state) => {
      state.isLoading = false;
    },
    getProductOneFc: (
      state,
      action: PayloadAction<{ productOne: Product }>
    ) => {
      state.productOne = action.payload.productOne;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createProduct.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export default productSlice.reducer;

export const {
  getProductListAdmin,
  deleteProductListMain,
  isLoadingTrue,
  isLoadingFalse,
  getProductOneFc,
} = productSlice.actions;
