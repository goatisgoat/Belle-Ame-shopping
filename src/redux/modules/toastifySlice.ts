import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type InitialState = {
  toastMessage: {
    status: string;
    message: string;
  };
};

const initialState: InitialState = {
  toastMessage: { status: "", message: "" },
};

const toastifySlice = createSlice({
  name: "toastify",
  initialState,
  reducers: {
    createToastify: (
      state,
      action: PayloadAction<{ status: string; message: string }>
    ) => {
      state.toastMessage = action.payload;
    },
  },
});

export default toastifySlice.reducer;
export const { createToastify } = toastifySlice.actions;
