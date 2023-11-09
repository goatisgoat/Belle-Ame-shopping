import { configureStore } from "@reduxjs/toolkit";
import resisterSlice from "../modules/resisterSlice";
import userSlice from "../modules/userSlice";
import productSlice from "../modules/productSlice";
import toastifySlice from "../modules/toastifySlice";
import cartSlice from "../modules/cartSlice";

const store = configureStore({
  reducer: {
    resister: resisterSlice,
    user: userSlice,
    product: productSlice,
    toastify: toastifySlice,
    cart: cartSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
