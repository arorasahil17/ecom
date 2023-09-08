import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import CartPage from "./pages/cartPage";
import CheckoutPage from "./pages/checkOutPage";
import OrderPage from "./pages/orderPage";
import LoginSignUp from "./pages/loginSignUp";
import {
  adminReducer,
  cartReducer,
  orderReducer,
  productReducer,
  userReducer,
} from "./reducers";
import AdminLayout from "./components/admin/home/adminLayout";
import Createproduct from "./components/admin/home/product/createProduct";
import AdminNav from "./components/admin/home";
import AllProduct from "./components/admin/home/product/allProduct";
import AdminLogin from "./components/admin/home/adminLogin";
import AllOrders from "./components/admin/home/orders/allOrders";

const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    order: orderReducer,
    user: userReducer,
    admin: adminReducer,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route index element={<Home />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="orders" element={<OrderPage />} />
          <Route path="login" element={<LoginSignUp />} />
          <Route path="adminLogin" element={<AdminLogin />} />
          <Route path="dashboard" element={<AdminLayout></AdminLayout>}>
            <Route index element={<Createproduct />} />
            <Route path="products" element={<AllProduct />} />
            <Route path="orders" element={<AllOrders />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
