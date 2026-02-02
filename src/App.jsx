import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const Home = React.lazy(() => import("./pages/Home.jsx"));
const ProductDetail = React.lazy(() => import("./pages/ProductDetail.jsx"));
const CartPage = React.lazy(() => import("./pages/CartPage.jsx"));
const CheckoutPage = React.lazy(() => import("./pages/CheckoutPage.jsx"));
const LoginPage = React.lazy(() => import("./pages/LoginPage.jsx"));

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Suspense fallback={<p style={{textAlign:"center"}}>Loading...</p>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={
            <ProtectedRoute><CheckoutPage /></ProtectedRoute>
          } />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
