import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchAndFilterGamesByCategory } from "./searchSlice";
import { fetchDownloadedGames } from "./downloadedGamesSlice";

const initialState = {
  downloadProgress: 0,
  isDownloading: false,
  isPaused: false,
  gameDetailPageSelectedGame: null,
};

export const startDownloadThunk = createAsyncThunk(
  "download/startDownload",
  async ({ id }, { dispatch, getState }) => {
    let progress = 0;
    const timeout = 100;
    const totalSteps = 100;
    const { data: gameDetail } = await axios.get(
      `http://localhost:3001/games/${id}`
    );

    dispatch(setGameDetailPageSelectedGame(gameDetail));

    return new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        const state = getState().download;

        if (state.isPaused) {
          return;
        } else {
          progress += 100 / totalSteps;
          if (progress >= 100) {
            progress = 100;
            clearInterval(interval);

            axios.patch(`http://localhost:3001/games/${id}`, {
              isDownload: true,
            });

            dispatch(fetchAndFilterGamesByCategory());
            dispatch(fetchDownloadedGames());

            resolve(progress);
          } else {
            dispatch(updateDownloadProgress(progress));
          }
        }
      }, timeout);
    });
  }
);

const downloadSlice = createSlice({
  name: "download",
  initialState,
  reducers: {
    updateDownloadProgress(state, action) {
      state.downloadProgress = action.payload;
    },
    setGameDetailPageSelectedGame(state, action) {
      state.gameDetailPageSelectedGame = action.payload;
    },
    toggleDownload(state) {
      state.isPaused = !state.isPaused;
    },
    resetDownload(state) {
      state.isDownloading = false;
      state.isPaused = !state.isPaused;
      state.downloadProgress = 0;
      state.gameDetailPageSelectedGame = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(startDownloadThunk.pending, (state, action) => {
        state.isDownloading = true;
        state.downloadProgress = 0;
        state.isPaused = false;
      })
      .addCase(startDownloadThunk.fulfilled, (state, action) => {
        state.isDownloading = false;
        state.downloadProgress = action.payload;
        state.isPaused = false;
      })
      .addCase(startDownloadThunk.rejected, (state) => {
        state.isDownloading = false;
        state.downloadProgress = 100;
        state.isPaused = false;
      });
  },
});

export const {
  updateDownloadProgress,
  setGameDetailPageSelectedGame,
  toggleDownload,
  resetDownload,
  cancelDownload,
} = downloadSlice.actions;
export default downloadSlice.reducer;
