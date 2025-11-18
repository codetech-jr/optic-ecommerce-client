// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify'; // <-- 1. Importa el contenedor
import 'react-toastify/dist/ReactToastify.css'; // <-- 2. Importa el CSS
import 'swiper/css'; // <-- ESTILO PRINCIPAL DE SWIPER
import 'swiper/css/navigation'; // <-- ESTILOS PARA LAS FLECHAS DE NAVEGACIÓN
import 'swiper/css/pagination';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage'; 
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderPage from './pages/OrderPage'; 
import ProfilePage from './pages/ProfilePage';
import UserListPage from './pages/admin/UserListPage'; 
import ProductListPage from './pages/admin/ProductListPage';
import ProductEditPage from './pages/admin/ProductEditPage';
import OrderListPage from './pages/admin/OrderListPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import OffersPage from './pages/OffersPage';

const App = () => {
  return (
    <Router>
      <Header />
      <main>

          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/page/:pageNumber' element={<HomePage />} /> 
            <Route path='/search/:keyword' element={<HomePage />} />
            <Route path='/search/:keyword/page/:pageNumber' element={<HomePage />} /> 
            {/* --- NUEVA RUTA DINÁMICA --- */}
            <Route path='/product/:id' element={<ProductDetailPage />} />
            <Route path='/admin/product/:id/edit' element={<ProductEditPage />} /> {/* <-- Nueva ruta de edición de producto */}
            <Route path='/cart' element={<CartPage />} /> {/* <-- Nueva ruta del carrito */}
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/shipping' element={<ShippingPage />} />
            <Route path='/payment' element={<PaymentPage />} />
            <Route path='/placeorder' element={<PlaceOrderPage />} />
            <Route path='/order/:id' element={<OrderPage />} /> {/* <-- Nueva ruta de orden */}
            <Route path='/profile' element={<ProfilePage />} /> {/* <-- Nueva ruta de perfil */}
            <Route path='/admin/userlist' element={<UserListPage />} /> {/* <-- Nueva ruta de lista de usuarios */}
            <Route path='/admin/productlist' element={<ProductListPage />} /> {/* <-- Nueva ruta de lista de productos */}
            <Route path='/admin/orderlist' element={<OrderListPage />} /> {/* <-- Nueva ruta de lista de órdenes */}
                        {/* --- NUEVAS RUTAS PARA FILTROS --- */}
            {/* Ruta para filtrar por categoría */}
            <Route path='/catalog' element={<CatalogPage />} />
            <Route path='/page/:pageNumber' element={<CatalogPage />} />
            <Route path='/search/:keyword' element={<CatalogPage />} />
            <Route path='/search/:keyword/page/:pageNumber' element={<CatalogPage />} />
            <Route path='/category/:category' element={<CatalogPage />} />
            <Route path='/category/:category/page/:pageNumber' element={<CatalogPage />} />
            {/* Ruta para filtrar por marca */}
            <Route path='/brand/:brand' element={<CatalogPage />} />
            <Route path='/brand/:brand/page/:pageNumber' element={<CatalogPage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/contacto' element={<ContactPage />} />
            <Route path='/ofertas' element={<OffersPage />} />
          </Routes>
    
      </main>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover /> {/* <-- 3. Añade el contenedor */}
    </Router>
  );
}

export default App;