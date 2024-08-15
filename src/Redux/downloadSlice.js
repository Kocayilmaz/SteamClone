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

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const startDownloadThunk = createAsyncThunk(
  "download/startDownload",
  async (_, { dispatch, getState }) => {
    const state = getState().download;
    const { currentDownload, downloadQueue } = state;

    if (currentDownload) {
      if (downloadQueue.length > 0) {
        dispatch(setCurrentDownload(downloadQueue.shift()));
        await delay(19000);
      }
    }

    return new Promise((resolve, reject) => {
      const { id } = state.currentDownload;
      let progress = 0;
      const timeout = 100;
      const totalSteps = 100;

      axios
        .get(`http://localhost:3001/games/${id}`)
        .then(({ data: gameDetail }) => {
          dispatch(setGameDetailPageSelectedGame(gameDetail));

          const interval = setInterval(() => {
            const { isPaused, currentDownload } = getState().download;
            if (currentDownload) {
              if (downloadQueue.length < 0) {
                dispatch(setCurrentDownload(downloadQueue.shift()));
                delay(19000);
              } else {
                if (isPaused || !currentDownload) {
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

                    dispatch(removeFromQueue());

                    dispatch(updateDownloadProgress(0));
                    dispatch(startDownloadThunk());

                    resolve(progress);
                  } else {
                    dispatch(updateDownloadProgress(progress));
                  }
                }
              }
            }
          }, timeout);
        })
        .catch((error) => {
          reject(error);
        });
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
    setCurrentDownload(state, action) {
      state.currentDownload = action.payload;
      state.isDownloading = true;
      state.downloadProgress = 0;
      state.isPaused = false;
    },
    addToQueue(state, action) {
      state.downloadQueue.push(action.payload);
      if (!state.currentDownload) {
        state.currentDownload = state.downloadQueue.shift();

        startDownloadThunk();
      }
    },
    removeFromQueue(state) {
      state.currentDownload = null;
      if (state.downloadQueue.length > 0) {
        state.currentDownload = state.downloadQueue.shift();
      } else {
        state.isDownloading = false;
      }
    },
    toggleDownload(state) {
      state.isPaused = !state.isPaused;
    },
    resetDownload(state) {
      state.isDownloading = false;
      state.isPaused = !state.isPaused;
      state.downloadProgress = 0;
      state.gameDetailPageSelectedGame = null;
      state.currentDownload = null;
      state.downloadQueue = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(startDownloadThunk.pending, (state) => {
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
  setCurrentDownload,
  addToQueue,
  removeFromQueue,
  toggleDownload,
  resetDownload,
} = downloadSlice.actions;
export default downloadSlice.reducer;
