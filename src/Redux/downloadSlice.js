import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchAndFilterGamesByCategory } from "./searchSlice";
import { fetchDownloadedGames } from "./downloadedGamesSlice";
import { resetBitRateOnDownloadComplete } from "./bitRateSlice";

const initialState = {
  downloadProgress: 0,
  isDownloading: false,
  isPaused: false,
  gameDetailPageSelectedGame: null,
  downloadQueue: [],
  currentDownload: null, // Tüm oyun detaylarını içerecek
  cancelTokenSource: null, // CancelToken için bir alan
  downloadInterval: null, // Interval'ı saklamak için bir alan
};

export const addToQueueThunk = createAsyncThunk(
  "download/addToQueue",
  async ({ id }, { dispatch, getState }) => {
    const state = getState().download;
    const game = await axios.get(`http://localhost:3001/games/${id}`);
    const updatedQueue = [...state.downloadQueue, game.data];
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
    const state = getState().download;
    const cancelTokenSource = axios.CancelToken.source();
    let progress = 0;
    const timeout = 100;
    const totalSteps = 100;

    // Get game details with cancel token
    const { data: gameDetail } = await axios.get(
      `http://localhost:3001/games/${id}`,
      { cancelToken: cancelTokenSource.token }
    );

    dispatch(setGameDetailPageSelectedGame(gameDetail));
    dispatch(setCurrentDownload({ ...gameDetail, cancelTokenSource }));

    return new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        const currentState = getState().download;
        const nextGame = currentState.downloadQueue[1];

        if (currentState.isPaused) {
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
            dispatch(fetchAndFilterGamesByCategory());
            dispatch(fetchDownloadedGames());

            if (nextGame) {
              dispatch(startDownloadThunk({ id: nextGame.id }));
            }

            dispatch(resetBitRateOnDownloadComplete());
            resolve(progress);
          } else {
            dispatch(updateDownloadProgress(progress));
          }
        }
      }, timeout);

      // Save interval reference
      dispatch(setDownloadInterval(interval));
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
      state.downloadProgress = 0;
      state.gameDetailPageSelectedGame = null;
      state.currentDownload = null;
      state.downloadQueue = [];

      // Clear the interval if it exists
      if (state.downloadInterval) {
        clearInterval(state.downloadInterval);
      }

      // Cancel the current download if it exists
      if (state.cancelTokenSource) {
        state.cancelTokenSource.cancel("Download reset.");
      }
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
      state.currentDownload = action.payload; // Oyun detaylarını ve cancel token'ı sakla
    },
    setDownloadInterval(state, action) {
      state.downloadInterval = action.payload;
    },
    setCancelTokenSource(state, action) {
      state.cancelTokenSource = action.payload;
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
        if (state.downloadQueue.length > 0) {
          state.isDownloading = true;
        } else {
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
  toggleDownload,
  resetDownload,
  removeFromQueue,
  completeDownload,
  updateDownloadQueue,
  setCurrentDownload,
  setDownloadInterval,
  setCancelTokenSource,
} = downloadSlice.actions;
export default downloadSlice.reducer;
