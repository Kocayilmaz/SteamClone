import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  downloadProgress: 0,
  isDownloading: false,
  isPaused: false,
  gameDetailPageSelectedGame: null,
  downloadQueue: [],
  currentDownload: null,
};

export const addToQueueThunk = createAsyncThunk(
  "download/addToQueue",
  async (game, { dispatch, getState }) => {
    const state = getState().download;
    const updatedQueue = [...state.downloadQueue, game];
    dispatch(updateDownloadQueue(updatedQueue));

    if (!state.isDownloading) {
      const nextGame = updatedQueue[0];
      if (nextGame) {
        await dispatch(startDownloadThunk({ id: nextGame.id })).then(() => {
          dispatch(removeFromQueue(nextGame.id));
        });
      }
    }
  }
);

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
        const nextGame = state.downloadQueue[1];

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

            if (nextGame) {
              dispatch(startDownloadThunk({ id: nextGame.id }));
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
    NextGame1(state, action) {
      state.isDownloading = true;
    },

    updateDownloadQueue(state, action) {
      state.downloadQueue = action.payload;
    },
    removeFromQueue(state, action) {
      state.downloadQueue = state.downloadQueue.filter(
        (game) => game.id !== action.payload
      );
    },
    setCurrentDownload(state, action) {
      state.currentDownload = action.payload;
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
        if (state.downloadQueue.length > 0) {
          // Eğer kuyrukta bir oyun varsa, indirme devam ediyor
          state.isDownloading = true;
        } else {
          // Eğer kuyruk boşsa, indirme işlemi bitmiştir
          state.isDownloading = false;
        }

        state.downloadProgress = 0;
        state.isPaused = false;
        state.currentDownload = null;
      })
      .addCase(startDownloadThunk.rejected, (state) => {
        state.isDownloading = false;
        state.downloadProgress = 0;
        state.isPaused = false;
        state.currentDownload = null;
      })
      .addCase(addToQueueThunk.pending, (state, action) => {})
      .addCase(addToQueueThunk.fulfilled, (state, action) => {});
  },
});

export const {
  updateDownloadProgress,
  setGameDetailPageSelectedGame,
  NextGame1,
  toggleDownload,
  resetDownload,
  removeFromQueue,
  completeDownload,
  addToQueue,
  updateDownloadQueue,
  setCurrentDownload,
} = downloadSlice.actions;
export default downloadSlice.reducer;
