import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import GlobalLayout from "../components/common/GlobalLayout";
import Login from "../pages/login/Login";
import Resister from "../pages/resister/Resister";
import Admin from "../pages/admin/Admin";
import AdminProduct from "../pages/admin/AdminProduct";
import AdminOrderPage from "../pages/admin/AdminOrderPage";
import ProductDetail from "../pages/productDetail/ProductDetail";
import CartDetail from "../pages/cart/CartDetail";
import Order from "../pages/order/Order";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<GlobalLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<ProductDetail />} />
        </Route>
        <Route path="/cart" element={<CartDetail />} />
        <Route path="/order" element={<Order />} />

        <Route path="/login" element={<Login />} />
        <Route path="/resister" element={<Resister />} />
        <Route element={<Admin />}>
          <Route path="/admin/product" element={<AdminProduct />} />
          <Route path="/admin/order" element={<AdminOrderPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
