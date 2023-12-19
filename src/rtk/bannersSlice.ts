import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Banner } from '../component/interface/interface';
import client from '../apolloClient/client';
import { FETCH_BANNERS } from '../apolloClient/graphQL_querys';


export const fetchBanners = createAsyncThunk('banners/fetchBanners', async () => {
  try {
    const { data } = await client.query({
      query: FETCH_BANNERS,
    });
    return data.getAllBanners
  } catch (error) {
    throw error; 
  }
});


interface BannerSlice{
    banners:Banner[]
    status:string
    error:string
}

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