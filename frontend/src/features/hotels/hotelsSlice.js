import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import hotelApi from '../../services/hotelApi';

export const fetchHotels = createAsyncThunk('hotels/fetchHotels', async (params, thunkAPI) => {
  try {
    const data = await hotelApi.getHotels(params);
    console.log("BACKEND DATA:", data); // Console la paaka
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

export const fetchHotelById = createAsyncThunk('hotels/fetchHotelById', async (id, thunkAPI) => {
  try {
    return await hotelApi.getHotelById(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

export const createHotel = createAsyncThunk('hotels/createHotel', async (formData, thunkAPI) => {
  try {
    return await hotelApi.createHotel(formData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

export const updateHotel = createAsyncThunk('hotels/updateHotel', async ({ id, formData }, thunkAPI) => {
  try {
    return await hotelApi.updateHotel(id, formData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

export const deleteHotel = createAsyncThunk('hotels/deleteHotel', async (id, thunkAPI) => {
  try {
    await hotelApi.deleteHotel(id);
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

const initialState = {
  hotels: [],
  selectedHotel: null,
  total: 0,
  limit: 6,
  offset: 0,
  loading: false,
  error: null,
};

const hotelsSlice = createSlice({
  name: 'hotels',
  initialState,
  reducers: {
    clearSelectedHotel: (state) => {
      state.selectedHotel = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHotels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHotels.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload;
        
        // Edha format la vanthalum eduthukkum da!
        if (Array.isArray(payload)) {
          state.hotels = payload;
          state.total = payload.length;
        } else if (payload.hotels) {
          state.hotels = payload.hotels;
          state.total = payload.total ?? payload.hotels.length;
          state.limit = payload.limit ?? 6;
          state.offset = payload.offset ?? 0;
        } else if (payload.data) {
          state.hotels = payload.data;
          state.total = payload.total ?? payload.data.length;
        } else {
          state.hotels = [];
          state.total = 0;
        }
      })
      .addCase(fetchHotels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.error("Fetch Failed:", action.payload);
      })
      .addCase(fetchHotelById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHotelById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedHotel = action.payload.hotel || action.payload.data || action.payload;
      })
      .addCase(fetchHotelById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteHotel.fulfilled, (state, action) => {
        state.hotels = state.hotels.filter(hotel => hotel.id !== action.payload);
        state.total = state.total - 1;
      })
      .addCase(createHotel.fulfilled, (state, action) => {
        // Add panna udane list la varum
        const newHotel = action.payload.hotel || action.payload.data || action.payload;
        if(newHotel) state.hotels.unshift(newHotel);
      });
  },
});

export const { clearSelectedHotel, clearError } = hotelsSlice.actions;
export default hotelsSlice.reducer;