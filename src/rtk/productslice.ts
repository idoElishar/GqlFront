import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ProductSlice } from '../component/interface/interface';
import { getAllProducts } from '../services/banners2.service';

export const fetchProduct = createAsyncThunk('product/fetchProduct', async () => {
  return await getAllProducts();
});

const initialState:ProductSlice = {
  products: [],
  status: '',
  error: '',
};

const productSlice = createSlice({
  name: 'banners',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.status = 'failed';
        if (action.error)
        state.error = action.error.message as string;
      });
  },
});


export default productSlice.reducer;