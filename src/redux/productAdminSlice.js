// client/src/redux/productAdminSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// ----------------- ACCIONES ASÍNCRONAS -----------------

// Acción para eliminar un producto (código existente)
export const deleteProduct = createAsyncThunk(
    'productDelete/deleteProduct',
    async (productId, { getState, rejectWithValue }) => {
        const { user: { userInfo } } = getState();
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
            await axios.delete(`/api/products/${productId}`, config);
            return productId;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

// Acción para crear un producto (código existente)
export const createProduct = createAsyncThunk(
    'productCreate/createProduct',
    async (productData, { getState, rejectWithValue }) => {
        const { user: { userInfo } } = getState();
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
            // Modificamos para que acepte un objeto vacío si no se pasan datos
            const response = await axios.post('/api/products', productData || {}, config);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

// --- NUEVO --- Acción para actualizar un producto
export const updateProduct = createAsyncThunk(
  'productUpdate/updateProduct',
  async (product, { getState, rejectWithValue }) => {
    try {
      const { user: { userInfo } } = getState();
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(`/api/products/${product._id}`, product, config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


// ----------------- SLICES Y REDUCERS -----------------

// Slice para la eliminación (código existente)
const productDeleteSlice = createSlice({
    name: 'productDelete',
    initialState: { loading: false, success: false, error: null },
    reducers: {
        productDeleteReset: (state) => { state.success = false; state.error = null; },
    },
    extraReducers: (builder) => {
        builder
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteProduct.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

// Slice para la creación (código existente)
const productCreateSlice = createSlice({
    name: 'productCreate',
    initialState: { loading: false, success: false, error: null, product: null },
    reducers: {
        productCreateReset: (state) => { state.success = false; state.error = null; state.product = null; },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.product = action.payload;
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

// --- NUEVO --- Slice para la actualización
const productUpdateSlice = createSlice({
  name: 'productUpdate',
  initialState: { loading: false, success: false, error: null, product: null },
  reducers: {
    productUpdateReset: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.product = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.product = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


// ----------------- EXPORTACIONES -----------------

// Exportamos los reducers
export const productDeleteReducer = productDeleteSlice.reducer;
export const productCreateReducer = productCreateSlice.reducer;
export const productUpdateReducer = productUpdateSlice.reducer; // --- NUEVO ---

// Exportamos las acciones síncronas
export const { productDeleteReset } = productDeleteSlice.actions;
export const { productCreateReset } = productCreateSlice.actions;
export const { productUpdateReset } = productUpdateSlice.actions; // --- NUEVO ---