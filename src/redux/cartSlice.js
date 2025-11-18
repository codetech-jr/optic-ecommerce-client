// client/src/redux/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Función para obtener el estado inicial del carrito desde localStorage
const getInitialState = () => {
  try {
    const cartItemsFromStorage = localStorage.getItem('cartItems');
    const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress'))
      : {}; // <-- Objeto vacío si no existe

    const paymentMethodFromStorage = localStorage.getItem('paymentMethod')
      ? JSON.parse(localStorage.getItem('paymentMethod'))
      : ''; // <-- String vacío si no existe

    return {
      cartItems: cartItemsFromStorage ? JSON.parse(cartItemsFromStorage) : [],
      shippingAddress: shippingAddressFromStorage, // <-- Añade la dirección al estado inicial
      paymentMethod: paymentMethodFromStorage, // <-- Añade el método de pago al estado inicial
    };
  } catch (error) {
    console.error("No se pudo parsear el carrito, la dirección o el método de pago desde el localStorage", error);
    return {
      cartItems: [],
      shippingAddress: {},
      paymentMethod: '',
    };
  }
};

const initialState = getInitialState();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      // --- ¡AQUÍ ESTÁ EL CAMBIO CLAVE! ---
      // Creamos un nuevo objeto 'itemToAdd' con la estructura correcta
      const itemToAdd = {
        product: item._id, // Renombramos _id a product
        name: item.name,
        image: item.image,
        price: item.price,
        stock: item.stock,
        qty: item.qty,
        // También pasamos los datos de graduación si existen
        prescription: item.prescription,
        prescriptionFile: item.prescriptionFile,
      };

      const existItem = state.cartItems.find((x) => x.product === itemToAdd.product);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x.product === existItem.product ? itemToAdd : x
        );
      } else {
        state.cartItems = [...state.cartItems, itemToAdd];
      }

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.cartItems = state.cartItems.filter((x) => x.product !== productId);
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem('shippingAddress', JSON.stringify(state.shippingAddress));
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem('paymentMethod', JSON.stringify(state.paymentMethod));
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem('cartItems');
    },
  },
});

// Exportamos las acciones para usarlas en nuestros componentes
export const { addToCart, removeFromCart, saveShippingAddress, savePaymentMethod, clearCart } = cartSlice.actions;

// Exportamos el reducer para añadirlo a nuestro store
export default cartSlice.reducer;