import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  downloadedGames: [],
  loading: false,
  error: null,
};

export const fetchDownloadedGames = createAsyncThunk(
  "downloadedGames/fetchDownloadedGames",
  async () => {
    const response = await axios.get("http://localhost:3001/games");
    return response.data.filter((game) => game.isDownload === true);
  }
);

export const deleteDownloadedGame = createAsyncThunk(
  "downloadedGames/deleteDownloadedGame",
  async (gameId) => {
    await axios.patch(`http://localhost:3001/games/${gameId}`, {
      isDownload: false,
    });
    return gameId;
  }
);

const downloadedGamesSlice = createSlice({
  name: "downloadedGames",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDownloadedGames.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDownloadedGames.fulfilled, (state, action) => {
        state.downloadedGames = action.payload;
        state.loading = false;
      })
      .addCase(fetchDownloadedGames.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    builder.addCase(deleteDownloadedGame.fulfilled, (state, action) => {
      state.downloadedGames = state.downloadedGames.filter(
        (game) => game.id !== action.payload
      );
    });
  },
});

export default downloadedGamesSlice.reducer;
