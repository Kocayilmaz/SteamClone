import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchAndFilterGamesByCategory } from "./searchSlice";
import { fetchDownloadedGames } from "./downloadedGamesSlice";

const initialState = {
  downloadProgress: 0,
  isDownloading: false,
  isPaused: false,
  gameDetailPageSelectedGame: null,
  downloadQueue: [],
  currentDownload: null,
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
    dispatch(setCurrentDownload(gameDetail));
    return new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        const state = getState().download;
        const nextGame = state.downloadQueue[0];

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

            dispatch(completeDownload());
            dispatch(removeFromQueue(id));
            dispatch(completeDownload());
            debugger;
            // Kuyruktaki bir sonraki indirmeyi başlat

            if (nextGame) {
              dispatch(
                startDownloadThunk({ id: nextGame.id, icon: nextGame.icon })
              );
            }

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
      debugger;
      state.downloadProgress = action.payload;
    },
    setGameDetailPageSelectedGame(state, action) {
      state.gameDetailPageSelectedGame = action.payload;
    },
    toggleDownload(state) {
      state.isPaused = !state.isPaused;
    },
    completeDownload(state) {
      state.isDownloading = false;
      state.downloadProgress = 0;
      state.isPaused = false;
      state.currentDownload = null;
    },
    resetDownload(state) {
      state.isDownloading = false;
      state.isPaused = !state.isPaused;
      state.downloadProgress = 0;
      state.gameDetailPageSelectedGame = null;
      state.currentDownload = null;
    },
    addToQueue(state, action) {
      state.downloadQueue.push(action.payload);
    },
    removeFromQueue(state, action) {
      state.downloadQueue = state.downloadQueue.filter(
        (game) => game.id !== action.payload
      );
    },
    setCurrentDownload(state, action) {
      state.currentDownload = action.payload; // İndirme işlemi sırasında currentDownload'ı güncelle
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(startDownloadThunk.pending, (state, action) => {
        state.isDownloading = true;
        state.downloadProgress = 0;
        state.isPaused = false;
        state.currentDownload = action.meta.arg;
      })
      .addCase(startDownloadThunk.fulfilled, (state, action) => {
        state.isDownloading = false;
        state.downloadProgress = 0;
        state.isPaused = false;
      })
      .addCase(startDownloadThunk.rejected, (state) => {
        state.isDownloading = false;
        state.downloadProgress = 0;
        state.isPaused = false;
        state.currentDownload = null;
      });
  },
});

export const {
  updateDownloadProgress,
  setGameDetailPageSelectedGame,
  toggleDownload,
  resetDownload,
  cancelDownload,
  removeFromQueue,
  completeDownload,
  addToQueue,
  setCurrentDownload,
} = downloadSlice.actions;
export default downloadSlice.reducer;
