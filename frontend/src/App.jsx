import React from 'react'
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ContactPage from './pages/ContactPage';
import AuthPage from './pages/AuthPage';
import CartPages from './pages/CartPages';
import BlogPage from './pages/BlogPage';
import BlogDetailsPage from './pages/BlogDetailsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import './App.css'
import UserPage from './pages/Admin/UserPage';
import CategoryPage from './pages/Admin/Categories/CategoryPage';
import UpdateCategoryPage from './pages/Admin/Categories/UpdateCategoryPage';
import CreateCategoryPage from './pages/Admin/Categories/CreateCategoryPage';
import CreateProductPage from './pages/Admin/Product/CreateProductPage';
import ProductPage from './pages/Admin/Product/ProductPage';
import UpdateProductPage from './pages/Admin/Product/UpdateProductPage';
import CouponPage from './pages/Admin/Coupons/CouponsPage';
import UpdateCouponPage from './pages/Admin/Coupons/UpdateCouponPage';
import CreateCouponPage from './pages/Admin/Coupons/CreateCouponPage';
import SuccessPage from './pages/SuccessPage';
import OrderPage from './pages/Admin/OrderPage';
import DashboardPage from './pages/Admin/DashboardPage';

function App() {

  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/shop' element={<ShopPage />} />
      <Route path='/contact' element={<ContactPage />} />
      <Route path='/auth' element={<AuthPage />} />
      <Route path='/cart' element={<CartPages />} />
      <Route path='/blog' element={<BlogPage />} />
      <Route path='/blog/:id' element={<BlogDetailsPage />} />
      <Route path='/product/:id' element={<ProductDetailsPage />} />
      <Route path='/success' element={<SuccessPage />} />
      <Route path='/admin/*'>
        <Route index element={<DashboardPage />} />
        <Route path='users' element={<UserPage />} />
        <Route path='categories' element={<CategoryPage />} />
        <Route path='orders' element={<OrderPage />} />
        <Route path='categories/update/:id' element={<UpdateCategoryPage />} />
        <Route path='categories/create' element={<CreateCategoryPage />} />
        <Route path='products' element={<ProductPage />} />
        <Route path='products/create' element={<CreateProductPage />} />
        <Route path='products/update/:id' element={<UpdateProductPage />} />
        <Route path='coupons' element={<CouponPage />} />
        <Route path='coupons/create' element={<CreateCouponPage />} />
        <Route path='coupons/update/:id' element={<UpdateCouponPage />} />
      </Route>
    </Routes>
  )
}

export default App
