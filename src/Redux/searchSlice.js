import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAndFilterGamesByCategory = createAsyncThunk(
  "search/fetchAndFilterGamesByCategory",
  async (category = "") => {
    try {
      const response = await axios.get(
        `http://localhost:3001/games?category_like=${category}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const fetchAndFilterGames = createAsyncThunk(
  "search/fetchAndFilterGames",
  async (searchTerm = "") => {
    try {
      const response = await axios.get(
        `http://localhost:3001/games?name_like=${searchTerm}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchAndFilterGames
      .addCase(fetchAndFilterGames.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAndFilterGames.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchAndFilterGames.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // fetchAndFilterGamesByCategory
      .addCase(fetchAndFilterGamesByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAndFilterGamesByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchAndFilterGamesByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default searchSlice.reducer;
