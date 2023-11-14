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

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<GlobalLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<ProductDetail />} />
          <Route path="/order/sucess" element={<OrderComplete />} />
          <Route path="/order/list" element={<MyOrderList />} />
          <Route path="/cart" element={<CartDetail />} />
          <Route path="/order/payment" element={<Order />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<Admin />}>
          <Route path="/admin/product" element={<AdminProduct />} />
          <Route path="/admin/order" element={<AdminOrderPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
