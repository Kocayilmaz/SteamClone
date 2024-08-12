import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  downloadProgress: 0,
  isDownloading: false,
  gameDetailPageSelectedGame: null, // Yeni veri
};

export const startDownloadThunk = createAsyncThunk(
  "download/startDownload",
  async ({ id, icon }, { dispatch }) => {
    let progress = 0;
    const timeout = 100;
    const totalSteps = 100;
    return new Promise((resolve) => {
      const interval = setInterval(async () => {
        progress += 100 / totalSteps;

        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);

          await axios.patch(`http://localhost:3001/games/${id}`, {
            isDownload: true,
          });
          resolve(progress);
        } else {
          dispatch(updateDownloadProgress(progress));
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(startDownloadThunk.pending, (state) => {
        state.isDownloading = true;
        state.downloadProgress = 0;
      })
      .addCase(startDownloadThunk.fulfilled, (state, action) => {
        state.isDownloading = false;
        state.downloadProgress = action.payload;
      })
      .addCase(startDownloadThunk.rejected, (state) => {
        state.isDownloading = false;
        state.downloadProgress = 100;
      });
  },
});

export const { updateDownloadProgress, setGameDetailPageSelectedGame } =
  downloadSlice.actions;
export default downloadSlice.reducer;
