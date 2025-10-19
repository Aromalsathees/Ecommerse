import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Home from './pages/Home/Home.jsx'
import About from './pages/Home/About.jsx'
import Craft from './pages/Home/Craft.jsx'
import Images from './pages/Home/Images.jsx'
import Testimonials from './pages/Home/Testimonials.jsx'
import Blog from './pages/Home/Blog.jsx'
import Footer from './components/layout/Footer.jsx'
import Navbar from './components/layout/Navbar.jsx'
import Login from './pages/Auth/Login.jsx'
import Show_products from './pages/Products/Show_products.jsx'
import Show_pro2 from './pages/Products/Show_pro2.jsx'
import Show_pro3 from './pages/Products/Show_pro3.jsx'
import Carts from './pages/Orders/Cart/Carts.jsx'
// import Layout from "./components/layout/Layout.jsx";
import Orders_list from './pages/Orders/order/Orders_list.jsx'
import Pay_options1 from './pages/Orders/order/Pay_options1.jsx'

import Admin_Navbar from './Admin/Admin-Layouts/Admin_Navbar.jsx'
import Admin_products from './Admin/Admin-pages/Admin_products.jsx'
import Admin_carts from './Admin/Admin-pages/Admin_carts.jsx'
import Admin_orders from './Admin/Admin-pages/Admin_orders.jsx'
import Admin_users from './Admin/Admin-pages/Admin_users.jsx'


const App = () => {
  return (
    
    <BrowserRouter>
    {/* <Layout> */}
    <Routes>

      <Route
      path='/'
      element={
        <>
        
        <Navbar/>
        <Home/>
        <About/>
        <Craft/>
        <Images/>
        <Testimonials/>
        <Blog/>
        <Footer/>
        

        </>
      }/>

      <Route
      path='/login'
      element={
        <Login/>
      }/>


      <Route
      path='/products'
      element={
        <>
        <Show_products/>
        <Show_pro2/>
        <Show_pro3/>
        <Footer/>
        
        </>
      }
      />


      <Route
      path='/cart'
      element={
        <>
        <Carts/>
        </>
      }
     />

     <Route
     path='/orderlist'
     element={
      <>
      <Orders_list/>
      </>
     }/>

     <Route
     path='/payoptions'
     element={
      <>
      <Pay_options1/>
      </>
     }/>


     <Route
     path='/admin'
     element={
      <>
      <Admin_Navbar/>
      <Admin_products/>
      </>
     }/>


      <Route
     path='/admin-carts'
     element={
      <>
      <Admin_Navbar/>
      <Admin_carts/>
      </>
     }/>


         <Route
     path='/admin-orders'
     element={
      <>
      <Admin_Navbar/>
      <Admin_orders/>
      </>
     }/>



         <Route
     path='/admin-users'
     element={
      <>
      <Admin_Navbar/>
      <Admin_users/>
      </>
     }/>



    </Routes>
    {/* </Layout> */}
    </BrowserRouter>

  )
}

export default App