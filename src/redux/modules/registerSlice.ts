import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { register } from "../../api/register";

type InitialState = {
  error: null | string | unknown;
};

const initialState: InitialState = {
  error: null,
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(register.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export default registerSlice.reducer;
export const {} = registerSlice.actions;
