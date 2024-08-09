import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  downloadProgress: 0,
  isDownloading: false,
};

const downloadSlice = createSlice({
  name: "download",
  initialState,
  reducers: {
    startDownload(state) {
      state.isDownloading = true;
      state.downloadProgress = 0;
    },
    updateDownloadProgress(state, action) {
      state.downloadProgress = action.payload;
    },
    finishDownload(state) {
      state.isDownloading = false;
      state.downloadProgress = 100;
    },
  },
});

export const { startDownload, updateDownloadProgress, finishDownload } =
  downloadSlice.actions;
export default downloadSlice.reducer;
