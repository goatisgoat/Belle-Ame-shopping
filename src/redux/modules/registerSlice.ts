import { createSlice } from "@reduxjs/toolkit";

type InitialState = {};

const initialState: InitialState = {
  error: null,
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // builder.addCase(register.rejected, (state, action) => {
    // });
  },
});

export default registerSlice.reducer;
export const {} = registerSlice.actions;
