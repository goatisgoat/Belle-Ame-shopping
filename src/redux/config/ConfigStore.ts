import { configureStore } from "@reduxjs/toolkit";
import registerSlice from "../modules/registerSlice";
import userSlice from "../modules/userSlice";
import productSlice from "../modules/productSlice";
import toastifySlice from "../modules/toastifySlice";
import cartSlice from "../modules/cartSlice";
import orderSlice from "../modules/orderSlice";

const store = configureStore({
  reducer: {
    register: registerSlice,
    user: userSlice,
    product: productSlice,
    toastify: toastifySlice,
    cart: cartSlice,
    order: orderSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
