import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Userstate } from "../../models/user.type";
import { login } from "../../api/login";

type UserState = {
  userState: Userstate;
};

const initialState: UserState = {
  userState: { name: null, email: null, _id: null, level: null },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userInfo: (state, action: PayloadAction<Userstate>) => {
      state.userState = action.payload;
    },
    deleteInfo: (state, action) => {
      state.userState = {
        name: null,
        email: null,
        _id: null,
        level: null,
      };
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(loginThunk.rejected, (state, action) => {
  //     state.error = action.payload;
  //   });
  // },
});

export default userSlice.reducer;
export const { userInfo, deleteInfo } = userSlice.actions;
