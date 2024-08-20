import { createSlice } from "@reduxjs/toolkit";

const bitRateSlice = createSlice({
  name: "bitRate",
  initialState: {
    value: 0,
    maxValue: 0,
  },
  reducers: {
    setBitRate: (state, action) => {
      state.value = action.payload;
      if (action.payload > state.maxValue) {
        state.maxValue = action.payload;
      }
    },
    setDiskUsage: (state, action) => {
      state.diskUsage = action.payload;
    },
    resetBitRate: (state) => {
      state.value = 0;
    },
    resetMaxBitRate: (state) => {
      state.maxValue = 0;
    },
    resetDiskUsage: (state) => {
      state.diskUsage = 0;
    },
    stopBitRateUpdate: (state) => {
      if (state.bitRateUpdateIntervalId) {
        clearInterval(state.bitRateUpdateIntervalId);
        state.bitRateUpdateIntervalId = null;
      }
    },
    stopDiskUsageUpdate: (state) => {
      if (state.diskUsageUpdateIntervalId) {
        clearInterval(state.diskUsageUpdateIntervalId);
        state.diskUsageUpdateIntervalId = null;
      }
    },
  },
});

export const {
  setBitRate,
  resetBitRate,
  resetMaxBitRate,
  setDiskUsage,
  resetDiskUsage,
} = bitRateSlice.actions;

export const startBitRateUpdate = () => (dispatch, getState) => {
  if (getState().download.currentDownload) {
    const interval = setInterval(() => {
      const newBitRate = (Math.random() * (30 - 20) + 20).toFixed(2);
      dispatch(setBitRate(newBitRate));
    }, 2000);

    return () => clearInterval(interval);
  }
};
export const startDiskUsageUpdate = () => (dispatch, getState) => {
  if (getState().download.currentDownload) {
    const intervalId = setInterval(() => {
      const newDiskUsage = (Math.random() * (40 - 20) + 20).toFixed(2);
      dispatch(setDiskUsage(newDiskUsage));
    }, 2000);

    return () => clearInterval(intervalId);
  }
};

export const stopBitRateUpdate = () => (dispatch) => {};
export const stopDiskUsageUpdate = () => (dispatch) => {};

export const resetBitRateOnDownloadComplete = () => (dispatch) => {
  dispatch(resetBitRate());
  dispatch(resetMaxBitRate());
  dispatch(resetDiskUsage());
};

export default bitRateSlice.reducer;
