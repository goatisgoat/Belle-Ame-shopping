import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { resister } from "../../api/resister";

type InitialState = {
  error: null | string | unknown;
};

const initialState: InitialState = {
  error: null,
};

const resisterSlice = createSlice({
  name: "resister",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(resister.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export default resisterSlice.reducer;
export const {} = resisterSlice.actions;
