import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BannerSlice } from '../component/interface/interface';
import { getAllBanners } from '../services/banners2.service';

export const fetchBanners = createAsyncThunk('banners/fetchBanners', async () => {
  return await getAllBanners();
});

const initialState:BannerSlice = {
  banners: [],
  status: '',
  error: '',
};

const bannersSlice = createSlice({
  name: 'banners',
  initialState,
  reducers: {

    setBanners: (state, action) => {
        state.banners = action.payload;
      },
    
    addBannerRtk: (state, action) => {
        state.banners.unshift(action.payload);
      }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanners.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.banners = action.payload;
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.status = 'failed';
        if (action.error)
        state.error = action.error.message as string;
      });
  },
});


export const { setBanners,addBannerRtk } = bannersSlice.actions;
export default bannersSlice.reducer;