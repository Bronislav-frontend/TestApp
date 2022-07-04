import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://api.unsplash.com/';
const ACCESS_KEY = 'Od0Mp7I-0FIZEquY0822WcoH9xlgTPnbQb4CCZf4HrA';

const initialState = {
  images: [],
  loading: false,
};

export const getImages = createAsyncThunk(
  'gallery/getImages',
  async (page, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.get(
        `photos?per_page=12&client_id=${ACCESS_KEY}&page=${page}`,
      );
      dispatch(setImages(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    setImages: (state, { payload }) => {
      state.images = payload;
    },
  },
  extraReducers: {
    [getImages.fulfilled]: (state, { payload }) => {
      state.images.push(payload);
      state.loading = false;
    },
    [getImages.pending]: (state, _) => {
      state.loading = true;
    },
    [getImages.rejected]: (state, _) => {
      state.loading = false;
      alert('Ooops, something went wrong=(');
    },
  },
});

export const { setImages } = gallerySlice.actions;

export default gallerySlice.reducer;
