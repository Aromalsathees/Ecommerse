import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home/Home.jsx";
import About from "./pages/Home/About.jsx";
import Craft from "./pages/Home/Craft.jsx";
import Images from "./pages/Home/Images.jsx";
import Testimonials from "./pages/Home/Testimonials.jsx";
import Blog from "./pages/Home/Blog.jsx";
import Footer from "./components/layout/Footer.jsx";
import Navbar from "./components/layout/Navbar.jsx";
import LoginForm from "./pages/Auth/LoginForm.jsx";
import SignupForm from "./pages/Auth/SignupForm.jsx";
import AdminSignup from "./pages/Auth/Admin_signup.jsx";
import Show_products from "./pages/Products/Show_products.jsx";
import Show_pro2 from "./pages/Products/Show_pro2.jsx";
import Show_pro3 from "./pages/Products/Show_pro3.jsx";
import Carts from "./pages/Orders/Cart/Carts.jsx";
import Orders_list from "./pages/Orders/order/Orders_list.jsx";
import Pay_options1 from "./pages/Orders/order/Pay_options1.jsx";

import Admin_Navbar from "./Admin/Admin-Layouts/Admin_Navbar.jsx";
import Admin_products from "./Admin/Admin-pages/Admin_products.jsx";
import Admin_carts from "./Admin/Admin-pages/Admin_carts.jsx";
import Admin_orders from "./Admin/Admin-pages/Admin_orders.jsx";
import Admin_users from "./Admin/Admin-pages/Admin_users.jsx";

import ProtectedRoute from "./components/layout/ProtectedRoute.jsx";

const LayoutWrapper = ({ children }) => {
  const location = useLocation();

  // Hide navbar/footer on login/signup/admin pages
  const hideNavbarRoutes = [
    "/login",
    "/signup",
    "/AdminSignup",
    "/admin",
    "/admin-carts",
    "/admin-orders",
    "/admin-users",
  ];

  const hideNavbar = hideNavbarRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
      {!hideNavbar && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <LayoutWrapper>
        <Routes>
          {/* 🏠 Home */}
          <Route
            path="/"
            element={
              <>
                <Home />
                <About />
                <Craft />
                <Images />
                <Testimonials />
                <Blog />
              </>
            }
          />

          {/* 🔐 Auth */}
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/AdminSignup" element={<AdminSignup />} />

          {/* 🛒 User Protected Pages */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Carts />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orderlist"
            element={
              <ProtectedRoute>
                <Orders_list />
              </ProtectedRoute>
            }
          />

          <Route
            path="/payoptions/:id"
            element={
              <ProtectedRoute>
                <Pay_options1 />
              </ProtectedRoute>
            }
          />

          <Route
            path="/products"
            element={
              <>
                <Show_products />
                <Show_pro2 />
                <Show_pro3 />
              </>
            }
          />

          {/* 🧑‍💼 Admin Protected Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly>
                <>
                  <Admin_Navbar />
                  <Admin_products />
                </>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin-carts"
            element={
              <ProtectedRoute adminOnly>
                <>
                  <Admin_Navbar />
                  <Admin_carts />
                </>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin-orders"
            element={
              <ProtectedRoute adminOnly>
                <>
                  <Admin_Navbar />
                  <Admin_orders />
                </>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin-users"
            element={
              <ProtectedRoute adminOnly>
                <>
                  <Admin_Navbar />
                  <Admin_users />
                </>
              </ProtectedRoute>
            }
          />
        </Routes>
      </LayoutWrapper>
    </BrowserRouter>
  );
};

export default App;
