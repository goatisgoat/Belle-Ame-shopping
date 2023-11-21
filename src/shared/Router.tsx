import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import GlobalLayout from "../components/common/GlobalLayout";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Admin from "../pages/admin/Admin";
import AdminProduct from "../pages/admin/AdminProduct";
import AdminOrderPage from "../pages/admin/AdminOrderPage";
import ProductDetail from "../pages/productDetail/ProductDetail";
import CartDetail from "../pages/cart/CartDetail";
import Order from "../pages/order/Order";
import OrderComplete from "../pages/order/OrderComplete";
import MyOrderList from "../pages/order/MyOrderList";
import PrivateRoute from "../privateRoute/PrivateRoute";
import Kakao from "../pages/login/Kakao";

const Router = () => {
  return (
    <Routes>
      <Route element={<GlobalLayout />}>
        <Route path="/:id" element={<ProductDetail />} />
        <Route
          path="/order/sucess"
          element={
            <PrivateRoute>
              <OrderComplete />
            </PrivateRoute>
          }
        />
        <Route
          path="/order/list"
          element={
            <PrivateRoute>
              <MyOrderList />
            </PrivateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            // <PrivateRoute>
            <CartDetail />
            // </PrivateRoute>
          }
        />
        <Route
          path="/order/payment"
          element={
            <PrivateRoute>
              <Order />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/auth/kakao" element={<Kakao />} />
      </Route>
      <Route path="/" element={<Home />} />
      <Route element={<Admin />}>
        <Route path="/admin/product" element={<AdminProduct />} />
        <Route path="/admin/order" element={<AdminOrderPage />} />
      </Route>
    </Routes>
  );
};

export default Router;
