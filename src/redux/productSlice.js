// client/src/redux/productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// --- ACCIONES ASÍNCRONAS ---

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ keyword = '', pageNumber = '', category = '', brand = '' }) => {
    let url = `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`;
    if (category) url += `&category=${category}`;
    if (brand) url += `&brand=${brand}`;
    
    const { data } = await axios.get(url);
    return data;
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/products/${productId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


// --- ESTADO INICIAL UNIFICADO ---

const initialState = {
  // Para la lista de productos
  products: [],
  page: 1,
  pages: 1,
  status: 'idle',
  error: null,
  // Para el producto individual
  selectedProduct: null,
  selectedProductStatus: 'idle',
  selectedProductError: null,
};


// --- SLICE ---

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Casos para la lista de productos (fetchProducts)
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload.products;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Casos para el producto individual (fetchProductById)
      .addCase(fetchProductById.pending, (state) => {
        state.selectedProductStatus = 'loading';
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.selectedProductStatus = 'succeeded';
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.selectedProductStatus = 'failed';
        state.selectedProductError = action.payload;
      });
  },
});

export default productSlice.reducer;