// client/src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import cartReducer from './cartSlice'; // <-- 1. Importa el nuevo reducer
import userReducer from './userSlice';
import orderReducer from './orderSlice';
import { productDeleteReducer, productCreateReducer, productUpdateReducer } from './productAdminSlice';


export const store = configureStore({
  reducer: {
    productList: productReducer,
    cart: cartReducer, // <-- 2. Añádelo aquí
    user: userReducer,
    order: orderReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
  },
});